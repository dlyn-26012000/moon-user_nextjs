// components/product-card/ProductCard.tsx
import Image from 'next/image';
import { Product } from '../../lib/data/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={200}
        height={200}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
        <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors duration-200">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
