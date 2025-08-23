"use client";
import React from 'react';
import Link from 'next/link';
import { XCircle, ArrowLeft } from 'lucide-react';

const OrderFailedPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <XCircle className="w-16 h-16 text-red-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Payment Failed
        </h1>
        
        <p className="text-gray-600 mb-8">
          We're sorry, but your payment could not be processed. Please try again.
        </p>
        
        <div className="space-y-4">
          <Link href="/checkout" className="btn btn-primary w-full">
            Try Again
          </Link>
          
          <Link href="/cart" className="btn btn-secondary w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderFailedPage;