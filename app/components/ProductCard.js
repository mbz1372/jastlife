import Link from "next/link";
import ProductVisual from "./ProductVisual";
import { formatPrice } from "../../lib/catalog";

export default function ProductCard({ product }) {
  return <article className="productCard">
    <Link href={`/product/${product.slug}`} className="productCardLink" aria-label={product.name}>
      <div className="productImage">
        {product.badge ? <span className="badge">{product.badge}</span> : null}
        <ProductVisual product={product}/>
      </div>
      <div className="productBody">
        <small>{product.category}</small>
        <h3>{product.name}</h3>
        <p>{product.subtitle}</p>
        <div className="priceRow">
          <strong>{formatPrice(product.price)}</strong>
          {product.compare_at_price ? <del>{formatPrice(product.compare_at_price)}</del> : null}
        </div>
        <div className="productBottom">
          <span className={Number(product.stock) > 0 ? "stock in" : "stock out"}>{Number(product.stock) > 0 ? "موجود" : "ناموجود"}</span>
          <span>مشاهده محصول ←</span>
        </div>
      </div>
    </Link>
  </article>;
}
