export default function FlashSaleSection() {
  const products = [1, 2, 3, 4];
  return (
    <section className="bg-orange-50 rounded-[24px] p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold uppercase text-red-600">Flash Sale</h2>
        <div className="text-sm font-semibold">Ends in: 02:30:15</div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((item) => (
          <div key={item} className="bg-white p-4 rounded-[16px] shadow-sm hover:shadow-lg transition-transform hover:-translate-y-1">
            <div className="h-40 bg-gray-200 rounded-[12px] mb-4"></div>
            <h3 className="font-semibold text-sm">Product {item}</h3>
            <p className="text-orange-600 font-bold">$99.00</p>
          </div>
        ))}
      </div>
    </section>
  );
}
