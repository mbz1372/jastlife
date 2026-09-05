"use client";

import { useState } from "react";
import { useCart } from "../../cart-provider";

export default function ProductClient({ product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const stock = Number(product.stock || 0);

  const add = () => {
    addItem(product, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return <div className="buyBox">
    <div className="qtyControl" aria-label="تعداد">
      <button type="button" onClick={() => setQty((value) => Math.max(1, value - 1))}>−</button>
      <span>{new Intl.NumberFormat("fa-IR").format(qty)}</span>
      <button type="button" onClick={() => setQty((value) => Math.min(stock || 1, value + 1))}>+</button>
    </div>
    <button className="addToCart" type="button" disabled={stock < 1} onClick={add}>{stock < 1 ? "ناموجود" : added ? "به سبد اضافه شد ✓" : "افزودن به سبد"}</button>
    <a className="goCart" href="/cart">مشاهده سبد</a>
  </div>;
}
