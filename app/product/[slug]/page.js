import { notFound } from "next/navigation";
import StoreHeader from "../../components/StoreHeader";
import ProductVisual from "../../components/ProductVisual";
import ProductClient from "./product-client";
import { formatPrice } from "../../../lib/catalog";
import { getProductBySlug } from "../../../lib/supabase-rest";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "محصول پیدا نشد | JASTLIFE" };
  return {
    title: `${product.name} | JASTLIFE`,
    description: product.description || product.subtitle,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return <main className="site innerSite">
    <StoreHeader/>
    <div className="shell breadcrumbs"><a href="/">خانه</a><span>/</span><a href={`/?q=${encodeURIComponent(product.category)}`}>{product.category}</a><span>/</span><b>{product.name}</b></div>
    <section className="productPage shell">
      <div className="productGallery"><div className="productHeroVisual"><ProductVisual product={product} priority/></div><div className="galleryHints"><span>تصویر اصلی</span><span>تصاویر بیشتر از پنل محصول قابل افزودن است</span></div></div>
      <div className="productDetails">
        <span className="productCategory">{product.category}</span>
        <h1>{product.name}</h1>
        <p className="productSubtitle">{product.subtitle}</p>
        <div className="pdpPrice"><strong>{formatPrice(product.price)}</strong>{product.compare_at_price ? <del>{formatPrice(product.compare_at_price)}</del> : null}</div>
        <div className={`availability ${Number(product.stock) > 0 ? "ok" : "no"}`}><i></i>{Number(product.stock) > 0 ? `${new Intl.NumberFormat("fa-IR").format(product.stock)} عدد موجود` : "فعلاً ناموجود"}</div>
        <p className="productDescription">{product.description}</p>
        <ProductClient product={product}/>
        <div className="pdpBenefits"><div><span>✓</span><b>پرداخت امن</b><small>اتصال درگاه در مرحله نهایی</small></div><div><span>↺</span><b>ارسال قابل پیگیری</b><small>کد سفارش بعد از خرید</small></div><div><span>◎</span><b>پشتیبانی JAST</b><small>راهنمای انتخاب و سفارش</small></div></div>
      </div>
    </section>
    <section className="productInfoBand"><div className="shell productInfoGrid"><div><h2>برای چه استفاده‌ای؟</h2><p>{product.description}</p></div><div><h3>مشخصات پایه</h3><dl><div><dt>دسته‌بندی</dt><dd>{product.category}</dd></div><div><dt>موجودی</dt><dd>{product.stock}</dd></div><div><dt>کد محصول</dt><dd>{product.slug}</dd></div></dl></div></div></section>
  </main>;
}
