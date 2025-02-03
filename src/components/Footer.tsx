import { Instagram, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white mt-auto border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold text-blue-600 mb-4">Mj Auto Parts</h3>
            <p className="text-gray-600 mb-4">
              Your trusted source for quality auto parts and exceptional service.
            </p>
            <div className="space-y-2">
              <a href="tel:+917062903523" className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                <Phone className="h-4 w-4" />
                <span>+91 7062903523</span>
              </a>
              <a href="mailto:Mjavidkhokar9829@gmail.com" className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                <Mail className="h-4 w-4" />
                <span>Mjavidkhokar9829@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
              </li>
              <li>
                {/* <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link> */}
              {localStorage.getItem('token') ? (
                <Link to="/Addproducts" className="text-gray-600 hover:text-blue-600">Add Product</Link>
              ) : (
                <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
              )}
              </li>
              
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/mjautoparts_"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-pink-600 hover:bg-gray-100 rounded-full"
              >
                <Instagram className="h-6 w-6" />
              </a>
              {/* <a
                href="https://twitter.com/autospares"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-blue-400 hover:bg-gray-100 rounded-full"
              >
                <Twitter className="h-6 w-6" />
              </a> */}
              {/* <a
                href="https://facebook.com/autospares"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full"
              >
                <Facebook className="h-6 w-6" />
              </a> */}
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-gray-500">
          <p>© {currentYear} MJ Auto Parts. All rights reserved.</p>
        </div>  
      </div>
    </footer>
  );
}