# SwiftBook - Book Management & E-commerce Platform

SwiftBook is a modern, feature-rich web application designed for browsing, managing, and purchasing books. It offers a seamless experience for users to discover books, manage their wishlists, place orders, and leave reviews, while providing powerful tools for librarians and administrators to manage the inventory and users.

## 🔗 Live URL
**[Live Link Here](https://swiftbook.web.app/)**

## 🔗 Server URL
**[Server URL Here](https://swiftbook-server.vercel.app/)**

## ✨ Key Features

-   **User Authentication**: Secure login and registration using Firebase (Email/Password, Social Login).
-   **Role-Based Access Control (RBAC)**: Distinct dashboards and permissions for **Users**, **Librarians**, and **Admins**.
-   **Book Management**:
    -   **Search & Sort**: Real-time filtering by title and sorting by price (Low-High, High-Low).
    -   **Reviews & Ratings**: verified purchasers can leave star ratings and comments.
    -   **Wishlist**: Save favorite books to a personal wishlist.
-   **Order System**:
    -   Streamlined checkout process with modal forms.
    -   Order tracking and history for users.
    -   Payment integration handling (Stripe/Cards).
    -   Invoice generation.
-   **Responsive Design**: Fully responsive UI with a dedicated **Dark Mode**.
-   **Interactive UI**: Smooth animations using Framer Motion and Lottie.

## 🚀 Tech Stack

-   **Frontend**: React.js, Vite
-   **Styling**: Tailwind CSS
-   **State Management & Data Fetching**: React Query (@tanstack/react-query), Axios
-   **Routing**: React Router DOM
-   **Authentication**: Firebase Auth
-   **Forms**: React Hook Form
-   **Maps**: Leaflet, React Leaflet
-   **Notifications**: SweetAlert2, React Toastify

## 📂 Project Structure

```bash
src/
├── assets/          # Static assets (images, icons)
├── components/      # Reusable UI components (Navbar, Footer, etc.)
├── firebase/        # Firebase configuration
├── hooks/           # Custom hooks (useAuth, useAxiosSecure, useRole, etc.)
├── layouts/         # Layout components (MainLayout, DashboardLayout)
├── pages/           # Application views/pages
├── providers/       # Context providers (AuthProvider)
└── routes/          # Routing configuration (router.jsx, PrivateRoute, etc.)
```

## 📄 Pages Overview

### Public Pages
-   **Home**: Landing page with featured books and hero section.
-   **Books**: Complete catalog with **Search** and **Sort** functionality.
-   **Book Details**: In-depth view of a book, including description, "Order Now" modal, "Add to Wishlist", and **Reviews**.
-   **Login / Register**: User authentication pages.

### Dashboard (Protected)
The dashboard adapts based on the logged-in user's role:

#### 👤 User
-   **My Orders**: View purchase history, pay for pending orders, or cancel unpaid ones.
-   **My Wishlist**: Manage saved books.
-   **Profile**: Update personal information.
-   **Invoices**: View billing history.

#### 📚 Librarian
-   **My Books**: Manage books uploaded by the librarian.
-   **Add Book**: Upload new books to the system.
-   **Update Book**: Edit existing book details.

#### 🛡️ Admin
-   **Manage Books**: Full control over the entire book inventory.
-   **Users Management**: Manage user roles and permissions.
-   **All Users**: View all registered users.

## 📦 NPM Packages Used

| Package | Purpose |
| :--- | :--- |
| `react` / `react-dom` | Core UI library |
| `react-router-dom` | Navigation and routing |
| `@tanstack/react-query` | server state management |
| `axios` | HTTP client for API requests |
| `firebase` | Authentication and backend services |
| `tailwindcss` | Utility-first CSS framework |
| `react-hook-form` | Form handling and validation |
| `sweetalert2` | Beautiful popup alerts |
| `react-toastify` | Toast notifications |
| `framer-motion` | Animation library |
| `swiper` | Carousel/Slider component |
| `react-icons` | Icon library |
| `leaflet` / `react-leaflet`| Interactive maps |
| `lottie-react` | Lottie animations |

## 🛠️ Setup & Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/swiftbook-client.git
    cd swiftbook-client
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and add your Firebase credentials:
    ```env
    VITE_apiKey=your_api_key
    VITE_authDomain=your_auth_domain
    VITE_projectId=your_project_id
    VITE_storageBucket=your_storage_bucket
    VITE_messagingSenderId=your_messaging_sender_id
    VITE_appId=your_app_id
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
