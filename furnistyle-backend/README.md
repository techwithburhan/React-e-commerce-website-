# 🚀 COMPLETE BACKEND SETUP GUIDE

## 📁 FOLDER STRUCTURE

Create this exact structure inside `furnistyle-backend`:

```
furnistyle-backend/
├── config/
│   └── db.js
├── models/
│   ├── Product.js
│   └── Contact.js
├── controllers/
│   ├── productController.js
│   └── contactController.js
├── routes/
│   ├── productRoutes.js
│   └── contactRoutes.js
├── .env
├── .gitignore
├── package.json
└── server.js
```

---

## ⚡ QUICK SETUP COMMANDS

### Step 1: Create Project Structure

```bash
# Navigate to your project folder
cd path/to/your/project

# Create backend folder
mkdir furnistyle-backend
cd furnistyle-backend

# Create all folders
mkdir config models controllers routes

# Initialize npm
npm init -y
```

### Step 2: Install Dependencies

```bash
npm install express mongoose dotenv cors
npm install -D nodemon
```

### Step 3: Create All Files

Copy and paste each file from the artifacts:

1. ✅ `server.js` - Main entry file
2. ✅ `config/db.js` - Database connection
3. ✅ `models/Product.js` - Product schema
4. ✅ `models/Contact.js` - Contact schema
5. ✅ `controllers/productController.js` - Product logic
6. ✅ `controllers/contactController.js` - Contact logic
7. ✅ `routes/productRoutes.js` - Product routes
8. ✅ `routes/contactRoutes.js` - Contact routes
9. ✅ `.env` - Environment variables
10. ✅ `package.json` - Dependencies
11. ✅ `.gitignore` - Git ignore file

### Step 4: Update package.json Scripts

Replace the scripts section in `package.json`:

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

### Step 5: Start MongoDB

**Windows:**
```bash
# Start MongoDB service
net start MongoDB
```

**Mac/Linux:**
```bash
# Using Homebrew
brew services start mongodb-community

# Or directly
mongod
```

**Check if MongoDB is running:**
```bash
mongosh
```

### Step 6: Start Backend Server

```bash
npm run dev
```

You should see:

```
=============================================
🚀 Server running on port 5000
📍 API URL: http://localhost:5000
🌍 Environment: development
=============================================

✅ MongoDB Connected Successfully
📊 Database Host: localhost
📁 Database Name: furnistyle
⚡ Connection State: Connected
🔗 Mongoose connected to MongoDB

Available endpoints:
📦 GET    http://localhost:5000/api/products
➕ POST   http://localhost:5000/api/products
📧 POST   http://localhost:5000/api/contact
=============================================
```

---

## 🧪 TEST YOUR API

### 1. Test Root Endpoint

Open browser: `http://localhost:5000`

Should show:
```json
{
  "message": "Welcome to FurniStyle API",
  "version": "1.0.0",
  "endpoints": {
    "products": {
      "getAll": "GET /api/products",
      "create": "POST /api/products"
    },
    "contact": {
      "create": "POST /api/contact"
    }
  }
}
```

### 2. Test Get Products (Empty at first)

```bash
curl http://localhost:5000/api/products
```

Response:
```json
{
  "success": true,
  "count": 0,
  "data": []
}
```

### 3. Test Create Product

```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Modern Sofa",
    "price": 1299,
    "category": "Living Room",
    "image": "https://example.com/sofa.jpg",
    "description": "Beautiful modern sofa"
  }'
```

Response:
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "_id": "...",
    "name": "Modern Sofa",
    "price": 1299,
    "category": "Living Room",
    "image": "https://example.com/sofa.jpg",
    "description": "Beautiful modern sofa",
    "createdAt": "2024-01-27T..."
  }
}
```

### 4. Test Contact Form

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I would like to know more about your products"
  }'
```

Response:
```json
{
  "success": true,
  "message": "Thank you John Doe! We have received your message and will get back to you soon.",
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I would like to know more about your products",
    "createdAt": "2024-01-27T..."
  }
}
```

---

## 📡 ALL API ENDPOINTS

### Products API

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| GET | `/api/products` | Get all products | - |
| POST | `/api/products` | Create product | name, price, category, image, description |
| GET | `/api/products/:id` | Get single product | - |
| PUT | `/api/products/:id` | Update product | Any field to update |
| DELETE | `/api/products/:id` | Delete product | - |

### Contact API

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/api/contact` | Submit contact form | name, email, message |
| GET | `/api/contact` | Get all contacts | - |
| GET | `/api/contact/:id` | Get single contact | - |
| DELETE | `/api/contact/:id` | Delete contact | - |

---

## 🔧 ENVIRONMENT VARIABLES

Your `.env` file:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/furnistyle
```

**For MongoDB Atlas (Cloud):**
```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/furnistyle?retryWrites=true&w=majority
```

---

## ✅ FEATURES INCLUDED

### ✨ Professional Features:
- ✅ Clean folder structure (MVC pattern)
- ✅ Async/await for all database operations
- ✅ Comprehensive error handling
- ✅ Input validation with custom messages
- ✅ CORS enabled for frontend integration
- ✅ MongoDB connection with event listeners
- ✅ Graceful shutdown handling
- ✅ Environment variables with dotenv
- ✅ RESTful API architecture
- ✅ Mongoose schemas with validation
- ✅ Timestamps for all records
- ✅ Database indexes for faster queries
- ✅ Detailed console logging
- ✅ 404 and error handling middleware

### 🛡️ Security Features:
- Email validation with regex
- Field length restrictions
- Data sanitization
- Error message protection (dev vs prod)

---

## 🔍 VERIFY DATABASE

### Using MongoDB Compass:
1. Download MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. View `furnistyle` database
4. Check `products` and `contacts` collections

### Using mongosh:
```bash
mongosh

use furnistyle
db.products.find()
db.contacts.find()
```

---

## 🐛 TROUBLESHOOTING

### Issue: "MongoDB connection error"
**Fix:**
```bash
# Check if MongoDB is running
mongosh

# If not, start MongoDB
# Windows: net start MongoDB
# Mac: brew services start mongodb-community
```

### Issue: "Port 5000 already in use"
**Fix:**
Change PORT in `.env` file:
```env
PORT=5001
```

### Issue: "Cannot find module"
**Fix:**
```bash
npm install
```

### Issue: "ValidationError"
**Fix:** Check that all required fields are provided in request body

---

## 📝 NEXT STEPS

1. ✅ Backend is running
2. ✅ Test all endpoints with Postman/curl
3. ✅ Connect frontend to backend
4. ✅ Add sample products via POST request
5. ✅ Test contact form submission

---

## 🎯 PRODUCTION CHECKLIST

Before deploying:
- [ ] Add authentication/authorization
- [ ] Add rate limiting
- [ ] Add input sanitization
- [ ] Add helmet for security headers
- [ ] Add compression middleware
- [ ] Add request logging (morgan)
- [ ] Set up production database (MongoDB Atlas)
- [ ] Add environment-specific configs
- [ ] Set NODE_ENV=production
- [ ] Add proper error logging service

---

## 🚀 DEPLOYMENT

### Deploy to Heroku:
```bash
heroku create furnistyle-api
git push heroku main
heroku config:set MONGO_URI=your_mongodb_uri
```

### Deploy to Railway:
```bash
railway login
railway init
railway add
```

### Deploy to Render:
1. Connect GitHub repo
2. Set environment variables
3. Deploy

---

## ✨ YOU'RE DONE!

Your backend is now:
- ✅ Fully functional
- ✅ Production-ready structure
- ✅ Well-documented
- ✅ Easy to maintain
- ✅ Ready to connect with frontend

**Test it:** `http://localhost:5000`