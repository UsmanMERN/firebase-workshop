# React Dashboard with Ant Design and Bootstrap

## 📌 Overview
This is a **React.js Dashboard Application** built with **React Router, Ant Design, and Bootstrap**. The project features a **sidebar navigation menu**, **dynamic user pages**, and a structured **dashboard layout** for easy expansion.

## 🚀 Features
- **React Router** for seamless navigation
- **Ant Design Layout & Components** for a professional UI
- **Bootstrap Integration** for responsive styling
- **Sidebar with Nested Routes** using `antd` Menu
- **Dashboard Layout** with Header and Content sections
- **Dynamic User Pages** using React Router Params

## 📂 Project Structure
```
/src
│── /components
│   ├── Sidebar.js       # Sidebar Navigation
│── /layouts
│   ├── DashboardLayout.js # Main Dashboard Layout
│── /pages
│   ├── Home.js         # Dashboard Home Page
│   ├── Users.js        # Dynamic User Page
│── /frontend
│   ├── Frontend.js     # Frontend Landing Page
│── /dashboard
│   ├── Dashboard.js    # Dashboard Wrapper
│── /auth
│   ├── Auth.js         # Authentication Routes
│── Index.js            # Main Routing File
│── App.js              # Dashboard Routes
```

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/UsmanMERN/firebase-workshop
cd firebase-workshop
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Run the Application
```sh
npm run dev
```
This will start the application at `http://localhost:3000/`

## 🛠 Technologies Used
- **React.js** - Frontend framework
- **React Router** - Client-side routing
- **Ant Design** - UI Components
- **Bootstrap** - CSS framework

## 🔄 Routing Structure
| Route                  | Component          | Description |
|------------------------|--------------------|-------------|
| `/`                    | `Frontend.js`      | Landing Page |
| `/dashboard`           | `DashboardLayout.js` | Main Dashboard |
| `/dashboard/user/:name` | `Users.js`         | Dynamic User Page |
| `/auth/*`              | `Auth.js`          | Authentication Routes |


## 📜 License
This project is open-source and available under the **MIT License**.

---
### 🔥 Need Help?
If you have any issues, feel free to create an issue or reach out!
