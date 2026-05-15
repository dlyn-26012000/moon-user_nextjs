import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PremiumMembershipBanner() {
  return (
    <section className="container mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-4xl overflow-hidden shadow-soft">
        {/* Left Side: Image */}
        <div className="relative h-64 md:h-auto min-h-[300px]">
          <Image
            src="/premium-membership-pos.jpg" // Placeholder image
            alt="Premium Membership POS Terminal"
            layout="fill"
            objectFit="cover"
            className="z-0"
          />
        </div>

        {/* Right Side: Content */}
        <div className="bg-secondary p-8 md:p-12 flex flex-col justify-center items-start text-white">
          <h2 className="text-3xl md:text-4xl font-bold uppercase mb-4">
            Premium Membership
          </h2>
          <p className="text-base mb-6 max-w-md">
            Unlock exclusive benefits, faster shipping, special discounts, and
            priority support with our Premium Membership.
          </p>
          <Button className="bg-white hover:bg-gray-100 text-secondary rounded-lg px-8 py-3 text-lg font-semibold">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
