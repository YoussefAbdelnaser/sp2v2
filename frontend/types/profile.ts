// types/index.ts
export interface Review {
  productId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  company: string;
  addresses: string[];
  reviews: Review[];
}
