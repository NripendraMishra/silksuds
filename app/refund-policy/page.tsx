import React from 'react'
import { RefreshCw, Shield, Clock, CheckCircle } from 'lucide-react'

const RefundPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="gradient-bg py-20">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
              Refund, Return & <span className="text-accent-600">Replacement Policy</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              We stand behind our products and ensure your satisfaction
            </p>
          </div>
        </div>
      </section>

      {/* Policy Highlights */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Easy Returns</h3>
              <p className="text-gray-600">7-day return window</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">100% satisfaction</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Quick Process</h3>
              <p className="text-gray-600">Fast refund processing</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No Questions</h3>
              <p className="text-gray-600">Hassle-free returns</p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Return Policy</h2>
                <p className="text-gray-600 mb-6">
                  We want you to be completely satisfied with your purchase. If you're not happy with 
                  your order, you can return it within 7 days of delivery for a full refund or replacement.
                </p>
                
                <h3 className="text-xl font-bold text-gray-800 mb-4">Eligibility for Returns</h3>
                <ul className="list-disc list-inside text-gray-600 mb-8 space-y-2">
                  <li>Items must be returned within 7 days of delivery</li>
                  <li>Products must be in original packaging</li>
                  <li>Items should be unused and in original condition</li>
                  <li>Return request must be initiated through our website or customer service</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-800 mb-4">Items Not Eligible for Return</h3>
                <ul className="list-disc list-inside text-gray-600 mb-8 space-y-2">
                  <li>Products that have been opened and used</li>
                  <li>Items damaged due to misuse or normal wear and tear</li>
                  <li>Products returned after the 7-day return window</li>
                  <li>Items without original packaging or labels</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Refund Policy</h2>
                <p className="text-gray-600 mb-6">
                  Once your return is received and inspected, we will send you an email to notify you 
                  that we have received your returned item. We will also notify you of the approval 
                  or rejection of your refund.
                </p>

                <h3 className="text-xl font-bold text-gray-800 mb-4">Refund Process</h3>
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-white font-bold">1</span>
                      </div>
                      <h4 className="font-bold text-gray-800 mb-2">Initiate Return</h4>
                      <p className="text-sm text-gray-600">Contact us to start the return process</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-secondary-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-white font-bold">2</span>
                      </div>
                      <h4 className="font-bold text-gray-800 mb-2">Ship Back</h4>
                      <p className="text-sm text-gray-600">Send the item back to us</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-white font-bold">3</span>
                      </div>
                      <h4 className="font-bold text-gray-800 mb-2">Get Refund</h4>
                      <p className="text-sm text-gray-600">Receive your refund within 7-10 days</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-4">Refund Timeline</h3>
                <ul className="list-disc list-inside text-gray-600 mb-8 space-y-2">
                  <li>Credit Card: 5-7 business days</li>
                  <li>Debit Card: 7-10 business days</li>
                  <li>Net Banking: 3-5 business days</li>
                  <li>Digital Wallets: 2-3 business days</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Replacement Policy</h2>
                <p className="text-gray-600 mb-6">
                  If you receive a defective or damaged product, we will replace it free of charge. 
                  Please contact us within 48 hours of delivery to report any issues.
                </p>

                <h3 className="text-xl font-bold text-gray-800 mb-4">Replacement Criteria</h3>
                <ul className="list-disc list-inside text-gray-600 mb-8 space-y-2">
                  <li>Product received is defective or damaged</li>
                  <li>Wrong item delivered</li>
                  <li>Missing items from your order</li>
                  <li>Product quality issues</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Cancellation Policy</h2>
                <p className="text-gray-600 mb-6">
                  Orders can be cancelled before they are shipped. Once shipped, orders cannot be 
                  cancelled but can be returned following our return policy.
                </p>

                <h3 className="text-xl font-bold text-gray-800 mb-4">Cancellation Process</h3>
                <ul className="list-disc list-inside text-gray-600 mb-8 space-y-2">
                  <li>Contact customer service immediately</li>
                  <li>Provide your order number and reason for cancellation</li>
                  <li>Cancellation before shipment: Full refund</li>
                  <li>Cancellation after shipment: Return process applies</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Return Shipping</h2>
                <p className="text-gray-600 mb-6">
                  Return shipping costs:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-8 space-y-2">
                  <li>Defective/damaged products: We cover return shipping</li>
                  <li>Change of mind: Customer covers return shipping</li>
                  <li>Wrong item sent: We cover return shipping</li>
                  <li>We will provide a prepaid return label when applicable</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact for Returns</h2>
                <p className="text-gray-600 mb-4">
                  To initiate a return, replacement, or refund, please contact us:
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 font-medium">Devbhojya Customer Service</p>
                  <p className="text-gray-600">Email: devbhojya@gmail.com</p>
                  <p className="text-gray-600">Phone: 1800-212-003000</p>
                  <p className="text-gray-600">Hours: Monday - Saturday, 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600 mt-2">Please have your order number ready when contacting us.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default RefundPolicyPage
