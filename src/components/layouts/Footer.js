import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand Info */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <Image
                src="/clothes-filled.svg"
                alt="Style Corner Logo"
                width={40}
                height={40}
              />
              <h2 className="ml-3 text-2xl font-bold">Style Corner</h2>
            </div>
            <p className="text-gray-400 text-sm">
              Your destination for the latest trends in fashion and accessories.
              Discover your unique style with us.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-white transition">
                  Shop
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Policy */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Policies</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/shipping-returns" className="text-gray-400 hover:text-white transition">
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter or Social Media (Optional) */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {/* Replace with actual social media links and icons */}
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c-.347-.023-.701-.035-1.063-.035C5.106 2.128 0 7.234 0 13.52c0 3.86 1.996 7.276 5 9.175V16h-2.3v-4h2.3v-2.8c0-3.1 1.83-4.8 4.745-4.8 1.45 0 2.76.126 3.14.18v2.7h-1.6c-1.35 0-1.6.64-1.6 1.58v1.6H17l-.46 4h-2.54v7.126c3.003-1.898 5-5.314 5-9.175 0-6.286-5.106-11.392-11.392-11.392z"></path>
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.1 5.3c-.5.2-1.2.5-1.9.7.7-.4 1.2-1.1 1.4-1.9-.6.4-1.3.7-2.1.9-.6-.6-1.5-1-2.4-1-1.8 0-3.3 1.5-3.3 3.3 0 .3.03.7.1 1.1-2.7-.1-5-1.4-6.6-3.5-.3.6-.5 1.2-.5 1.9 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.4-.4v.05c0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-.9.1-.2 0-.4-.02-.6-.06.4 1.3 1.6 2.2 3.1 2.2-1.1.9-2.5 1.4-4.1 1.4-.3 0-.6 0-.8-.05 1.5.9 3.2 1.4 5.1 1.4 6.1 0 9.5-5.1 9.5-9.5 0-.1 0-.3 0-.4.6-.4 1.1-.9 1.5-1.5z"></path>
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c-.347-.023-.701-.035-1.063-.035C5.106 2.128 0 7.234 0 13.52c0 3.86 1.996 7.276 5 9.175V16h-2.3v-4h2.3v-2.8c0-3.1 1.83-4.8 4.745-4.8 1.45 0 2.76.126 3.14.18v2.7h-1.6c-1.35 0-1.6.64-1.6 1.58v1.6H17l-.46 4h-2.54v7.126c3.003-1.898 5-5.314 5-9.175 0-6.286-5.106-11.392-11.392-11.392z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Style Corner. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}