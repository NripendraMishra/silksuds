export interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  description: string;
  category: string;
  rating: number;
  reviews: number;
  weight?: string;
  ingredients?: string;
  nutritionalInfo?: string;
  benefits?: string[];
  details: string;
  quantity: number;
}