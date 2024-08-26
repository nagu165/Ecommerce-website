import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="mb-6 sm:mb-0">
            <h2 className="text-xl font-bold text-purple-700 mb-4">Shop With Us</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/search/electronics" className="hover:text-gray-400 transition-colors text-sm">Electronics</Link>
              </li>
              <li>
                <Link href="/search/jewelery" className="hover:text-gray-400 transition-colors text-sm">Jewelry</Link>
              </li>
              <li>
                <Link href="/search/mens-clothing" className="hover:text-gray-400 transition-colors text-sm">Men&apos;s Clothing</Link>
              </li>
              <li>
                <Link href="/search/womens-clothing" className="hover:text-gray-400 transition-colors text-sm">Women&apos;s Clothing</Link>
              </li>
            </ul>
          </div>

          <div className="mb-6 sm:mb-0">
            <h2 className="text-xl font-bold text-purple-700 mb-4">Information</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-gray-400 transition-colors text-sm">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-400 transition-colors text-sm">Contact</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-gray-400 transition-colors text-sm">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gray-400 transition-colors text-sm">Terms of Service</Link>
              </li>
            </ul>
          </div>

          <div className="mb-6 sm:mb-0">
            <h2 className="text-xl font-bold text-purple-700 mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="h-6 w-6 hover:text-gray-400 transition-colors" />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="h-6 w-6 hover:text-gray-400 transition-colors" />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="h-6 w-6 hover:text-gray-400 transition-colors" />
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="h-6 w-6 hover:text-gray-400 transition-colors" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-4 text-center">
          <p className="text-xs sm:text-sm">&copy; {new Date().getFullYear()} MyStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;