"use client";
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import { trackClick, trackAddToCart, trackRemoveFromCart } from '../../lib/analytics';

const CartPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    subtotal, 
    shippingCost, 
    total, 
    loading 
  } = useCart();

  // Remove all local cart state and Firebase operations
  // Remove updateCartInFirebase, fetchCart, local cartItems state, etc.

  // Update the handlers to use context methods:
  const handleUpdateQuantity = async (id: number, newQuantity: number) => {
    try {
      await updateQuantity(id, newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity. Please try again.');
    }
  };

  const handleRemoveItem = async (id: number) => {
    try {
      await removeFromCart(id);
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item. Please try again.');
    }
  };

  // Proceed to checkout
  const proceedToCheckout = () => {
    trackClick('proceed_to_checkout', {
      cart_value: total,
      items_count: cartItems.length,
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }))
    });
    
    if (user) {
      router.push('/checkout');
    } else {
      router.push('/login?redirect=checkout');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="gradient-bg py-20">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
              Your <span className="text-accent-600">Cart</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Review your items and proceed to checkout
            </p>
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="section-padding">
        <div className="container">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-600"></div>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="flex justify-center mb-6">
                <ShoppingBag className="w-20 h-20 text-gray-300" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Link href="/shop" className="btn btn-primary">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h2>
                  
                  <div className="space-y-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 border-b border-gray-200">
                        {/* Product Image */}
                        <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                          <Image 
                            src={item.image} 
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        </div>
                        
                        {/* Product Info */}
                        <div className="flex-grow">
                          <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <button 
                                className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-10 text-center font-medium">
                                {item.quantity}
                              </span>
                              <button 
                                className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-accent-600 text-lg">
                                ₹{item.price * item.quantity}
                              </p>
                              <p className="text-sm text-gray-500">₹{item.price} each</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Remove Button */}
                        <button 
                          className="text-gray-400 hover:text-red-500 self-start sm:self-center"
                          onClick={() => handleRemoveItem(item.id)}
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 flex justify-between">
                    <Link href="/shop" className="text-accent-600 hover:text-accent-800 flex items-center">
                      <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-bold">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-bold">
                        {shippingCost === 0 ? 'Free' : `₹${shippingCost}`}
                      </span>
                    </div>
                    <div className="flex justify-between pt-4 border-t border-gray-200">
                      <span className="text-lg font-bold text-gray-800">Total</span>
                      <span className="text-lg font-bold text-accent-600">₹{total}</span>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <button 
                      className="btn btn-primary w-full"
                      onClick={proceedToCheckout}
                    >
                      Proceed to Checkout
                    </button>
                    
                    <div className="mt-6">
                      <p className="text-sm text-gray-600 text-center">
                        Free shipping on orders over ₹500
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="font-medium text-gray-800 mb-3">We Accept</h3>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 rounded">
                        <span className="text-sm">Visa</span>
                      </div>
                      <div className="p-2 bg-gray-100 rounded">
                        <span className="text-sm">Mastercard</span>
                      </div>
                      <div className="p-2 bg-gray-100 rounded">
                        <span className="text-sm">UPI</span>
                      </div>
                      <div className="p-2 bg-gray-100 rounded">
                        <span className="text-sm">COD</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CartPage;