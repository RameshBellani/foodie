import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, Menu, Edit } from "lucide-react"; // Adding Edit icon for admin menu
import { useAuthStore } from "../store/auth-store";
import { useCartStore } from "../store/cart-store";
import Foodie from "../assets/Foodie.png";

export default function Navbar() {
  const { user } = useAuthStore();
  const { items } = useCartStore();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img src={Foodie} alt="Foodie Logo" className="h-8 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/menu" className="text-gray-700 hover:text-orange-600">
              Menu
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-orange-600">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-orange-600">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCart
                className="h-6 w-6 text-gray-700 hover:text-orange-600"
                aria-hidden="true"
              />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>

            {user ? (
              <Link to="/profile">
                <User className="h-6 w-6 text-gray-700 hover:text-orange-600" />
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
              >
                Login
              </Link>
            )}

            {/* Admin Navigation Button (Visible only for admins) */}
            {user?.role === "admin" && (
              <Link
                to="/admin/menu"
                className="text-gray-700 hover:text-orange-600 flex items-center"
              >
                <Edit className="h-6 w-6 text-gray-700 hover:text-orange-600 mr-2" />
                Admin Menu
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <Link
              to="/menu"
              className="block py-2 text-gray-700 hover:text-orange-600"
            >
              Menu
            </Link>
            <Link
              to="/about"
              className="block py-2 text-gray-700 hover:text-orange-600"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block py-2 text-gray-700 hover:text-orange-600"
            >
              Contact
            </Link>
            <Link
              to="/cart"
              className="block py-2 text-gray-700 hover:text-orange-600"
            >
              Cart ({items.length})
            </Link>
            {user ? (
              <Link
                to="/profile"
                className="block py-2 text-gray-700 hover:text-orange-600"
              >
                Profile
              </Link>
            ) : (
              <Link
                to="/login"
                className="block py-2 text-gray-700 hover:text-orange-600"
              >
                Login
              </Link>
            )}

            {/* Admin Navigation in Mobile */}
            {user?.role === "admin" && (
              <Link
                to="/admin/menu"
                className="block py-2 text-gray-700 hover:text-orange-600"
              >
                Admin Menu
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
