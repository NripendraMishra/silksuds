'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Menu, X, ShoppingCart, Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react'
import { doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext'
import { db } from '../lib/firebaseConfig';
import { useCart } from '../context/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [cartItems, setCartItems] = useState<any[]>([]);
  const { user } = useAuth();
  const { itemCount } = useCart();

  // Load cart from Firebase when user changes
  useEffect(() => {
    if (!user) {
      setCartItems([]);
      return;
    }
    const cartRef = doc(db, 'user-carts', user.uid);
    const unsubscribe = onSnapshot(cartRef, (cartSnap) => {
      if (cartSnap.exists()) {
        setCartItems(cartSnap.data().items || []);
      } else {
        setCartItems([]);
      }
    });
    return () => unsubscribe();
  }, [user]);

  // Cart summary
  const totalItems = cartItems.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0);
  const totalPrice = cartItems.reduce((sum: number, item: any) => sum + (item.price * (item.quantity || 0)), 0);

  // Optionally, you can use a loading state when toggling the menu or navigating programmatically.
  // If you want to show a loader during navigation, you can use startTransition (React 18+)
  // or simply remove the loading bar if not needed.

  

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white shadow-md">
      {/* Loader Bar */}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-1 z-50">
          <div className="h-full bg-accent-600 animate-pulse transition-all duration-300" style={{ width: '100%' }} />
        </div>
      )}
      {/* Top Bar */}
      <div className="bg-gray-800 text-white py-2">
        <div className="container">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <span>silksuds@gmail.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="#" className="hover:text-accent-400 transition-colors">
                <Facebook className="w-4 h-4" />
              </Link>
              <Link href="#" className="hover:text-accent-400 transition-colors">
                <Twitter className="w-4 h-4" />
              </Link>
              <Link href="http://www.instagram.com/silksuds/" className="hover:text-accent-400 transition-colors">
                <Instagram className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="py-4">
        <div className="container">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-accent-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-bold text-gray-800">SilkSuds</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-accent-600 font-medium transition-colors">
                Home
              </Link>
              <Link href="/shop" className="text-gray-700 hover:text-accent-600 font-medium transition-colors">
                Shop
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-accent-600 font-medium transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-accent-600 font-medium transition-colors">
                Contact Us
              </Link>
              <Link href="/my-account" className="text-gray-700 hover:text-accent-600 font-medium transition-colors">
                My Account
              </Link>
            </div>

            {/* Cart and Mobile Menu */}
            <div className="flex items-center space-x-4">
              <Link href="/cart" className="flex items-center space-x-2 text-gray-700 hover:text-accent-600 transition-colors">
                <ShoppingCart className="w-5 h-5" />
                <div className="hidden sm:flex flex-col text-sm">
                  <span className="font-medium">₹ {totalPrice}</span>
                  <span className="text-xs">{totalItems} items</span>
                </div>
                <span className="cart-count">{itemCount}</span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t">
              <div className="flex flex-col space-y-3 pt-4">
                <Link 
                  href="/" 
                  className="text-gray-700 hover:text-accent-600 font-medium transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/shop" 
                  className="text-gray-700 hover:text-accent-600 font-medium transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Shop
                </Link>
                <Link 
                  href="/about" 
                  className="text-gray-700 hover:text-accent-600 font-medium transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link 
                  href="/contact" 
                  className="text-gray-700 hover:text-accent-600 font-medium transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact Us
                </Link>
                <Link 
                  href="/my-account" 
                  className="text-gray-700 hover:text-accent-600 font-medium transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Account
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header
