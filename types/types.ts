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

// export interface CartItem extends Car {
//   quantity: number;
// }

// export interface UserInfo {
//   name: string;
//   email: string;
// }

// export interface CarFilters {
//   priceRange: [number, number];
//   brands: string[];
//   categories: string[];
//   searchTerm: string;
// }

export interface FeaturedCar {
  id: string;
  price: number;
  thumbnail: {
    url: string;
  };
  model: string;
}
