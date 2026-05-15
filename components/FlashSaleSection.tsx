import Link from "next/link";
import Image from "next/image";
import { Timer, Zap } from "lucide-react";

// Placeholder for a ProductCard component, will be implemented later or use a simple div for now
function ProductCard({ product }: { product: any }) {
  return (
    <div className="flex-none w-48 bg-white rounded-xl shadow-soft overflow-hidden">
      <div className="relative w-full h-40">
        <Image
          src={product.image}
          alt={product.title}
          layout="fill"
          objectFit="cover"
        />
        {product.discount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            -{product.discount}%
          </span>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold text-dark-gray truncate">
          {product.title}
        </h3>
        <div className="flex items-center gap-1 mt-1 mb-2">
          <span className="text-lg font-bold text-primary">
            ${product.salePrice.toFixed(2)}
          </span>
          <span className="text-xs text-gray-400 line-through">
            ${product.originalPrice.toFixed(2)}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-primary h-2.5 rounded-full"
            style={{ width: `${product.soldProgress}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Sold: {product.soldCount}/{product.totalStock}
        </p>
      </div>
    </div>
  );
}

// Simple Countdown Timer Component
function CountdownTimer() {
  // This is a static placeholder. A real implementation would involve state and setInterval.
  return (
    <div className="flex items-center gap-2 text-red-600 font-semibold text-sm">
      <Timer size={18} className="text-red-500" />
      <span>02h 30m 45s</span>
    </div>
  );
}

export default function FlashSaleSection() {
  const products = [
    {
      id: 1,
      image: "/product-placeholder-1.jpg",
      title: "Wireless Bluetooth Headphones",
      discount: 20,
      salePrice: 79.99,
      originalPrice: 99.99,
      soldProgress: 75,
      soldCount: 75,
      totalStock: 100,
    },
    {
      id: 2,
      image: "/product-placeholder-2.jpg",
      title: "Smartwatch Series 7 Pro",
      discount: 15,
      salePrice: 169.00,
      originalPrice: 199.00,
      soldProgress: 50,
      soldCount: 50,
      totalStock: 100,
    },
    {
      id: 3,
      image: "/product-placeholder-3.jpg",
      title: "Portable Power Bank 20000mAh",
      discount: 25,
      salePrice: 29.99,
      originalPrice: 39.99,
      soldProgress: 90,
      soldCount: 90,
      totalStock: 100,
    },
    {
      id: 4,
      image: "/product-placeholder-4.jpg",
      title: "Ergonomic Gaming Mouse",
      discount: 10,
      salePrice: 44.99,
      originalPrice: 49.99,
      soldProgress: 30,
      soldCount: 30,
      totalStock: 100,
    },
    {
      id: 5,
      image: "/product-placeholder-5.jpg",
      title: "4K Ultra HD Smart TV",
      discount: 30,
      salePrice: 349.99,
      originalPrice: 499.99,
      soldProgress: 60,
      soldCount: 60,
      totalStock: 100,
    },
  ];

  return (
    <section className="container mx-auto p-4 md:p-8">
      <div className="bg-orange-50 rounded-4xl p-6 md:p-8 shadow-soft">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
              <Zap size={16} fill="white" />
              FLASH SALE
            </span>
            <CountdownTimer />
          </div>
          <Link href="/flash-sales" className="text-primary font-semibold text-sm hover:underline">
            SEE ALL
          </Link>
        </div>

        {/* Products */}
        <div className="flex overflow-x-auto gap-4 py-2 custom-scrollbar">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
