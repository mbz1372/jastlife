# JASTLIFE Store

Next.js storefront with a complete demo purchase flow and optional Supabase persistence.

## Store flow

Home → Product page → Cart → Checkout → Order creation → Success.

Cart data persists in the browser. Product prices and stock are revalidated on the server before an order is created.

## Supabase

1. Create or connect a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Run `supabase/seed.sql` if you want the demo catalog in the database.
4. Add the variables from `.env.example` to Vercel.

Required variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` (server only)
- `ADMIN_SECRET` (protects product writes/uploads)
- `PAYMENT_MODE=mock` until a real payment adapter is configured

## Product upload

Open `/admin`, enter the configured `ADMIN_SECRET`, add product details and optionally upload an image. Images are stored in the public Supabase Storage bucket `products`; product records are stored in `public.products`.

## Payment

The current adapter is intentionally `mock` so the whole UX can be tested without payment credentials. Replace the branch in `app/api/orders/route.js` with the selected provider redirect/webhook flow and change `PAYMENT_MODE` when credentials are available.
