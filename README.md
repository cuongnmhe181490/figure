# Figure Atelier

Next.js app cho nền tảng quà tặng 3D cá nhân hoá, gồm:

- Landing page premium
- Collection gallery
- Builder 3D
- Order flow với review token
- Customer review page
- Admin dashboard

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- React Three Fiber / Drei
- Framer Motion
- Supabase-ready backend

## Chạy local

```bash
npm install
npm run dev
```

## Biến môi trường

Copy `.env.example` thành `.env.local` và điền:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_STORAGE_BUCKET=gift-assets
ADMIN_EMAIL=
ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=
```

## Database và storage

App ưu tiên dùng:

- `Supabase Postgres` cho bảng orders
- `Supabase Storage` cho `.glb`, preview image
- session admin riêng bằng cookie `HttpOnly`

Schema mẫu nằm ở:

- [supabase/schema.sql](/D:/figure/supabase/schema.sql)

## Luồng chính

### Public

- `/`
- `/collections`
- `/design`
- `/review/[token]`

### Admin

- `/admin/login`
- `/admin`

## Ghi chú triển khai

- `Collections` truyền preset thật sang builder bằng query param
- Builder lưu config trong `localStorage`
- Khi tạo order, hệ thống sinh `review_token` ngẫu nhiên bằng `crypto`
- Admin có thể đổi trạng thái, upload model `.glb`, upload preview image

## Fallback dev

Nếu chưa có Supabase env, app vẫn có fallback để dev local. Tuy nhiên production nên dùng Supabase đầy đủ để dữ liệu bền vững.
