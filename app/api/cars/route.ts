import { NextRequest, NextResponse } from "next/server";

// util function to get current user
import { currentUser } from "@/lib/current-user";

// util function to upload to cloudinary
import { uploadToCloudinary } from "@/lib/cloudinary";

// zod schema
import { FullCarSchema } from "@/utils/zodSchema";

// database
import { db } from "@/lib/prisma";

async function POST(req: NextRequest) {
  const user = await currentUser();
  try {
    if (!user || user.role !== "admin") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const formData = await req.formData();

    const rawData: Record<string, any> = {};

    for (const [key, value] of formData.entries()) {
      if (key === "thumbnail") {
        rawData[key] = value;
        continue;
      }

      if (key === "photos") {
        rawData[key] = value;
        continue;
      }

      if (key.endsWith("[]")) {
        const trimmedKey = key.replace("[]", "");
        if (!rawData[trimmedKey]) rawData[trimmedKey] = [];
        rawData[trimmedKey].push(value);
      } else {
        rawData[key] = value;
      }
    }

    console.log(rawData);

    let thumbnailUploadResult;
    let uploadedPhotos: { url: string; fileId: string }[] = [];

    const thumbnail_image = formData.get("thumbnail") as File | null;
    if (thumbnail_image) {
      const result = await uploadToCloudinary(thumbnail_image, {
        folder: `autonest/cars/thumbnail`,
        resource_type: "image",
      });
      const results = Array.isArray(result) ? result[0] : result;
      thumbnailUploadResult = {
        url: results.secure_url,
        fileId: results.public_id,
      };
    }

    const uploaded_photos = formData.getAll("photos") as File[];

    //  validating files
    const validCertFiles = uploaded_photos.filter(
      (file): file is File => file instanceof File && file.size > 0
    );

    // uploading validate files
    if (validCertFiles.length > 0) {
      uploadedPhotos = await Promise.all(
        validCertFiles.map(async (file) => {
          const result = await uploadToCloudinary(file, {
            folder: "autonest/cars/photos",
            resource_type: "raw",
          });
          const photoUpload = Array.isArray(result) ? result[0] : result;
          if (!photoUpload?.public_id || !photoUpload?.secure_url) {
            throw new Error("Invalid certification upload");
          }
          return {
            url: photoUpload.secure_url,
            fileId: photoUpload.public_id,
          };
        })
      );
    }

    if (!thumbnailUploadResult) {
      return NextResponse.json(
        { error: "Car thumbnail Image is required" },
        { status: 400 }
      );
    }

    if (uploadedPhotos.length === 0) {
      return NextResponse.json(
        {
          error: "At least one Photo is required per Car",
        },
        { status: 400 }
      );
    }

    const validatedData = FullCarSchema.parse(rawData);

    const { thumbnail, photos, ...dataForDb } = validatedData;

    await db.car.create({
      data: {
        ...dataForDb,
        thumbnail: {
          create: thumbnailUploadResult,
        },
        photos: {
          create: uploadedPhotos,
        },
        specifications: {
          engine: "df",
          transmission: "d",
          fuel_type: "df",
          mileage: "df",
          seating_capacity: 2,
        },
        rating: 2.2,
        owner: {
          connect: {
            clerkId: user.clerkId,
          },
        },
      },
    });

    return NextResponse.json(
      { message: "Car created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error creating Car:", error);

    // Handle Zod validation errors
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid data provided", details: error.message },
        { status: 400 }
      );
    }

    // Handle Prisma errors
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      return NextResponse.json(
        { error: "Profile already exists" },
        { status: 409 }
      );
    }

    // Handle file upload errors
    if (
      error instanceof Error &&
      error.message.includes("Invalid certification upload")
    ) {
      return NextResponse.json(
        { error: "Failed to upload one or more certification files" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
