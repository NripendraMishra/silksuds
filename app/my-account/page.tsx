"use client";
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../context/AuthContext'
import { User, ShoppingBag, Heart, Settings, LogOut } from 'lucide-react'
import { collection, doc, setDoc, getDoc, getDocs, query, orderBy, where } from "firebase/firestore";
import { db, auth } from '../../lib/firebaseConfig';
import { signOut } from "firebase/auth";

const MyAccountPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  // State for profile fields
  const [profile, setProfile] = useState({
    phone: "",
    address: ""
  });

  // Refs for form fields
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLTextAreaElement>(null);

  // State for orders
  const [orders, setOrders] = useState<any[]>([]);

  // Fetch profile data from Firestore
  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      const docRef = doc(db, "user-profiles", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfile({
          phone: data.phone || "",
          address: data.address || ""
        });
        // Set values in refs if they exist
        if (phoneRef.current) phoneRef.current.value = data.phone || "";
        if (addressRef.current) addressRef.current.value = data.address || "";
      }
    };
    fetchProfile();
  }, [user]);

  // Fetch orders from Firestore (flat orders collection)
  useEffect(() => {
    if (!user) return;
    const fetchOrders = async () => {
      const ordersArr: any[] = [];
      const ordersQuery = query(
        collection(db, "orders"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      const ordersSnap = await getDocs(ordersQuery);
      ordersSnap.forEach(orderDoc => {
        ordersArr.push({ ...orderDoc.data(), id: orderDoc.id });
      });
      setOrders(ordersArr);
    };
    fetchOrders();
  }, [user]);

  useEffect(() => {
    if (user === null) {
      router.replace("/login");
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Handle profile update
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const name = nameRef.current?.value || "";
    const phone = phoneRef.current?.value || "";
    const address = addressRef.current?.value || "";

    try {
      await setDoc(doc(db, "user-profiles", user.uid), {
        name,
        phone,
        address,
        email: user.email,
        updatedAt: new Date()
      }, { merge: true });
      alert("Profile updated successfully!");
      setProfile({ phone, address });
    } catch (error) {
      alert("Failed to update profile.");
      console.error(error);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="gradient-bg py-20">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
              My <span className="text-accent-600">Account</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Manage your orders, profile, and preferences
            </p>
          </div>
        </div>
      </section>

      {/* Account Content */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{user.displayName}</h3>
                  <p className="text-gray-600">{user.email}</p>
                </div>
                <nav className="space-y-2">
                  <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-accent-50 text-accent-600 font-medium">
                    <User className="w-5 h-5" />
                    <span>Profile</span>
                  </a>
                  <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700">
                    <ShoppingBag className="w-5 h-5" />
                    <span>Orders</span>
                  </a>
                  <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700">
                    <Heart className="w-5 h-5" />
                    <span>Wishlist</span>
                  </a>
                  <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700">
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                  </a>
                  <a
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      handleLogout();
                    }}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50 text-red-600"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </a>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Information</h2>
                <form className="space-y-6" onSubmit={handleProfileUpdate}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      ref={nameRef}
                      defaultValue={user.displayName || ""}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={user.email || ""}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                      disabled
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      ref={phoneRef}
                      defaultValue={profile.phone}
                      placeholder="+91 9876543210"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      ref={addressRef}
                      rows={3}
                      defaultValue={profile.address}
                      placeholder="123 Main Street, City, State - 123456"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    ></textarea>
                  </div>
                  <div className="flex space-x-4">
                    <button type="submit" className="btn btn-primary">
                      Update Profile
                    </button>
                    <button type="button" className="btn btn-outline">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Orders</h2>
                <div className="space-y-4">
                  {orders.length === 0 && (
                    <div className="text-gray-500 text-center py-8">No orders found.</div>
                  )}
                  {orders.map((order, idx) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-gray-800">Order #{order.orderId || order.id}</h3>
                          <p className="text-gray-600">
                            Placed on {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : order.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-accent-600">₹{order.total}</p>
                          <span className={`inline-block px-2 py-1 rounded-full text-sm ${
                            order.status === "delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "shipped"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "processing" || order.status === "failed"
                              ? "bg-yellow-100 text-yellow-800" 
                              : "bg-gray-100 text-gray-800"
                          }`}>
                            {order.status === "failed"
                              ? "Under Processing"
                              : order.status
                              ? order.status.charAt(0).toUpperCase() + order.status.slice(1)
                              : "Processing"}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center space-x-4">
                        <div className="text-3xl">🌾</div>
                        <div>
                          <p className="font-medium">
                            {order.items && order.items.length > 0
                              ? order.items.map((item: any) => item.name).join(", ")
                              : "—"}
                          </p>
                          <p className="text-sm text-gray-600">
                            {order.items ? `${order.items.length} item${order.items.length > 1 ? "s" : ""}` : ""}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MyAccountPage
