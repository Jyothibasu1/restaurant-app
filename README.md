# 🍽️ Food Ordering System (Spring Boot + React)

A full-stack Food Ordering Web Application built using **Spring Boot (Backend)** and **React (Frontend)**.  
The system allows users to browse restaurants, view food items, add to cart, place orders, and manage profiles with secure authentication using JWT.

---

## 🚀 Features

### 👤 User Features
- User Registration & Login (JWT Authentication)
- Browse Restaurants & Food Items
- Add to Cart / Remove from Cart
- Place Orders
- View Order History
- Manage Address

### 🍴 Restaurant Features
- Add / Update Food Items
- Manage Menu Categories
- View Orders
- Create Events & Offers

### 🔐 Security
- JWT Token Authentication
- Role-based Access (USER / RESTAURANT_OWNER / ADMIN)
- Password Encryption using BCrypt

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Redux Toolkit
- Axios
- Material UI

### Backend
- Spring Boot
- Spring Security
- JWT
- Hibernate / JPA

### Database
- MySQL

---

## 🗂️ Project Structure
backend/
├── controller/
├── service/
├── model/
├── repository/
├── security/
└── config/

frontend/
├── src/
│ ├── components/
│ ├── pages/
│ ├── redux/
│ └── services/



---

## ⚙️ Setup Instructions

### Backend Setup
```bash
# Clone repo
git clone https://github.com/your-username/food-ordering-system

# Open backend folder
cd backend

# Run Spring Boot
mvn spring-boot:run

cd frontend
npm install
npm start
