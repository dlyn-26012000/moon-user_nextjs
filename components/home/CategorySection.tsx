export default function CategorySection() {
  const categories = ["Electronics", "Fashion", "Home", "Beauty"];
  return (
    <section>
      <h2 className="text-xl font-bold uppercase mb-6 border-b pb-2">Categories</h2>
      <div className="flex gap-6">
        {categories.map((c, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center font-semibold hover:bg-orange-500 hover:text-white transition">Icon</div>
            <span className="text-sm font-medium">{c}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
