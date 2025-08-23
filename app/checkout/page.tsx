"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CreditCard, Truck, Shield, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { db } from '../../lib/firebaseConfig';
import { collection, doc, setDoc, getDoc, addDoc } from 'firebase/firestore';
import { trackPurchase, trackClick } from '../../lib/analytics';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

const CheckoutPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Fetch cart items from Firebase
  useEffect(() => {
    if (!user) {
      router.push('/login?redirect=checkout');
      return;
    }

    const fetchCartAndProfile = async () => {
      try {
        // Fetch cart
        const cartRef = doc(db, "user-carts", user.uid);
        const cartSnap = await getDoc(cartRef);
        if (cartSnap.exists()) {
          setCartItems(cartSnap.data().items || []);
        } else {
          setCartItems([]);
        }

        // Fetch user profile
        const profileRef = doc(db, "user-profiles", user.uid);
        const profileSnap = await getDoc(profileRef);
        if (profileSnap.exists()) {
          const profile = profileSnap.data();
          setShippingAddress({
            fullName: profile.name || "",
            phone: profile.phone || "",
            email: profile.email || "",
            address: profile.address || "",
            city: profile.city || "",
            state: profile.state || "",
            pincode: profile.pincode || ""
          });
        }
      } catch (error) {
        console.error("Error fetching cart/profile:", error);
        setCartItems([]);
      }
      setLoading(false);
    };

    fetchCartAndProfile();
  }, [user, router]);

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shippingCost = subtotal > 500 ? 0 : 50;
  const total = subtotal + shippingCost;

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Validate form
  const validateForm = () => {
    const requiredFields = ['fullName', 'phone', 'email', 'address', 'city', 'state', 'pincode'];
    return requiredFields.every(field => shippingAddress[field as keyof ShippingAddress].trim() !== '');
  };

  // Handle Paytm payment
  const handlePaytmPayment = async () => {
    if (!validateForm()) {
      alert('Please fill in all required fields');
      return;
    }

    setProcessingPayment(true);

    // Prepare order data
    const orderData = {
      userId: user?.uid,
      items: cartItems,
      shippingAddress,
      subtotal,
      shippingCost,
      total,
      paymentMethod: 'paytm',
      status: 'pending',
      createdAt: new Date().toISOString(),
      orderId: `ORDER_${Date.now()}`
    };

    let orderRefId = null;
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0]; // e.g. "2025-07-16"

    // Track purchase attempt
    trackClick('payment_initiated', {
      payment_method: 'paytm',
      order_value: total,
      items_count: cartItems.length
    });

    try {
      setPaymentError(null);

      // Save pincode, city, and state to user profile in Firebase
      if (!user) {
        alert('User not authenticated. Please log in again.');
        setProcessingPayment(false);
        return;
      }
      const profileRef = doc(db, "user-profiles", user.uid);
      await setDoc(profileRef, {
        pincode: shippingAddress.pincode,
        city: shippingAddress.city,
        state: shippingAddress.state
      }, { merge: true });

      // Save order to: orders/{autoId}
      const orderRef = await addDoc(collection(db, 'orders'), {
        ...orderData,
        status: 'pending'
      });
      orderRefId = orderRef.id;

      // Paytm payment integration
      const paytmParams = {
        MID: process.env.NEXT_PUBLIC_PAYTM_MID || 'YOUR_MERCHANT_ID',
        WEBSITE: process.env.NEXT_PUBLIC_PAYTM_WEBSITE || 'WEBSTAGING',
        CHANNEL_ID: 'WEB',
        INDUSTRY_TYPE_ID: 'Retail',
        ORDER_ID: orderData.orderId,
        CUST_ID: user?.uid,
        TXN_AMOUNT: total.toString(),
        CALLBACK_URL: `${window.location.origin}/api/paytm/callback`,
        EMAIL: shippingAddress.email,
        MOBILE_NO: shippingAddress.phone,
      };

      // Call your backend API to generate checksum
      const response = await fetch('/api/paytm/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...paytmParams,
          orderRef: orderRefId
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Redirect to Paytm payment page
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = data.paytmURL;

        Object.keys(data.params).forEach(key => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = data.params[key];
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      } else {
        // Payment initiation failed, update order status
        if (!user) {
          setPaymentError('User not authenticated. Please log in again.');
          setProcessingPayment(false);
          return;
        }
        await setDoc(doc(db, 'orders', user.uid, dateStr, orderRefId), {
          ...orderData,
          status: 'failed',
          error: data.message || 'Payment initiation failed'
        }, { merge: true });
        throw new Error(data.message || 'Payment initiation failed');
      }
    } catch (error) {
      // Save failed order to Firebase
      if (orderRefId) {
        if (user) {
          await setDoc(doc(db, 'orders', user.uid, dateStr, orderRefId), {
            ...orderData,
            status: 'failed',
            error: 'Payment failed'
          }, { merge: true });
        }
      } else {
        if (user) {
          const ordersDateCollection = collection(db, 'orders', user.uid, dateStr);
          await addDoc(ordersDateCollection, {
            ...orderData,
            status: 'failed',
            error: 'Payment failed'
          });
        }
      }
      setPaymentError('Payment failed. Your order has already been placed. Please contact support if you need assistance.');
      console.error('Payment error:', error);
    } finally {
      setProcessingPayment(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-600"></div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <section className="gradient-bg py-20">
          <div className="container">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
                Your cart is empty
              </h1>
              <Link href="/shop" className="btn btn-primary">
                Continue Shopping
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="gradient-bg py-20">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
              <span className="text-accent-600">Checkout</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Complete your order and enjoy our premium products
            </p>
          </div>
        </div>
      </section>

      {/* Checkout Content */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Shipping & Payment Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Back to Cart */}
              <Link href="/cart" className="inline-flex items-center text-accent-600 hover:text-accent-800">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Cart
              </Link>

              {/* Shipping Address */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Truck className="w-6 h-6 mr-2 text-accent-600" />
                  Shipping Address
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={shippingAddress.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingAddress.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={shippingAddress.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={shippingAddress.pincode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                      placeholder="Enter pincode"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={shippingAddress.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                      placeholder="Enter your complete address"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={shippingAddress.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                      placeholder="Enter your city"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={shippingAddress.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                      placeholder="Enter your state"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <CreditCard className="w-6 h-6 mr-2 text-accent-600" />
                  Payment Method
                </h2>
                
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                          <CreditCard className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">Paytm Payment Gateway</h3>
                          <p className="text-sm text-gray-600">Pay securely with Paytm</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-gray-500">Supported</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Shield className="w-4 h-4 mr-2" />
                      Your payment information is encrypted and secure
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
                
                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium text-gray-800">{item.name}</h4>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-accent-600">₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Pricing */}
                <div className="space-y-4 border-t pt-4">
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
                
                {/* Place Order Button */}
                <div className="mt-8">
                  <button
                    className="btn btn-primary w-full"
                    onClick={handlePaytmPayment}
                    disabled={processingPayment || !!paymentError}
                  >
                    {processingPayment ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      `Pay ₹${total} with Paytm`
                    )}
                  </button>
                  {paymentError && (
                    <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded text-center">
                      {paymentError}
                    </div>
                  )}
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                      Free shipping on orders over ₹500
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CheckoutPage;