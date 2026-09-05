import { NextResponse } from "next/server";
import { isSupabaseConfigured, uploadProductImage } from "../../../lib/supabase-rest";

function authorized(request) {
  const expected = process.env.ADMIN_SECRET;
  return Boolean(expected && request.headers.get("x-admin-key") === expected);
}

export async function POST(request) {
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase env vars تنظیم نشده‌اند." }, { status: 503 });
  if (!authorized(request)) return NextResponse.json({ error: "دسترسی مدیریت معتبر نیست." }, { status: 401 });
  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) throw new Error("فایل تصویر الزامی است");
    if (!file.type.startsWith("image/")) throw new Error("فقط فایل تصویری مجاز است");
    if (file.size > 8 * 1024 * 1024) throw new Error("حجم تصویر باید کمتر از ۸ مگابایت باشد");
    const url = await uploadProductImage(file);
    return NextResponse.json({ url }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || "آپلود ناموفق بود" }, { status: 400 });
  }
}
