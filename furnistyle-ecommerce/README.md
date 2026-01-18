# E-Commerce Website - Complete Setup Guide

## Project Structure

```
furnistyle-ecommerce/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navigation.js
│   │   └── Footer.js
│   ├── pages/
│   │   ├── HomePage.js
│   │   ├── ProductsPage.js
│   │   ├── ProductDetailPage.js
│   │   ├── CartPage.js
│   │   ├── CheckoutPage.js
│   │   └── ContactPage.js
│   ├── data/
│   │   └── products.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── README.md
```

## Prerequisites

Before starting, make sure you have:
- **Node.js** (version 14 or higher) - Download from https://nodejs.org
- **npm** (comes with Node.js)
- A code editor like **VS Code**

Check your installation:
```bash
node --version
npm --version
```

## Complete Installation Steps

### Step 1: Create React App

Open your terminal/command prompt and run:

```bash
npx create-react-app furnistyle-ecommerce
cd furnistyle-ecommerce
```

### Step 2: Install Required Packages

```bash
npm install react-router-dom lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Packages Installed:**
- `react-router-dom` - For routing/navigation between pages
- `lucide-react` - For beautiful icons
- `tailwindcss` - For styling
- `postcss` & `autoprefixer` - Tailwind CSS dependencies

### Step 3: Configure Tailwind CSS

Replace the content of `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Step 4: Update CSS File

Replace all content in `src/index.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Step 5: Create Project Folders

Create the following folder structure inside `src/`:

```bash
# In the src folder, create:
mkdir components pages data
```

### Step 6: Create All Files

Now create each file with the content provided in the separate artifacts:

**Components:**
1. `src/components/Navigation.js`
2. `src/components/Footer.js`

**Pages:**
3. `src/pages/HomePage.js`
4. `src/pages/ProductsPage.js`
5. `src/pages/ProductDetailPage.js`
6. `src/pages/CartPage.js`
7. `src/pages/CheckoutPage.js`
8. `src/pages/ContactPage.js`

**Data:**
9. `src/data/products.js`

**Main Files:**
10. `src/App.js`
11. `src/index.js`

### Step 7: Run the Project

After creating all files, start the development server:

```bash
npm start
```

The application will automatically open at `http://localhost:3000`

### Step 8: Build for Production

When ready to deploy:

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## File Structure Explanation

- **components/** - Reusable UI components (Navigation, Footer)
- **pages/** - Different pages of the website
- **data/** - Product data and static content
- **App.js** - Main app with routing configuration
- **index.js** - Entry point of React app
- **index.css** - Global styles with Tailwind

## Features Included

✅ Home page with auto-sliding banner
✅ Products page with grid layout
✅ Product detail page with color/size selection
✅ Shopping cart functionality
✅ Checkout/payment page
✅ Contact us page
✅ Responsive design (mobile, tablet, desktop)
✅ Dark navigation bar (#13120A)
✅ Smooth animations and hover effects

## Common Issues & Solutions

**Issue: Module not found error**
```bash
npm install
```

**Issue: Tailwind styles not working**
- Make sure `tailwind.config.js` is configured correctly
- Restart the development server (`npm start`)

**Issue: React Router not working**
```bash
npm install react-router-dom
```

**Issue: Port 3000 already in use**
- Either close the app using port 3000
- Or run on a different port: `PORT=3001 npm start`

## Package.json Should Look Like This

```json
{
  "name": "furnistyle-ecommerce",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "react-scripts": "5.0.1",
    "lucide-react": "^0.263.1"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.1",
    "postcss": "^8.4.35",
    "autoprefixer": "^10.4.17"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

## Next Steps

1. Customize the colors and styles in `tailwind.config.js`
2. Add your own product images and data in `src/data/products.js`
3. Connect to a real backend API
4. Add user authentication
5. Integrate real payment gateway (Stripe, PayPal)
6. Deploy to Netlify, Vercel, or your hosting provider

## Deployment

**For Netlify/Vercel:**
1. Push code to GitHub
2. Connect your repository
3. Build command: `npm run build`
4. Publish directory: `build`

Enjoy building your e-commerce website! 🚀