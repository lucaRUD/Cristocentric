export interface Product {
    id: number;
    sku: string;
    name: string;
    colors: string[];
    sizes: string[];
    description: string;
    price: number;
    image: string;
    selectedColor?: string;
    selectedSize?: string;
    quantity?: number;
  }
  