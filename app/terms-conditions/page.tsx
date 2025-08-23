import React from 'react'

const TermsConditionsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="gradient-bg py-20">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
              Terms & <span className="text-accent-600">Conditions</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Please read these terms and conditions carefully before using our service.
            </p>
            <p className="text-gray-600">Last updated: January 1, 2025</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Acceptance of Terms</h2>
                <p className="text-gray-600 mb-8">
                  By accessing and using this website, you accept and agree to be bound by the terms 
                  and provision of this agreement. If you do not agree to abide by the above, please 
                  do not use this service.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Use License</h2>
                <p className="text-gray-600 mb-6">
                  Permission is granted to temporarily download one copy of the materials on Devbhojya's 
                  website for personal, non-commercial transitory viewing only. This is the grant of a 
                  license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-8 space-y-2">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to decompile or reverse engineer any software contained on the website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Product Information</h2>
                <p className="text-gray-600 mb-8">
                  We strive to provide accurate product information, but we do not warrant that product 
                  descriptions or other content on this site is accurate, complete, reliable, current, 
                  or error-free. We reserve the right to correct any errors, inaccuracies, or omissions 
                  and to change or update information at any time without prior notice.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Pricing and Payment</h2>
                <p className="text-gray-600 mb-6">
                  All prices are subject to change without notice. We reserve the right to:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-8 space-y-2">
                  <li>Modify or discontinue any product at any time</li>
                  <li>Change prices for our products</li>
                  <li>Limit quantities of products available for purchase</li>
                  <li>Refuse service to anyone for any reason</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Orders and Delivery</h2>
                <p className="text-gray-600 mb-6">
                  By placing an order, you represent that:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-8 space-y-2">
                  <li>You are legally capable of entering into binding contracts</li>
                  <li>You are at least 18 years old</li>
                  <li>The information you provide is accurate and complete</li>
                  <li>You will pay for all products ordered</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Returns and Refunds</h2>
                <p className="text-gray-600 mb-8">
                  Please refer to our separate Return and Refund Policy for detailed information about 
                  returns, exchanges, and refunds. By making a purchase, you agree to our return policy.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Prohibited Uses</h2>
                <p className="text-gray-600 mb-6">
                  You may not use our service:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-8 space-y-2">
                  <li>For any unlawful purpose or to solicit others to perform illegal acts</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Disclaimer</h2>
                <p className="text-gray-600 mb-8">
                  The materials on Devbhojya's website are provided on an 'as is' basis. Devbhojya makes 
                  no warranties, expressed or implied, and hereby disclaim and negate all other warranties 
                  including without limitation, implied warranties or conditions of merchantability, fitness 
                  for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Limitations</h2>
                <p className="text-gray-600 mb-8">
                  In no event shall Devbhojya or its suppliers be liable for any damages (including, without 
                  limitation, damages for loss of data or profit, or due to business interruption) arising 
                  out of the use or inability to use the materials on Devbhojya's website, even if Devbhojya 
                  or a Devbhojya authorized representative has been notified orally or in writing of the 
                  possibility of such damage.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Governing Law</h2>
                <p className="text-gray-600 mb-8">
                  These terms and conditions are governed by and construed in accordance with the laws of 
                  India and you irrevocably submit to the exclusive jurisdiction of the courts in that 
                  state or location.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about these Terms and Conditions, please contact us:
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 font-medium">Devbhojya</p>
                  <p className="text-gray-600">Email: devbhojya@gmail.com</p>
                  <p className="text-gray-600">Phone: 1800-212-003000</p>
                  <p className="text-gray-600">Address: K-294, Site-5, Kasna, Greater Noida UP. 201308</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TermsConditionsPage
