"use client";

import Link from "next/link";
import StoreHeader from "../components/StoreHeader";
import ProductVisual from "../components/ProductVisual";
import { formatPrice } from "../../lib/catalog";
import { useCart } from "../cart-provider";

export default function CartPage() {
  const { items, hydrated, updateQty, removeItem, subtotal } = useCart();
  const shipping = subtotal >= 3000000 || subtotal === 0 ? 0 : 120000;
  const total = subtotal + shipping;

  return <main className="site innerSite">
    <StoreHeader/>
    <section className="shell cartPage">
      <div className="pageHeading"><span>سبد خرید</span><h1>سفارش شما</h1><p>تعداد محصولات و اطلاعات سفارش را قبل از پرداخت بررسی کن.</p></div>
      {!hydrated ? <div className="emptyState"><p>در حال بارگذاری سبد...</p></div> : items.length === 0 ? <div className="emptyCart"><h2>سبد خرید خالی است.</h2><p>از فروشگاه چند محصول انتخاب کن و دوباره برگرد.</p><Link className="primaryButton" href="/">رفتن به فروشگاه</Link></div> : <div className="cartGrid">
        <div className="cartItems">
          {items.map((item) => <article className="cartItem" key={item.id}>
            <Link className="cartThumb" href={`/product/${item.slug}`}><ProductVisual product={item}/></Link>
            <div className="cartItemMain"><div><Link href={`/product/${item.slug}`}><h2>{item.name}</h2></Link><p>{formatPrice(item.price)}</p></div><button className="removeLink" onClick={() => removeItem(item.id)}>حذف</button></div>
            <div className="cartQty"><button onClick={() => updateQty(item.id, item.qty - 1)}>−</button><span>{new Intl.NumberFormat("fa-IR").format(item.qty)}</span><button onClick={() => updateQty(item.id, item.qty + 1)}>+</button></div>
            <strong className="cartLineTotal">{formatPrice(item.price * item.qty)}</strong>
          </article>)}
        </div>
        <aside className="orderSummary">
          <h2>خلاصه سفارش</h2>
          <div><span>جمع محصولات</span><strong>{formatPrice(subtotal)}</strong></div>
          <div><span>هزینه ارسال</span><strong>{shipping ? formatPrice(shipping) : "رایگان"}</strong></div>
          <div className="summaryTotal"><span>مبلغ نهایی</span><strong>{formatPrice(total)}</strong></div>
          <Link className="checkoutButton" href="/checkout">ادامه و تسویه حساب</Link>
          <small>ارسال سفارش‌های بالای ۳ میلیون تومان رایگان است.</small>
        </aside>
      </div>}
    </section>
  </main>;
}
