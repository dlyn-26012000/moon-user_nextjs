import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface Product {
  id: number;
  image: string;
  name: string;
  category: string;
  salePrice: number;
  originalPrice?: number;
  onSale: boolean;
}

function FeaturedProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-2xl shadow-soft overflow-hidden group">
      <div className="relative w-full h-56">
        <Image
          src={product.image}
          alt={product.name}
          layout="fill"
          objectFit="cover"
        />
        {product.onSale && (
          <span className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-md">
            SALE
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-gray-500 text-xs mb-1">{product.category}</p>
        <h3 className="text-base font-semibold text-dark-gray mb-2 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-primary">
            ${product.salePrice.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        <Link
          href={`/products/${product.id}`}
          className="flex items-center justify-between text-primary hover:text-primary/80 transition-colors"
        >
          <span className="text-sm font-semibold">View Details</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default function FeaturedProductsSection() {
  const products: Product[] = [
    {
      id: 6,
      image: "/featured-product-1.jpg",
      name: "Classic Leather Backpack",
      category: "Accessories",
      salePrice: 89.99,
      originalPrice: 119.99,
      onSale: true,
    },
    {
      id: 7,
      image: "/featured-product-2.jpg",
      name: "Vintage Denim Jacket",
      category: "Apparel",
      salePrice: 69.50,
      originalPrice: 95.00,
      onSale: true,
    },
    {
      id: 8,
      image: "/featured-product-3.jpg",
      name: "Noise Cancelling Headphones",
      category: "Electronics",
      salePrice: 199.00,
      originalPrice: 249.00,
      onSale: false,
    },
    {
      id: 9,
      image: "/featured-product-4.jpg",
      name: "Handmade Ceramic Mug",
      category: "Home Goods",
      salePrice: 24.00,
      originalPrice: 30.00,
      onSale: true,
    },
    {
      id: 10,
      image: "/featured-product-5.jpg",
      name: "Running Shoes Pro",
      category: "Footwear",
      salePrice: 110.00,
      originalPrice: 130.00,
      onSale: false,
    },
    {
      id: 11,
      image: "/featured-product-6.jpg",
      name: "Minimalist Smartwatch",
      category: "Wearables",
      salePrice: 149.99,
      originalPrice: 179.99,
      onSale: true,
    },
  ];

  return (
    <section className="container mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold uppercase text-dark-gray">
          Featured Products
        </h2>
        <Link href="/products" className="text-primary font-semibold text-sm hover:underline">
          VIEW ALL
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <FeaturedProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
