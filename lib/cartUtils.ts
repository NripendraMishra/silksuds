// lib/cartUtils.ts
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { trackAddToCart, trackRemoveFromCart } from './analytics';
import type { CartItem } from '../types/CartItem';

export class CartUtils {
  
  // Save cart to Firebase
  static async saveCartToFirebase(userId: string, cartItems: CartItem[]): Promise<void> {
    try {
      const cartRef = doc(db, "user-carts", userId);
      await setDoc(cartRef, { items: cartItems }, { merge: true });
    } catch (error) {
      console.error("Error saving cart to Firebase:", error);
      throw error;
    }
  }

  // Load cart from Firebase
  static async loadCartFromFirebase(userId: string): Promise<CartItem[]> {
    try {
      const cartRef = doc(db, "user-carts", userId);
      const cartSnap = await getDoc(cartRef);
      if (cartSnap.exists()) {
        return cartSnap.data().items || [];
      }
      return [];
    } catch (error) {
      console.error("Error loading cart from Firebase:", error);
      return [];
    }
  }

  // Add item to cart
  static async addToCart(
    userId: string, 
    currentCart: CartItem[], 
    product: any, 
    quantity: number = 1
  ): Promise<CartItem[]> {
    const existingItem = currentCart.find(item => item.id === product.id);
    let updatedCart: CartItem[];

    if (existingItem) {
      // Update quantity if item already exists
      updatedCart = currentCart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      // Add new item to cart
      const cartItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image,
        category: product.category,
        originalPrice: product.originalPrice,
        description: product.description,
        rating: product.rating,
        reviews: product.reviews,
        details: product.details
      };
      updatedCart = [...currentCart, cartItem];
    }

    // Save to Firebase
    await this.saveCartToFirebase(userId, updatedCart);

    // Track analytics
    trackAddToCart(
      product.id.toString(),
      product.name,
      product.price,
      quantity
    );

    return updatedCart;
  }

  // Remove item from cart
  static async removeFromCart(
    userId: string,
    currentCart: CartItem[],
    itemId: number
  ): Promise<CartItem[]> {
    const itemToRemove = currentCart.find(item => item.id === itemId);
    const updatedCart = currentCart.filter(item => item.id !== itemId);

    // Save to Firebase
    await this.saveCartToFirebase(userId, updatedCart);

    // Track analytics
    if (itemToRemove) {
      trackRemoveFromCart(
        itemToRemove.id.toString(),
        itemToRemove.name,
        itemToRemove.price,
        itemToRemove.quantity
      );
    }

    return updatedCart;
  }

  // Update item quantity
  static async updateQuantity(
    userId: string,
    currentCart: CartItem[],
    itemId: number,
    newQuantity: number
  ): Promise<CartItem[]> {
    if (newQuantity < 1) {
      return this.removeFromCart(userId, currentCart, itemId);
    }

    const updatedCart = currentCart.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );

    // Save to Firebase
    await this.saveCartToFirebase(userId, updatedCart);

    return updatedCart;
  }

  // Clear cart
  static async clearCart(userId: string): Promise<void> {
    await this.saveCartToFirebase(userId, []);
  }

  // Calculate cart totals
  static calculateTotals(cartItems: CartItem[]) {
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shippingCost = subtotal > 500 ? 0 : 50;
    const total = subtotal + shippingCost;
    const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    return {
      subtotal,
      shippingCost,
      total,
      itemCount
    };
  }
}