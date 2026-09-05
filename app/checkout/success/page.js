import Link from "next/link";
import StoreHeader from "../../components/StoreHeader";

export default async function SuccessPage({ searchParams }) {
  const params = await searchParams;
  const order = params?.order || "JAST-DEMO";
  const demo = params?.demo === "1";

  return <main className="site innerSite">
    <StoreHeader/>
    <section className="successPage shell">
      <div className="successIcon">✓</div>
      <span>{demo ? "DEMO PAYMENT" : "ORDER CONFIRMED"}</span>
      <h1>سفارش ثبت شد.</h1>
      <p>شماره سفارش شما:</p>
      <strong className="orderCode">{order}</strong>
      <p className="successNote">{demo ? "این پرداخت در حالت تست انجام شده است. بعد از اتصال درگاه، همین فلو به پرداخت واقعی متصل می‌شود." : "اطلاعات سفارش با موفقیت ثبت شد."}</p>
      <div className="successActions"><Link className="primaryButton" href="/">ادامه خرید</Link><Link className="secondaryButton" href="/">صفحه اصلی</Link></div>
    </section>
  </main>;
}
