export default function HeroSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-10 gap-6 h-[400px]">
      <div className="md:col-span-7 bg-orange-600 rounded-[24px] p-12 flex flex-col justify-center text-white">
        <h1 className="text-6xl font-extrabold uppercase mb-4">Mega Sale</h1>
        <p className="text-2xl mb-8 opacity-80">Up to 70% off everything</p>
        <button className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold w-max hover:scale-105 transition">Shop Now</button>
      </div>
      <div className="md:col-span-3 flex flex-col gap-6">
        <div className="flex-1 bg-gray-300 rounded-[24px] flex items-center justify-center font-bold">Smartwatch</div>
        <div className="flex-1 bg-gray-300 rounded-[24px] flex items-center justify-center font-bold">Shoes</div>
      </div>
    </section>
  );
}
