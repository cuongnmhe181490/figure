# Figure Atelier Demo MVP

Website demo cho mô hình kinh doanh figurine 3D cá nhân hóa, xây bằng `Next.js`, `TypeScript`, `Tailwind CSS` và `React Three Fiber`.

## Tính năng hiện có

- Landing page premium để giới thiệu dịch vụ
- Trang configurator chọn body, size, outfit, màu, phụ kiện, đế
- Preview 3D mock phản hồi theo cấu hình
- UI upload ảnh cho phần head custom
- Form gửi yêu cầu đặt hàng / tư vấn
- API fallback nội bộ và hỗ trợ Supabase nếu cấu hình env
- Responsive tốt cho mobile và desktop

## Chạy local

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

## Build production

```bash
npm run build
npm run start
```

## Biến môi trường

Tạo file `.env.local` từ `.env.example` nếu muốn lưu request vào Supabase:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Nếu chưa cấu hình, API sẽ fallback sang `console.log` ở route `app/api/inquiry/route.ts`.

## Gợi ý bảng Supabase

Tạo bảng `figure_inquiries` với các cột:

- `id` bigint identity primary key
- `customer_name` text
- `contact` text
- `note` text
- `image_url` text
- `image_file_name` text
- `config` jsonb
- `source` text
- `created_at` timestamptz

## Deploy

### Vercel

1. Push code lên GitHub
2. Import project vào Vercel
3. Thêm env nếu dùng Supabase
4. Deploy

### Cloudflare Pages

1. Push code lên GitHub
2. Tạo project mới trên Cloudflare Pages
3. Build command: `npm run build`
4. Output theo hướng dẫn Next.js adapter của Cloudflare nếu bạn muốn production runtime trên Cloudflare

Với giai đoạn đầu, `Vercel` là đường deploy free nhanh nhất cho repo này.

## Khi thay model 3D thật sau này

- Dữ liệu lựa chọn nằm trong [data/figure-options.ts](/D:/figure/data/figure-options.ts)
- Logic preview nằm trong [components/configurator/figure-canvas.tsx](/D:/figure/components/configurator/figure-canvas.tsx)
- Wrapper preview nằm trong [components/configurator/figure-preview.tsx](/D:/figure/components/configurator/figure-preview.tsx)

Bạn có thể thay primitive hiện tại bằng:

- file `glb/gltf` cho từng body / outfit / accessory
- hoặc component model riêng tương ứng từng lựa chọn

Miễn là `FigureCanvas` vẫn nhận `config`, phần còn lại của configurator không cần đổi kiến trúc.
