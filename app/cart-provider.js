"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "jastlife-cart-v1";

function normalizeItem(product, qty = 1) {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    price: Number(product.price || 0),
    image_url: product.image_url || null,
    type: product.type || "case",
    stock: Number(product.stock || 0),
    qty: Math.max(1, Math.min(Number(qty || 1), Number(product.stock || 99) || 99)),
  };
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) setItems(parsed);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = (product, qty = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (!existing) return [...current, normalizeItem(product, qty)];
      return current.map((item) => item.id === product.id
        ? normalizeItem(product, Math.min(item.qty + qty, product.stock || 99))
        : item);
    });
  };

  const updateQty = (id, qty) => {
    setItems((current) => current
      .map((item) => item.id === id ? { ...item, qty: Math.max(1, Math.min(Number(qty || 1), item.stock || 99)) } : item));
  };

  const removeItem = (id) => setItems((current) => current.filter((item) => item.id !== id));
  const clearCart = () => setItems([]);

  const value = useMemo(() => ({
    items,
    hydrated,
    addItem,
    updateQty,
    removeItem,
    clearCart,
    count: items.reduce((sum, item) => sum + item.qty, 0),
    subtotal: items.reduce((sum, item) => sum + item.price * item.qty, 0),
  }), [items, hydrated]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}
