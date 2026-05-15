export default function WeeklySpecialsBanner() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900 rounded-[24px] overflow-hidden text-white">
      <div className="p-12 flex flex-col justify-center gap-4">
        <h2 className="text-4xl font-bold uppercase">Weekly Specials</h2>
        <p className="opacity-80">Discover our curated selection of top-tier products at special prices.</p>
        <button className="bg-white text-slate-900 px-8 py-3 rounded-full font-semibold w-max hover:scale-105 transition">Explore Now</button>
      </div>
      <div className="bg-gray-700 min-h-[300px]"></div>
    </section>
  );
}
