import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type UploadOptions = {
  folder: string;
  resource_type?: "image" | "raw";
};

export const uploadToCloudinary = async (
  media: File | File[],
  options: UploadOptions
): Promise<UploadApiResponse | UploadApiResponse[]> => {
  const files = Array.isArray(media) ? media : [media];

  const uploadPromise = files.map(async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: options.folder,
            resource_type: options.resource_type ?? "image",
            transformation:
              options.resource_type === "image"
                ? [
                    { width: 500, height: 500, crop: "fill" },
                    { quality: "auto" },
                  ]
                : undefined,
          },
          (error, results) => {
            if (error || !results) {
              reject(error || new Error("Upload failed"));
            } else {
              resolve(results);
            }
          }
        )
        .end(buffer);
    });
  });

  const results = await Promise.all(uploadPromise);
  return Array.isArray(media) ? results : results[0];
};
