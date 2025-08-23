import React from 'react'
import { Truck, Clock, MapPin, Package } from 'lucide-react'

const ShippingDeliveryPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="gradient-bg py-20">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
              Shipping & <span className="text-accent-600">Delivery</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Fast, reliable delivery of fresh products to your doorstep
            </p>
          </div>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Free Shipping</h3>
              <p className="text-gray-600">On orders above ₹500</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">2-5 business days</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Pan India</h3>
              <p className="text-gray-600">We deliver across India</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Secure Packaging</h3>
              <p className="text-gray-600">Fresh and safe delivery</p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Delivery Areas</h2>
                <p className="text-gray-600 mb-8">
                  We currently deliver to all major cities and towns across India. Our delivery network 
                  covers urban and semi-urban areas to ensure you receive fresh products wherever you are.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Shipping Charges</h2>
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-bold text-gray-800 mb-2">Standard Delivery</h3>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Orders above ₹500: FREE</li>
                        <li>• Orders below ₹500: ₹50</li>
                        <li>• Delivery time: 3-5 business days</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-2">Express Delivery</h3>
                      <ul className="text-gray-600 space-y-1">
                        <li>• All orders: ₹100</li>
                        <li>• Delivery time: 1-2 business days</li>
                        <li>• Available in major cities</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Processing</h2>
                <p className="text-gray-600 mb-6">
                  Orders are processed within 24 hours of placement. You will receive a confirmation 
                  email with tracking information once your order is shipped.
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-8 space-y-2">
                  <li>Orders placed before 2 PM are processed the same day</li>
                  <li>Orders placed after 2 PM are processed the next business day</li>
                  <li>Weekend orders are processed on the next business day</li>
                  <li>Holiday orders may take additional processing time</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Delivery Schedule</h2>
                <p className="text-gray-600 mb-6">
                  Our delivery partners operate from Monday to Saturday:
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-bold text-gray-800">Monday - Friday</h4>
                      <p className="text-gray-600">9:00 AM - 7:00 PM</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Saturday</h4>
                      <p className="text-gray-600">9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Special Handling</h2>
                <p className="text-gray-600 mb-6">
                  Our products are perishable and require special handling:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-8 space-y-2">
                  <li>Products are packed in moisture-proof packaging</li>
                  <li>Special care is taken to prevent contamination</li>
                  <li>Products are stored in temperature-controlled environment</li>
                  <li>Fragile items are given extra protection</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Delivery Issues</h2>
                <p className="text-gray-600 mb-6">
                  In case of delivery issues, please contact us immediately:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-8 space-y-2">
                  <li>Damaged products will be replaced free of charge</li>
                  <li>Missing items will be reshipped at no extra cost</li>
                  <li>Delivery delays will be communicated in advance</li>
                  <li>Alternative delivery arrangements can be made</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Track Your Order</h2>
                <p className="text-gray-600 mb-8">
                  Once your order is shipped, you will receive a tracking number via email and SMS. 
                  You can track your order status through our website or by contacting our customer service.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Us</h2>
                <p className="text-gray-600 mb-4">
                  For any shipping-related queries, please contact us:
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 font-medium">Devbhojya Customer Service</p>
                  <p className="text-gray-600">Email: devbhojya@gmail.com</p>
                  <p className="text-gray-600">Phone: 1800-212-003000</p>
                  <p className="text-gray-600">Hours: Monday - Saturday, 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ShippingDeliveryPage
