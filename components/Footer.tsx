import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Shop With Us</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/search/electronics" className="hover:text-gray-400 transition-colors">Electronics</Link>
              </li>
              <li>
                <Link href="/search/jewelery" className="hover:text-gray-400 transition-colors">Jewelery</Link>
              </li>
              <li>
                <Link href="/search/men's clothing" className="hover:text-gray-400 transition-colors">Men's Clothing</Link>
              </li>
              <li>
                <Link href="/search/women's clothing" className="hover:text-gray-400 transition-colors">Women's Clothing</Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Information</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-gray-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-400 transition-colors">Contact</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gray-400 transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="h-6 w-6 hover:text-gray-400 transition-colors" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="h-6 w-6 hover:text-gray-400 transition-colors" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="h-6 w-6 hover:text-gray-400 transition-colors" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="h-6 w-6 hover:text-gray-400 transition-colors" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-4 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} FakeStoreAPI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;