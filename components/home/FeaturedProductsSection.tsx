export default function FeaturedProductsSection() {
  const products = Array(6).fill(null);
  return (
    <section>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold uppercase">Featured Products</h2>
        <a href="#" className="text-orange-600 font-semibold hover:underline">View All</a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {products.map((_, i) => (
          <div key={i} className="bg-white p-4 rounded-[16px] shadow-sm hover:shadow-lg transition-transform hover:-translate-y-1">
            <div className="h-40 bg-gray-100 rounded-[12px] mb-4"></div>
            <h3 className="font-semibold text-sm mb-2">Product Name</h3>
            <p className="text-orange-600 font-bold">$120.00</p>
          </div>
        ))}
      </div>
    </section>
  );
}
