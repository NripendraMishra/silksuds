"use client";
import React from 'react';
import Link from 'next/link';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';

const OrderSuccessPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Order Placed Successfully!
        </h1>
        
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your order has been confirmed and will be processed shortly.
        </p>
        
        <div className="space-y-4">
          <Link href="/shop" className="btn btn-primary w-full">
            Continue Shopping
          </Link>
          
          <Link href="/my-account" className="btn btn-secondary w-full">
            View My Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;