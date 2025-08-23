// context/CartContext.tsx
'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { CartUtils } from '../lib/cartUtils';
import type { CartItem } from '../types/CartItem';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: any, quantity?: number) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  updateQuantity: (id: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  subtotal: number;
  shippingCost: number;
  total: number;
  itemCount: number;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Load cart when user changes
  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        try {
          const items = await CartUtils.loadCartFromFirebase(user.uid);
          setCartItems(items);
        } catch (error) {
          console.error("Error loading cart:", error);
          setCartItems([]);
        }
      } else {
        setCartItems([]);
      }
      setLoading(false);
    };

    loadCart();
  }, [user]);

  const addToCart = async (product: any, quantity: number = 1) => {
    if (!user) {
      throw new Error('User must be authenticated to add items to cart');
    }

    try {
      const updatedCart = await CartUtils.addToCart(user.uid, cartItems, product, quantity);
      setCartItems(updatedCart);
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  };

  const removeFromCart = async (id: number) => {
    if (!user) return;

    try {
      const updatedCart = await CartUtils.removeFromCart(user.uid, cartItems, id);
      setCartItems(updatedCart);
    } catch (error) {
      console.error("Error removing from cart:", error);
      throw error;
    }
  };

  const updateQuantity = async (id: number, quantity: number) => {
    if (!user) return;

    try {
      const updatedCart = await CartUtils.updateQuantity(user.uid, cartItems, id, quantity);
      setCartItems(updatedCart);
    } catch (error) {
      console.error("Error updating quantity:", error);
      throw error;
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      await CartUtils.clearCart(user.uid);
      setCartItems([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
      throw error;
    }
  };

  const { subtotal, shippingCost, total, itemCount } = CartUtils.calculateTotals(cartItems);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      subtotal,
      shippingCost,
      total,
      itemCount,
      loading
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};