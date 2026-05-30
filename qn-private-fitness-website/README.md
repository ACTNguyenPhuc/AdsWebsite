# QN Private Fitness — Landing Page

Website landing page chuyên nghiệp cho dịch vụ fitness cá nhân QN Private Fitness tại Đà Nẵng.

## Cấu trúc dự án

```
project/
├── index.html              # HTML shell (chỉ chứa container)
├── assets/
│   └── images/             # Ảnh của website
├── css/
│   └── style.css           # Toàn bộ styles
├── js/
│   ├── mockData.js         # Toàn bộ nội dung & dữ liệu
│   └── app.js              # Render engine & logic
└── README.md
```

## Tính năng

- **Dark/Light Mode** với localStorage
- **Sticky Header** với scroll spy navigation
- **Parallax Hero** section
- **Counter Animation** cho statistics
- **Scroll Reveal** animations
- **Image Slider** cho transformations
- **Masonry Gallery** với Lightbox
- **Auto Carousel** cho testimonials
- **Accordion FAQ**
- **Form Validation** với JavaScript
- **Responsive** 375px → 1440px+
- **SEO** meta tags + Schema.org

## Cách sử dụng

1. **Thay ảnh**: Đặt ảnh vào `assets/images/` với tên đúng trong `mockData.js`
2. **Sửa nội dung**: Chỉnh sửa `js/mockData.js`
3. **Mở trực tiếp**: Open `index.html` trong browser hoặc dùng Live Server

## Thay thế ảnh

| File | Mô tả |
|------|-------|
| `banner-hero.jpg` | Ảnh nền hero section |
| `logo.jpg` | Logo thương hiệu |
| `trainer-main.jpg` | Ảnh HLV chính |
| `trainer-training.jpg` | Ảnh buổi tập |
| `facility-gym-1.jpg` | Ảnh cơ sở 1 |
| `facility-gym-2.jpg` | Ảnh cơ sở 2 |

## Tùy chỉnh

Thay đổi màu sắc trong `:root` của `css/style.css`:
```css
:root {
  --gold: #c9a84c;       /* Màu vàng đồng */
  --bg-primary: #0a0a0a; /* Màu nền chính (dark) */
}
```

## Công nghệ

- HTML5 Semantic
- CSS3 Variables + Grid + Flexbox
- JavaScript ES6 (Vanilla)
- Font: Oswald + Barlow (Google Fonts)
- Icons: Font Awesome 6

---

© 2024 QN Private Fitness — 154 Triệu Nữ Vương, Hải Châu, Đà Nẵng
