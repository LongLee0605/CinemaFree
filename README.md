# 🎬 CinemaFree - Ứng dụng xem phim miễn phí

<div align="center">

![CinemaFree Logo](public/logo192.png)

**CinemaFree** là một ứng dụng web hiện đại được xây dựng với React và Vite, cho phép người dùng xem phim miễn phí với giao diện đẹp mắt và trải nghiệm mượt mà.

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.10-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.14-38B2AC.svg)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.3.0-764ABC.svg)](https://redux-toolkit.js.org/)

[🚀 Demo](#-demo) • [📦 Cài đặt](#-cài-đặt) • [🛠️ Công nghệ](#️-công-nghệ) • [📁 Cấu trúc dự án](#-cấu-trúc-dự-án) • [🤝 Đóng góp](#-đóng-góp)

</div>

## 📋 Mục lục

- [✨ Tính năng](#-tính-năng)
- [🚀 Demo](#-demo)
- [📦 Cài đặt](#-cài-đặt)
- [🛠️ Công nghệ](#️-công-nghệ)
- [📁 Cấu trúc dự án](#-cấu-trúc-dự-án)
- [🎯 Sử dụng](#-sử-dụng)
- [🔧 Scripts](#-scripts)
- [📱 Responsive Design](#-responsive-design)
- [🚀 Deployment](#-deployment)
- [🤝 Đóng góp](#-đóng-góp)
- [📄 License](#-license)

## ✨ Tính năng

### 🎬 **Quản lý phim**
- **Phim mới cập nhật**: Danh sách phim mới nhất được cập nhật thường xuyên
- **Phim lẻ**: Bộ sưu tập phim lẻ chất lượng cao
- **Phim bộ**: Series phim dài tập với nhiều tập
- **Phim hoạt hình**: Phim hoạt hình cho mọi lứa tuổi
- **TV Shows**: Chương trình truyền hình đa dạng

### 🔍 **Tìm kiếm thông minh**
- Tìm kiếm phim theo tên, thể loại
- Kết quả tìm kiếm nhanh chóng và chính xác
- Giao diện tìm kiếm thân thiện

### 📱 **Giao diện người dùng**
- **Responsive Design**: Tối ưu cho mọi thiết bị
- **Dark Theme**: Giao diện tối hiện đại
- **Carousel**: Trình chiếu phim đẹp mắt
- **Loading States**: Trải nghiệm mượt mà

### ⚡ **Hiệu suất cao**
- **Vite Build Tool**: Tốc độ build nhanh gấp 10-100 lần
- **Hot Module Replacement**: Cập nhật code real-time
- **Code Splitting**: Tối ưu tải trang
- **Tree Shaking**: Loại bỏ code không sử dụng

## 🚀 Demo

### 🌐 **Live Demo**
Truy cập ứng dụng tại: [http://localhost:3000](http://localhost:3000)

### 📸 **Screenshots**

<details>
<summary>🖼️ Xem screenshots</summary>

#### 🏠 Trang chủ
- Carousel phim nổi bật
- Danh mục phim đa dạng
- Giao diện responsive

#### 🎬 Trang chi tiết phim
- Thông tin phim đầy đủ
- Trailer và hình ảnh
- Nút xem phim

#### 🔍 Tìm kiếm
- Giao diện tìm kiếm thân thiện
- Kết quả hiển thị nhanh chóng

</details>

## 📦 Cài đặt

### 🔧 **Yêu cầu hệ thống**
- **Node.js**: >= 20.12.2
- **npm**: >= 10.5.0 hoặc **yarn**: >= 1.22.0

### 📥 **Cài đặt dự án**

```bash
# Clone repository
git clone https://github.com/your-username/CinemaFree.git
cd CinemaFree

# Cài đặt dependencies
npm install
# hoặc
yarn install

# Chạy development server
npm run dev
# hoặc
yarn dev
```

### 🌐 **Truy cập ứng dụng**
Mở trình duyệt và truy cập: [http://localhost:3000](http://localhost:3000)

## 🛠️ Công nghệ

### 🎯 **Frontend Framework**
- **[React 18.3.1](https://reactjs.org/)** - UI Library hiện đại
- **[Vite 5.4.10](https://vitejs.dev/)** - Build tool siêu nhanh
- **[React Router DOM 6.27.0](https://reactrouter.com/)** - Client-side routing

### 🎨 **Styling & UI**
- **[Tailwind CSS 3.4.14](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React Icons 5.3.0](https://react-icons.github.io/react-icons/)** - Icon library

### 🔄 **State Management**
- **[Redux Toolkit 2.3.0](https://redux-toolkit.js.org/)** - State management
- **[React Redux 9.1.2](https://react-redux.js.org/)** - React bindings

### 🌐 **HTTP Client**
- **[Axios 1.7.7](https://axios-http.com/)** - HTTP client

### 🧪 **Testing**
- **[React Testing Library 13.4.0](https://testing-library.com/docs/react-testing-library/intro/)** - Testing utilities
- **[Jest DOM 5.17.0](https://github.com/testing-library/jest-dom)** - Custom matchers

## 📁 Cấu trúc dự án

```
CinemaFree/
├── 📁 public/                     # Static assets
│   ├── favicon.ico
│   ├── logo192.png
│   ├── logo512.png
│   └── manifest.json
├── 📁 src/                        # Source code
│   ├── 📁 components/              # React components
│   │   ├── 📁 Carousel/           # Carousel component
│   │   ├── 📁 CarouselNoHttp/     # Carousel without HTTP
│   │   ├── 📁 CartoonMovies/      # Cartoon movies page
│   │   ├── 📁 Details/            # Movie details page
│   │   ├── 📁 Home/               # Home page
│   │   ├── 📁 Loading/            # Loading component
│   │   ├── 📁 NewMovies/          # New movies page
│   │   ├── 📁 Search/             # Search functionality
│   │   │   └── 📁 components/
│   │   │       ├── SearchInput.jsx
│   │   │       └── SearchResults.jsx
│   │   ├── 📁 SeriesMovies/       # Series movies page
│   │   ├── 📁 SingleMovies/       # Single movies page
│   │   └── 📁 TVShows/           # TV shows page
│   ├── 📁 redux/                  # Redux store
│   │   ├── 📁 slices/             # Redux slices
│   │   │   ├── cartoonSlice.js
│   │   │   ├── homeSlice.js
│   │   │   ├── searchSlice.js
│   │   │   ├── seriesSlice.js
│   │   │   ├── singleSlice.js
│   │   │   └── tvShowSlice.js
│   │   └── store.js
│   ├── 📁 utils/                  # Utility functions
│   │   └── dateUtils.js
│   ├── App.jsx                    # Main App component
│   ├── index.jsx                  # Entry point
│   ├── index.css                  # Global styles
│   └── reportWebVitals.js        # Performance monitoring
├── 📄 index.html                  # HTML template
├── 📄 package.json               # Dependencies
├── 📄 vite.config.js             # Vite configuration
├── 📄 tailwind.config.js         # Tailwind configuration
├── 📄 postcss.config.js          # PostCSS configuration
└── 📄 README.md                  # Project documentation
```

## 🎯 Sử dụng

### 🏠 **Trang chủ**
- Xem carousel phim nổi bật
- Duyệt qua các danh mục phim
- Tìm kiếm phim yêu thích

### 🎬 **Xem phim**
- Click vào poster phim để xem chi tiết
- Xem thông tin phim, trailer, đánh giá
- Chọn server xem phim

### 🔍 **Tìm kiếm**
- Sử dụng thanh tìm kiếm ở header
- Nhập tên phim hoặc từ khóa
- Xem kết quả tìm kiếm

### 📱 **Responsive**
- Tối ưu cho desktop, tablet, mobile
- Giao diện thích ứng với mọi kích thước màn hình

## 🔧 Scripts

### 🚀 **Development**
```bash
# Chạy development server
npm run dev
# hoặc
yarn dev

# Chạy với port khác
npm run dev -- --port 3001
```

### 🏗️ **Production**
```bash
# Build cho production
npm run build
# hoặc
yarn build

# Preview build
npm run preview
# hoặc
yarn preview
```

### 🧪 **Testing**
```bash
# Chạy tests
npm test
# hoặc
yarn test

# Chạy tests với coverage
npm test -- --coverage
```

## 📱 Responsive Design

### 🖥️ **Desktop (>= 1024px)**
- Layout 4 cột cho carousel
- Sidebar navigation
- Full-featured search

### 📱 **Tablet (768px - 1023px)**
- Layout 3 cột cho carousel
- Collapsible navigation
- Touch-friendly interface

### 📱 **Mobile (< 768px)**
- Layout 2 cột cho carousel
- Hamburger menu
- Swipe gestures

## 🚀 Deployment

### 🌐 **Vercel (Recommended)**
```bash
# Cài đặt Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### 🌐 **Netlify**
```bash
# Build project
npm run build

# Deploy build folder to Netlify
```

### 🌐 **GitHub Pages**
```bash
# Cài đặt gh-pages
npm install --save-dev gh-pages

# Thêm script vào package.json
"deploy": "gh-pages -d build"

# Deploy
npm run deploy
```

### 🐳 **Docker**
```dockerfile
# Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🤝 Đóng góp

Chúng tôi hoan nghênh mọi đóng góp! Hãy làm theo các bước sau:

### 🔀 **Fork & Clone**
```bash
# Fork repository trên GitHub
# Clone fork của bạn
git clone https://github.com/your-username/CinemaFree.git
cd CinemaFree
```

### 🌿 **Tạo branch mới**
```bash
git checkout -b feature/amazing-feature
# hoặc
git checkout -b fix/bug-fix
```

### 💻 **Commit changes**
```bash
git add .
git commit -m "Add amazing feature"
git push origin feature/amazing-feature
```

### 🔄 **Tạo Pull Request**
- Tạo Pull Request từ branch của bạn
- Mô tả chi tiết về thay đổi
- Đính kèm screenshots nếu cần

### 📋 **Guidelines**
- Tuân thủ code style hiện tại
- Viết commit message rõ ràng
- Test kỹ trước khi submit
- Cập nhật documentation nếu cần

## 📄 License

Dự án này được phát hành dưới [MIT License](LICENSE).

---

<div align="center">

**🎬 CinemaFree** - Xem phim miễn phí, trải nghiệm tuyệt vời!

[![Made with ❤️](https://img.shields.io/badge/Made%20with-❤️-red.svg)](https://github.com/your-username/CinemaFree)
[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF.svg)](https://vitejs.dev/)
[![Powered by React](https://img.shields.io/badge/Powered%20by-React-61DAFB.svg)](https://reactjs.org/)

</div>