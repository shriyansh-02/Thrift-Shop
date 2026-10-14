🛍️ Thrift Shop (Full-Stack MERN Web Application)

Welcome to the Thrift Shop Web Application! A modern, full-stack online fashion resale and thrift platform designed for users to buy and sell pre-loved luxury and everyday items easily.

## 🚀 Live Demo & Deployment
- **Frontend (Vercel)**: [View Live App](https://thrift-shop-gray.vercel.app)
- **Backend (Render API)**: Hosted on Render Node.js environment
- **Database (MongoDB Atlas)**: Cloud-hosted NoSQL database

---

## ✨ Features

- **Secure User Authentication**: Complete user registration and login system powered by JSON Web Tokens (JWT) and bcrypt password hashing.
- **Dynamic Product Listings (+ SELL)**: Users can upload items with custom categories, sub-categories, pricing, condition ratings, and image previews.
- **Advanced Search & Filtering**: Real-time filtering by category, sub-category, location, and keyword search.
- **My Listings Management**: Authenticated users can view their own uploaded items and manage or delete their listings.
- **Detailed Product View**: Inspect individual item details, pricing, condition, description, and direct seller contact info.
- **Responsive UI**: Built with a clean custom CSS and React component structure for smooth desktop and mobile viewing.

---

## 🛠️ Technologies Used

### Frontend
- **React.js** (Component-based UI architecture)
- **React Router** (Client-side routing)
- **Axios** (HTTP client for API communication)
- **CSS3** (Custom responsive styling & layouts)

### Backend
- **Node.js** (JavaScript runtime environment)
- **Express.js** (Web application framework for REST APIs)
- **Mongoose** (ODM library for MongoDB)
- **JWT (JSON Web Tokens) & Bcryptjs** (Authentication & password security)

### Database & Cloud Hosting
- **MongoDB Atlas** (Cloud NoSQL Database)
- **Render** (Cloud backend web service hosting)
- **Vercel** (Lightning-fast frontend static site hosting & continuous deployment)
- **Git & GitHub** (Version control and automated CI/CD pipelines)

---

## 💻 Local Installation & Setup

If you want to run this project locally on your machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/shriyansh-02/Thrift-Shop.git](https://github.com/shriyansh-02/Thrift-Shop.git)
   cd Thrift-Shop
   ```

2. **Install Frontend Dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Install Backend Dependencies:**
   ```bash
   cd backend
   npm install
   ```

4. **Configure Environment Variables:**
   Create a `.env` file inside the `backend/` folder and add your credentials:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

5. **Run the Application Locally:**
   - Start the backend server (from the `backend` folder):
     ```bash
     node server.js
     ```
   - Start the React frontend (from the root folder):
     ```bash
     npm start
     ```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check issues page or create a pull request.
```

3. Save the file (`Ctrl + S`), and push the update to GitHub:
   ```bash
   git add .
   git commit -m "Update README.md with accurate MERN stack tech stack and features"
   git push origin master