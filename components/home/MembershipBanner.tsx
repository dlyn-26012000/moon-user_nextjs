export default function MembershipBanner() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-white p-8 rounded-[24px] shadow-sm">
      <div className="h-[300px] bg-gray-200 rounded-[24px]"></div>
      <div className="flex flex-col gap-4">
        <h2 className="text-4xl font-bold uppercase">Join Premium Membership</h2>
        <p className="text-gray-600">Enjoy exclusive discounts, early access, and free shipping on all orders.</p>
        <button className="bg-slate-900 text-white px-8 py-3 rounded-full font-semibold w-max hover:scale-105 transition">Learn More</button>
      </div>
    </section>
  );
}
