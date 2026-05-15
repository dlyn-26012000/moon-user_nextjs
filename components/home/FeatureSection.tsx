export default function FeatureSection() {
  const features = ["Authentic Products", "Fast Delivery", "Easy Returns", "Payment Security"];
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
      {features.map((f, i) => (
        <div key={i} className="p-4 border rounded-[16px] bg-white">{f}</div>
      ))}
    </section>
  );
}
