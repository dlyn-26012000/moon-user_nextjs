import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white py-12 md:py-16 mt-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Column 1: Logo, Description, Social Icons */}
          <div className="flex flex-col">
            <Link href="/" className="text-2xl font-bold mb-4">
              Tochi
            </Link>
            <p className="text-sm text-gray-300 mb-6 max-w-xs">
              Your one-stop shop for modern and minimal e-commerce experiences.
              Quality products, unbeatable prices.
            </p>
            {/* <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook" className="hover:text-primary transition-colors">
                <Twitter size={20} />
              </Link>
            </div> */}
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/collections" className="text-sm text-gray-300 hover:text-primary transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="text-sm text-gray-300 hover:text-primary transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/best-sellers" className="text-sm text-gray-300 hover:text-primary transition-colors">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="/sales" className="text-sm text-gray-300 hover:text-primary transition-colors">
                  Sales
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-sm text-gray-300 hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-300 hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-sm text-gray-300 hover:text-primary transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/order-status" className="text-sm text-gray-300 hover:text-primary transition-colors">
                  Order Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Newsletter
            </h3>
            <p className="text-sm text-gray-300 mb-4">
              Subscribe to our newsletter to get the latest updates and offers.
            </p>
            <form>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full p-3 rounded-lg bg-secondary border border-gray-600 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-primary mb-3"
              />
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Area */}
        <div className="border-t border-gray-700 mt-10 pt-8 text-center md:flex md:justify-between md:items-center">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} Tochi. All rights reserved.
          </p>
          <div className="flex justify-center md:justify-end space-x-6 mt-4 md:mt-0">
            <Link href="/terms" className="text-sm text-gray-400 hover:text-primary transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="text-sm text-gray-400 hover:text-primary transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
