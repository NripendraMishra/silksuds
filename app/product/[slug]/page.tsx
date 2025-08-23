"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, ArrowLeft, Plus, Minus, Truck, Shield, Award } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useCart } from '../../../context/CartContext';
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../../lib/firebaseConfig";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  description: string;
  category: string;
  rating: number;
  reviews: number;
  weight?: string;
  ingredients?: string;
  nutritionalInfo?: string;
  benefits?: string[];
  details: string;
  slug: string; // Added slug for product URL
}

const ProductDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { addToCart, cartItems } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [ratingLoading, setRatingLoading] = useState(false);
  // Add state for user's own rating
  const [myRating, setMyRating] = useState<{ rating: number, comment: string } | null>(null);

  // Load product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('/products.json');
        const products = await response.json();
        // Find product by slug instead of id
        const foundProduct = products.find((p: Product) => p.slug === params?.slug);
        setProduct(foundProduct || null);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [params?.slug]);

  // Load wishlist for logged-in user
  useEffect(() => {
    if (!user) return;
    const fetchWishlist = async () => {
      const ref = doc(db, "user-wishlists", user.uid);
      const snap = await getDoc(ref);
      setWishlist(snap.exists() ? snap.data().items || [] : []);
    };
    fetchWishlist();
  }, [user]);

  // Check if user has purchased this product
  useEffect(() => {
    if (!user || !product) return;
    const checkPurchase = async () => {
      const ordersRef = collection(db, "orders");
      // You may want to use a query here for efficiency
      const ordersSnap = await getDocs(ordersRef);
      const purchased = ordersSnap.docs.some(doc =>
        doc.data().userId === user.uid &&
        doc.data().items.some((item: any) => item.slug === product.slug)
      );
      setHasPurchased(purchased);
    };
    checkPurchase();
  }, [user, product]);

  // Fetch user's own rating when product or user changes
  useEffect(() => {
    if (!user || !product) return;
    const fetchMyRating = async () => {
      const ref = doc(db, "product-ratings", product.slug);
      const snap = await getDoc(ref);
      if (snap.exists() && snap.data().ratings) {
        const found = snap.data().ratings.find((r: any) => r.userId === user.uid);
        if (found) setMyRating({ rating: found.rating, comment: found.comment });
        else setMyRating(null);
      }
    };
    fetchMyRating();
  }, [user, product, ratingLoading]);

  // Get current item in cart
  const cartItem = cartItems.find(item => item.id === product?.id);

  const handleAddToCart = async () => {
    if (!product) return;
    
    if (!user) {
      router.push('/login?redirect=' + encodeURIComponent(`/product/${product.slug}`));
      return;
    }
    
    try {
      await addToCart(product, quantity);
      // Optional: Show success message
      console.log('Product added to cart successfully');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    }
  };

  const handleWishlist = async () => {
    if (!user || !product) return;
    setWishlistLoading(true);
    const ref = doc(db, "user-wishlists", user.uid);
    if (wishlist.includes(product.slug)) {
      await updateDoc(ref, { items: arrayRemove(product.slug) });
      setWishlist(wishlist.filter(slug => slug !== product.slug));
    } else {
      await setDoc(ref, { items: arrayUnion(product.slug) }, { merge: true });
      setWishlist([...wishlist, product.slug]);
    }
    setWishlistLoading(false);
  };

  // Update handleRatingSubmit to also update myRating state
  const handleRatingSubmit = async () => {
    if (!user || !product || userRating < 1) return;
    setRatingLoading(true);
    const ref = doc(db, "product-ratings", product.slug);
    await setDoc(ref, {
      ratings: arrayUnion({
        userId: user.uid,
        rating: userRating,
        comment: userComment,
        date: new Date().toISOString()
      })
    }, { merge: true });
    setRatingLoading(false);
    setMyRating({ rating: userRating, comment: userComment });
    setUserRating(0);
    setUserComment("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <Link href="/shop" className="btn btn-primary">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <section className="py-8 bg-white border-b">
        <div className="container">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-accent-600">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-accent-600">Shop</Link>
            <span>/</span>
            <span className="text-gray-800">{product.name}</span>
          </div>
          <Link href="/shop" className="inline-flex items-center text-accent-600 hover:text-accent-800 mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Link>
        </div>
      </section>

      {/* Product Details */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl overflow-hidden relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {discountPercentage > 0 && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {discountPercentage}% OFF
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-accent-600 font-medium bg-accent-100 px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-lg font-semibold">{product.rating}</span>
                    <span className="text-gray-500">({product.reviews} reviews)</span>
                  </div>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
                <p className="text-lg text-gray-600 mb-6">{product.description}</p>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <span className="text-4xl font-bold text-accent-600">₹{product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-2xl text-gray-500 line-through">₹{product.originalPrice}</span>
                  )}
                </div>
                <p className="text-green-600 font-medium">
                  You save ₹{product.originalPrice - product.price} ({discountPercentage}% off)
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <div className="flex items-center space-x-3">
                    <button
                      className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-16 text-center font-semibold text-lg">{quantity}</span>
                    <button
                      className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Cart Status */}
                {cartItem && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800 font-medium">
                      ✅ {cartItem.quantity} item(s) already in cart
                    </p>
                  </div>
                )}
              </div>

              {/* Add to Cart Button */}
              <div className="space-y-4">
                <button
                  className={`btn w-full py-4 text-lg transition
                    ${product.price * quantity === 0 ? "bg-gray-300 text-gray-400 cursor-not-allowed border-gray-200 hover:bg-gray-300 hover:text-gray-400" : "btn-primary"}
                `}
                onClick={async () => {
                  if (product.price * quantity === 0) return;
                  if (!user) {
                    router.push('/login?redirect=' + encodeURIComponent(`/product/${product.slug}`));
                    return;
                  }
                  await handleAddToCart();
                  router.push('/cart');
                }}
                disabled={product.price * quantity === 0}
                >
                  Proceed to checkout
                </button>
                
                {user && (
                  <button
                    className={`btn w-full py-2 mt-2 ${wishlist.includes(product.slug) ? "btn-secondary" : "btn-outline"}`}
                    onClick={handleWishlist}
                    disabled={wishlistLoading}
                  >
                    {wishlist.includes(product.slug) ? "Remove from Wishlist" : "Add to Wishlist"}
                  </button>
                )}

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center space-y-2 p-4 bg-white rounded-lg border">
                    <Truck className="w-6 h-6 text-accent-600" />
                    <span className="text-xs text-gray-600">Free Shipping</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2 p-4 bg-white rounded-lg border">
                    <Shield className="w-6 h-6 text-accent-600" />
                    <span className="text-xs text-gray-600">Quality Assured</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2 p-4 bg-white rounded-lg border">
                    <Award className="w-6 h-6 text-accent-600" />
                    <span className="text-xs text-gray-600">100% Pure</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-16">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Description */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">About This Product</h3>
                    <p className="text-gray-600 mb-6 text-justify">{product.details}</p>
                    
                    {product.benefits && (
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">Key Benefits</h4>
                        <ul className="space-y-2">
                          {product.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <span className="text-accent-600 mt-1">•</span>
                              <span className="text-gray-600">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Specifications */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Specifications</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="font-medium text-gray-700">Category</span>
                        <span className="text-gray-600">{product.category}</span>
                      </div>
                  {myRating && (
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">Your Rating</span>
                      <span className="flex items-center space-x-1">
                        <StarRatingInput value={myRating.rating} onChange={() => {}} disabled />
                        <span className="text-gray-600 ml-2">{myRating.comment}</span>
                      </span>
                    </div>
                  )}
                      {product.weight && (
                        <div className="flex justify-between py-2 border-b border-gray-200">
                          <span className="font-medium text-gray-700">Weight</span>
                          <span className="text-gray-600">{product.weight}</span>
                        </div>
                      )}
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="font-medium text-gray-700">Rating</span>
                        <span className="text-gray-600">{product.rating}/5 ({product.reviews} reviews)</span>
                      </div>
                      {product.ingredients && (
                        <div className="py-2">
                          <span className="font-medium text-gray-700 block mb-2">Ingredients</span>
                          <span className="text-gray-600">{product.ingredients}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Rating Form */}
          {user && hasPurchased && (
            <form
              className="mt-6 bg-white p-4 rounded-lg border"
              onSubmit={e => {
                e.preventDefault();
                if (userRating < 1 || userRating > 5) return; // Ensure valid rating
                handleRatingSubmit();
              }}
            >
              <label className="block mb-2 font-medium">Your Rating</label>
              <StarRatingInput
                value={userRating}
                onChange={setUserRating}
                disabled={ratingLoading}
              />
              <textarea
                value={userComment}
                onChange={e => setUserComment(e.target.value)}
                placeholder="Your comment (optional)"
                className="border rounded px-2 py-1 mb-2 w-full"
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={ratingLoading || userRating < 1 || userRating > 5}
              >
                Submit Rating
              </button>
            </form>
          )}

          {/* Star Rating Component */}
          <div className="mt-4">
            <StarRatingInput
              value={userRating}
              onChange={setUserRating}
              disabled={ratingLoading}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

interface StarRatingInputProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const StarRatingInput: React.FC<StarRatingInputProps> = ({ value, onChange, disabled = false }) => (
  <div className="flex items-center space-x-1 mb-2">
    {[1, 2, 3, 4, 5].map(star => (
      <button
        key={star}
        type="button"
        className="focus:outline-none"
        onClick={() => !disabled && onChange(star)}
        disabled={disabled}
      >
        <Star
          className={`w-6 h-6 ${value >= star ? "text-yellow-400 fill-current" : "text-gray-300"}`}
          fill={value >= star ? "#facc15" : "none"}
        />
      </button>
    ))}
  </div>
);

export default ProductDetailPage;
