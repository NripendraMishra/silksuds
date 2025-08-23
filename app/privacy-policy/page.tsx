import React from 'react'

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="gradient-bg py-20">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
              Privacy <span className="text-accent-600">Policy</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
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
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Information We Collect</h2>
                <p className="text-gray-600 mb-6">
                  We collect information you provide directly to us, such as when you create an account, 
                  make a purchase, or contact us. This may include:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-8 space-y-2">
                  <li>Name and contact information</li>
                  <li>Billing and shipping addresses</li>
                  <li>Payment information</li>
                  <li>Order history and preferences</li>
                  <li>Communication preferences</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">How We Use Your Information</h2>
                <p className="text-gray-600 mb-6">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-8 space-y-2">
                  <li>Process and fulfill your orders</li>
                  <li>Communicate with you about your orders</li>
                  <li>Provide customer support</li>
                  <li>Send you marketing communications (with your consent)</li>
                  <li>Improve our products and services</li>
                  <li>Comply with legal obligations</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Information Sharing</h2>
                <p className="text-gray-600 mb-6">
                  We do not sell, trade, or otherwise transfer your personal information to third parties 
                  without your consent, except as described in this policy:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-8 space-y-2">
                  <li>Service providers who assist us in operating our business</li>
                  <li>Payment processors for transaction processing</li>
                  <li>Shipping companies for order delivery</li>
                  <li>Legal authorities when required by law</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Data Security</h2>
                <p className="text-gray-600 mb-8">
                  We implement appropriate technical and organizational security measures to protect your 
                  personal information against unauthorized access, alteration, disclosure, or destruction. 
                  However, no method of transmission over the internet is 100% secure.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Rights</h2>
                <p className="text-gray-600 mb-6">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-8 space-y-2">
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Request a copy of your personal information</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Cookies and Tracking</h2>
                <p className="text-gray-600 mb-8">
                  We use cookies and similar tracking technologies to enhance your experience on our website. 
                  You can control cookie settings through your browser preferences.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Updates to This Policy</h2>
                <p className="text-gray-600 mb-8">
                  We may update this privacy policy from time to time. We will notify you of any changes 
                  by posting the new policy on this page and updating the "last updated" date.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Us</h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about this privacy policy, please contact us:
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

export default PrivacyPolicyPage
