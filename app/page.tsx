"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Star, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
  slug: string
}

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  // Get products with id 2, 3, 4
  const bestSellers = products.filter(
    (p) => p.id === 2 || p.id === 3 || p.id === 4
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg py-20 lg:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 leading-tight">
                Premium <span className="text-accent-600">Ayurvedic</span> Soaps
              </h1>
              <p className="text-xl text-gray-600 max-w-lg">
                Experience the purity of nature with our handcrafted ayurvedic soaps. 
                Premium quality soaps with natural ingredients for healthy, glowing skin.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/shop" className="btn btn-primary">
                  SHOP NOW
                </Link>
                <Link href="/about" className="btn btn-outline">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-white rounded-full shadow-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🧼</div>
                  <h3 className="text-2xl font-bold text-gray-800">100% Natural</h3>
                  <p className="text-gray-600">Ayurvedic Soaps</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">BEST SELLERS</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our most popular ayurvedic soaps, loved by families for their natural benefits
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bestSellers.map((product) => (
              <div
                key={product.id}
                className="card cursor-pointer hover:shadow-xl transition"
                onClick={() => router.push(`/product/${product.slug}`)}
              >
                <div className="aspect-square bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center overflow-hidden">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="object-cover"
                    />
                  ) : (
                    <div className="text-6xl">🧼</div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex items-center justify-end">
                    <button
                      className="btn btn-secondary"
                      onClick={e => { e.stopPropagation(); router.push(`/product/${product.slug}`); }}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">TOP REVIEWS</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              What our customers say about our ayurvedic soaps
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Review 1 */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="ml-2 text-gray-600 font-medium">5/5</span>
              </div>
              <p className="text-gray-700 mb-4">
                "I have been using SilkSuds ayurvedic soaps for months now. The Alovera Milk Soap is amazing for my sensitive skin - it's so gentle and moisturizing. The natural ingredients make such a difference. I love how soft and healthy my skin feels after every use. SilkSuds has become my family's trusted soap brand."
              </p>
              <cite className="text-accent-600 font-medium">- Deepika Pandey</cite>
            </div>

            {/* Review 2 */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="ml-2 text-gray-600 font-medium">5/5</span>
              </div>
              <p className="text-gray-700 mb-4">
                "SilkSuds ayurvedic soaps are exceptional! The Neem Tulsi soap has helped clear my acne-prone skin naturally. I appreciate that they use traditional ayurvedic ingredients without harsh chemicals. The quality is consistent and the results speak for themselves. Highly recommend for anyone seeking natural skincare solutions."
              </p>
              <cite className="text-accent-600 font-medium">- Manraj Singh</cite>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container">
          <div className="bg-gradient-to-r from-accent-600 to-secondary-600 rounded-2xl p-8 lg:p-12 text-white text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Experience Natural Beauty!</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Discover the power of ayurvedic ingredients in our premium soaps. 
              Order now and experience the natural goodness for healthy, glowing skin.
            </p>
            <Link href="/shop" className="btn bg-white text-accent-600 hover:bg-gray-100 text-lg px-8 py-4">
              SHOP NOW
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
