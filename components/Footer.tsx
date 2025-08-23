import React from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-accent-400">SILKSUDS</h3>
            <p className="text-gray-300">
              Premium ayurvedic soaps crafted with natural ingredients for healthy, glowing skin
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-accent-400" />
                <span className="text-sm">silksuds@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-accent-400" />
                <span className="text-sm">1800-212-003000</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-accent-400 mt-1" />
                <span className="text-sm">
                  SilkSuds Manufacturing Unit, Greater Noida UP. 201308
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-accent-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-accent-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-300 hover:text-accent-400 transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-accent-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-accent-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/my-account" className="text-gray-300 hover:text-accent-400 transition-colors">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-accent-400">Policies</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-gray-300 hover:text-accent-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping-delivery" className="text-gray-300 hover:text-accent-400 transition-colors">
                  Shipping And Delivery
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-gray-300 hover:text-accent-400 transition-colors">
                  Refund, Return, Replacement, Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="text-gray-300 hover:text-accent-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-accent-400">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-300 hover:text-accent-400 transition-colors">
                <Facebook className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-accent-400 transition-colors">
                <Twitter className="w-6 h-6" />
              </Link>
              <Link href="http://www.instagram.com/silksuds/" className="text-gray-300 hover:text-accent-400 transition-colors">
                <Instagram className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">&copy; 2025 | SilkSuds</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
