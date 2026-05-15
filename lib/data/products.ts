// lib/data/products.ts

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Running Shoes',
    description: 'Lightweight and comfortable shoes for running.',
    price: 99.99,
    imageUrl: '/public/file.svg', // Using an existing image for now
  },
  {
    id: '2',
    name: 'Tennis Racket',
    description: 'Professional grade tennis racket for optimal performance.',
    price: 150.00,
    imageUrl: '/public/file.svg',
  },
  {
    id: '3',
    name: 'Sports T-Shirt',
    description: 'Breathable fabric sports t-shirt for training.',
    price: 25.00,
    imageUrl: '/public/file.svg',
  },
  {
    id: '4',
    name: 'Gym Bag',
    description: 'Durable gym bag with multiple compartments.',
    price: 45.50,
    imageUrl: '/public/file.svg',
  },
  {
    id: '5',
    name: 'Basketball',
    description: 'Official size and weight basketball for indoor/outdoor play.',
    price: 30.00,
    imageUrl: '/public/file.svg',
  },
  {
    id: '6',
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat for all types of practice.',
    price: 20.00,
    imageUrl: '/public/file.svg',
  },
  {
    id: '7',
    name: 'Cycling Shorts',
    description: 'Padded cycling shorts for long rides.',
    price: 55.00,
    imageUrl: '/public/file.svg',
  },
  {
    id: '8',
    name: 'Swim Trunks',
    description: 'Quick-dry swim trunks for beach or pool.',
    price: 35.00,
    imageUrl: '/public/file.svg',
  },
];
