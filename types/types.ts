// export interface Specifications {
//   engine: string;
//   transmission: string;
//   fuelType: string;
//   mileage: string;
//   seatingCapacity: number;
//   color: string;
// }

// export interface Thumbnail {
//   url: string;
//   fileId: string;
// }

// export interface Car {
//   id: string;
//   brand: string;
//   model: string;
//   year: number;
//   price: number;
//   category: string;
//   images: string[];
//   thumbnail: Thumbnail;
//   specifications: Specifications;
//   features: string[];
//   description: string;
//   inStock: boolean;
//   rating: number;
// }

export interface FeaturedCar {
  id: string;
  price: number;
  thumbnail: {
    url: string;
  };
  model: string;
}

export interface Car {
  id: string;
  thumbnail: {
    url: string;
  };
  model: string;
  brand: string;
  category: string;
  price: number;
}
