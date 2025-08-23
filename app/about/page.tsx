import React from 'react'
import Link from 'next/link'
import { Award, Users, Heart, Leaf } from 'lucide-react'

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg py-20">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
              About <span className="text-accent-600">SilkSuds</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Crafting premium ayurvedic soaps with natural ingredients to bring you the purest skincare experience.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">The SilkSuds Story</h2>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                SilkSuds was born from a passion for natural skincare and the ancient wisdom of Ayurveda. 
                We believe that the best ingredients for your skin come directly from nature, 
                without harsh chemicals or artificial additives.
              </p>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Our handcrafted ayurvedic soaps combine traditional recipes with modern manufacturing 
                techniques to deliver premium quality soaps that nourish, protect, and rejuvenate your skin naturally.
              </p>
              <Link href="/shop" className="btn btn-primary">
                START SHOPPING
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">🧼</div>
                  <h3 className="text-2xl font-bold text-gray-800">Natural Ingredients</h3>
                  <p className="text-gray-600">Ayurvedic Formulations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              What drives us to deliver the best natural skincare products to your family
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Value 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Quality</h3>
              <p className="text-gray-600">
                Premium quality ayurvedic soaps crafted with the finest natural ingredients
              </p>
            </div>

            {/* Value 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Natural</h3>
              <p className="text-gray-600">
                100% natural ingredients without harsh chemicals or artificial additives
              </p>
            </div>

            {/* Value 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Health</h3>
              <p className="text-gray-600">
                Ayurvedic formulations for healthy, glowing skin and overall wellness
              </p>
            </div>

            {/* Value 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Family</h3>
              <p className="text-gray-600">
                Products made with love and care for every family member
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Info Section */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">🏭</div>
                  <h3 className="text-2xl font-bold text-gray-800">Modern Facility</h3>
                  <p className="text-gray-600">Hygienic & Quality Assured</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
                SilkSuds Manufacturing
              </h2>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                Our manufacturing facility is dedicated to creating premium ayurvedic soaps using 
                traditional formulations combined with modern production techniques.
              </p>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Every soap is carefully crafted to ensure the highest quality standards while 
                preserving the natural benefits of ayurvedic ingredients for your skin's health and wellness.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-accent-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Quality Assured Manufacturing</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-accent-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Traditional Ayurvedic Formulations</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-accent-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Modern Hygienic Facility</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-accent-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Experience Natural Beauty?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust SilkSuds for their natural skincare needs
          </p>
          <Link href="/shop" className="btn bg-white text-accent-600 hover:bg-gray-100 text-lg px-8 py-4">
            SHOP NOW
          </Link>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
