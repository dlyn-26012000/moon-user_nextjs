import { ShieldCheck, Truck, RotateCcw, CreditCard } from "lucide-react";

export default function FeaturesTrustSection() {
  const features = [
    {
      icon: <ShieldCheck size={24} className="text-blue-500" />,
      label: "Authentic Products",
    },
    {
      icon: <Truck size={24} className="text-green-500" />,
      label: "Fast Delivery",
    },
    {
      icon: <RotateCcw size={24} className="text-red-500" />,
      label: "Easy Returns",
    },
    {
      icon: <CreditCard size={24} className="text-purple-500" />,
      label: "Payment Security",
    },
  ];

  return (
    <section className="container mx-auto p-4 md:p-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-4xl p-6 shadow-soft">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-4 text-center"
          >
            <div className="mb-2">{feature.icon}</div>
            <p className="text-sm font-medium text-dark-gray">
              {feature.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
