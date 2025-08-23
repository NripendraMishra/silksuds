'use client'

import { useState, useEffect } from 'react'

// Mobile menu toggle hook
export const useMobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)
  const close = () => setIsOpen(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return { isOpen, toggle, close }
}

// Smooth scroll to section
export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// Add to cart functionality
export const addToCart = (productId: string, quantity: number = 1) => {
  // This would integrate with your cart state management
  console.log(`Added product ${productId} to cart with quantity ${quantity}`)
  
  // You could use localStorage, Redux, Zustand, or any state management solution
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  const existingItem = cart.find((item: any) => item.id === productId)
  
  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cart.push({ id: productId, quantity })
  }
  
  localStorage.setItem('cart', JSON.stringify(cart))
  
  // Dispatch custom event for cart update
  window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart } }))
}

// Cart count hook
export const useCartCount = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const updateCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      const totalCount = cart.reduce((total: number, item: any) => total + item.quantity, 0)
      setCount(totalCount)
    }

    updateCount()
    
    window.addEventListener('cartUpdated', updateCount)
    return () => window.removeEventListener('cartUpdated', updateCount)
  }, [])

  return count
}

// Form validation
export const validateForm = (formData: Record<string, string>) => {
  const errors: Record<string, string> = {}

  if (!formData.email) {
    errors.email = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Email is invalid'
  }

  if (!formData.name) {
    errors.name = 'Name is required'
  }

  if (!formData.phone) {
    errors.phone = 'Phone number is required'
  } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
    errors.phone = 'Phone number is invalid'
  }

  return errors
}

// Format currency
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Image loading utility
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = src
  })
}
