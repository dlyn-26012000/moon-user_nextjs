import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Assuming shadcn/ui Button

export default function HeroSection() {
  return (
    <section className="container mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Large Promotional Banner */}
        <div className="relative col-span-1 lg:col-span-2 rounded-4xl overflow-hidden shadow-soft">
          <Image
            src="/hero-banner-main.jpg" // Placeholder image
            alt="Mega Sale Banner"
            layout="fill"
            objectFit="cover"
            className="z-0"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10 p-8 flex flex-col justify-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold uppercase mb-2">
              Mega Sale
            </h1>
            <h2 className="text-2xl md:text-4xl font-semibold mb-4">
              Up To 70%
            </h2>
            <p className="max-w-md mb-8 text-sm md:text-base">
              Discover amazing deals on your favorite items. Limited time offer!
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-lg px-8 py-3 w-fit text-lg font-semibold">
              Shop Now
            </Button>
          </div>
        </div>

        {/* Right Side: Two Stacked Promotional Cards */}
        <div className="col-span-1 flex flex-col gap-6">
          {/* Card 1: Smartwatch */}
          <div className="relative h-64 rounded-4xl overflow-hidden shadow-soft">
            <Image
              src="/smartwatch-promo.jpg" // Placeholder image
              alt="Smartwatch Promotion"
              layout="fill"
              objectFit="cover"
              className="z-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 p-6 flex flex-col justify-end text-white">
              <h3 className="text-xl font-bold">Smart Tech</h3>
              <p className="text-sm">Explore our latest gadgets.</p>
            </div>
          </div>

          {/* Card 2: Red Sneaker */}
          <div className="relative h-64 rounded-4xl overflow-hidden shadow-soft">
            <Image
              src="/sneaker-promo.jpg" // Placeholder image
              alt="Red Sneaker Promotion"
              layout="fill"
              objectFit="cover"
              className="z-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 p-6 flex flex-col justify-end text-white">
              <h3 className="text-xl font-bold">New Arrivals</h3>
              <p className="text-sm">Step up your style game.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
