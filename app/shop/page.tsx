"use client";
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ShoppingCart, Star, Filter } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { db } from '../../lib/firebaseConfig'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import Link from 'next/link'

const ShopPage = () => {
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [search, setSearch] = useState<string>('')
  const [cartItems, setCartItems] = useState<any[]>([])
  const { user } = useAuth()

  // Load cart from Firebase if logged in
  useEffect(() => {
    if (!user) {
      setCartItems([])
      return
    }
    const fetchCart = async () => {
      const cartRef = doc(db, 'user-carts', user.uid)
      const cartSnap = await getDoc(cartRef)
      if (cartSnap.exists()) {
        setCartItems(cartSnap.data().items || [])
      } else {
        setCartItems([])
      }
    }
    fetchCart()
  }, [user])

  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        // Ensure only strings in categories
        const cats = Array.from(
          new Set(
            data.map((p: any) =>
              typeof p.category === "string" ? p.category : "Uncategorized"
            )
          )
        ).filter((cat): cat is string => typeof cat === "string");
        setCategories(['All', ...cats])
      })
  }, [])

  // Filter products based on selected category and search
  const filteredProducts = products.filter(product =>
    (selectedCategory === 'All' || product.category === selectedCategory) &&
    product.name.toLowerCase().includes(search.toLowerCase())
  )

  // Cart summary
  const totalItems = cartItems.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0)
  const totalPrice = cartItems.reduce((sum: number, item: any) => sum + (item.price * (item.quantity || 0)), 0)

  // Update cart in Firestore
  const updateCart = async (updatedCart: any[]) => {
    if (!user) return
    setCartItems(updatedCart)
    const cartRef = doc(db, 'user-carts', user.uid)
    await setDoc(cartRef, { items: updatedCart }, { merge: true })
  }

  // Add to cart handler
  const handleAddToCart = async (product: any) => {
    if (!user) {
      // Not logged in: show a message or redirect to login
      alert("Please sign in to add items to your cart.")
      return
    }
    const existing = cartItems.find((item: any) => item.name === product.name)
    let updatedCart
    if (existing) {
      updatedCart = cartItems.map((item: any) =>
        item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
      )
    } else {
      updatedCart = [...cartItems, { ...product, quantity: 1 }]
    }
    await updateCart(updatedCart)
  }

  // Increase quantity
  const handleIncrease = async (product: any) => {
    if (!user) return
    const updatedCart = cartItems.map((item: any) =>
      item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
    )
    await updateCart(updatedCart)
  }

  // Decrease quantity
  const handleDecrease = async (product: any) => {
    if (!user) return
    const existing = cartItems.find((item: any) => item.name === product.name)
    if (!existing) return
    let updatedCart
    if (existing.quantity === 1) {
      updatedCart = cartItems.filter((item: any) => item.name !== product.name)
    } else {
      updatedCart = cartItems.map((item: any) =>
        item.name === product.name ? { ...item, quantity: item.quantity - 1 } : item
      )
    }
    await updateCart(updatedCart)
  }

  return (
    <div className="min-h-screen">
      {/* Example header cart summary */}
      {/* <header className="w-full flex justify-end items-center p-4 bg-white border-b">
        <div className="flex items-center space-x-2">
          <ShoppingCart className="w-5 h-5" />
          <span className="text-xs">{totalItems} items</span>
          <span className="text-xs">| ₹{totalPrice}</span>
        </div>
      </header> */}

      {/* Hero Section */}
      <section className="gradient-bg py-20">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
              Our <span className="text-accent-600">Soaps</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover our range of premium ayurvedic soaps crafted with natural ingredients
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700 font-medium">Filter by Category:</span>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`px-4 py-2 rounded-full border border-gray-300 hover:border-accent-600 hover:text-accent-600 transition-colors
                        ${selectedCategory === category ? 'bg-accent-600 text-white border-accent-600' : ''}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              {/* Search Box below Filter by Category */}
              <div className="flex items-center space-x-2 w-full max-w-xs">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Sort by:</span>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent">
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating: High to Low</option>
                <option>Most Popular</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const cartItem = cartItems.find((item: any) => item.name === product.name)
              return (
                <Link key={product.id} href={`/product/${product.slug}`} className="card group">
                  <div className="aspect-square bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center relative overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-accent-600 font-medium">{product.category}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{product.rating}</span>
                        <span className="text-sm text-gray-500">({product.reviews})</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-accent-600">₹{product.price}</span>
                        <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
                      </div>
                      {/* Cart actions */}
                      {!user ? (
                        <button
                          className="btn btn-secondary"
                          onClick={handleAddToCart.bind(null, product)}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </button>
                      ) : !cartItem ? (
                        <button
                          className="btn btn-secondary"
                          onClick={handleAddToCart.bind(null, product)}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </button>
                      ) : (
                        <span className="flex items-center space-x-2">
                          <button
                            className="px-2 py-1 bg-accent-600 text-white rounded-l hover:bg-accent-700"
                            onClick={() => handleDecrease(product)}
                          >-</button>
                          <span className="px-3 py-1 bg-gray-100 border">{cartItem.quantity}</span>
                          <button
                            className="px-2 py-1 bg-accent-600 text-white rounded-r hover:bg-accent-700"
                            onClick={() => handleIncrease(product)}
                          >+</button>
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Our Products?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our products are made with the finest ingredients and traditional methods
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🌿</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">100% Natural</h3>
              <p className="text-gray-600">No artificial additives or preservatives</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">❄️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Hand Made</h3>
              <p className="text-gray-600">Premium ayurvedic soaps crafted with natural ingredients</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">ISO Certified</h3>
              <p className="text-gray-600">Quality assured with ISO:9001-2015</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Free Delivery</h3>
              <p className="text-gray-600">Free shipping on orders above ₹500</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ShopPage
