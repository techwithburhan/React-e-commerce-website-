const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Product data (matching your frontend)
const products = [
  {
    id: 1,
    name: 'Modern Sofa Set',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
    category: 'Living Room',
    colors: ['Gray', 'Blue', 'Beige'],
    sizes: ['2-Seater', '3-Seater', 'L-Shape'],
    material: 'Fabric',
    inStock: true,
    description: 'Modern and comfortable sofa set perfect for your living room. Features premium fabric upholstery and sturdy construction.'
  },
  {
    id: 2,
    name: 'Dining Table Set',
    price: 899,
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&h=300&fit=crop',
    category: 'Dining Room',
    colors: ['Walnut', 'Oak', 'White'],
    sizes: ['4-Seater', '6-Seater', '8-Seater'],
    material: 'Solid Wood',
    inStock: true,
    description: 'Elegant dining table set made from solid wood. Perfect for family gatherings and dinner parties.'
  },
  {
    id: 3,
    name: 'King Size Bed',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop',
    category: 'Bedroom',
    colors: ['Black', 'White', 'Brown'],
    sizes: ['King', 'Queen'],
    material: 'Leather & Wood',
    inStock: true,
    description: 'Luxurious king size bed with premium leather headboard and solid wood frame for ultimate comfort.'
  },
  {
    id: 4,
    name: 'Office Chair',
    price: 299,
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=300&fit=crop',
    category: 'Office',
    colors: ['Black', 'Gray', 'Red'],
    sizes: ['Standard'],
    material: 'Mesh & Steel',
    inStock: true,
    description: 'Ergonomic office chair with breathable mesh back and adjustable features for all-day comfort.'
  },
  {
    id: 5,
    name: 'Coffee Table',
    price: 399,
    image: 'https://images.unsplash.com/photo-1532372576444-dda954194ad0?w=400&h=300&fit=crop',
    category: 'Living Room',
    colors: ['Oak', 'Walnut', 'Black'],
    sizes: ['Small', 'Medium', 'Large'],
    material: 'Wood & Glass',
    inStock: true,
    description: 'Stylish coffee table with tempered glass top and wooden base. Perfect centerpiece for your living room.'
  },
  {
    id: 6,
    name: 'Wardrobe',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&h=300&fit=crop',
    category: 'Bedroom',
    colors: ['White', 'Walnut', 'Gray'],
    sizes: ['2-Door', '3-Door', '4-Door'],
    material: 'Engineered Wood',
    inStock: true,
    description: 'Spacious wardrobe with multiple compartments and hanging space. Perfect for organizing your clothes.'
  },
  {
    id: 7,
    name: 'Bookshelf',
    price: 349,
    image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=400&h=300&fit=crop',
    category: 'Office',
    colors: ['Oak', 'White', 'Black'],
    sizes: ['3-Tier', '4-Tier', '5-Tier'],
    material: 'Wood',
    inStock: true,
    description: 'Modern bookshelf with multiple tiers for books, decorations, and storage. Sturdy wooden construction.'
  },
  {
    id: 8,
    name: 'Recliner Sofa',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=400&h=300&fit=crop',
    category: 'Living Room',
    colors: ['Brown', 'Black', 'Gray'],
    sizes: ['Single', 'Double'],
    material: 'Leather',
    inStock: true,
    description: 'Premium leather recliner sofa with adjustable positions. Perfect for relaxation and movie nights.'
  },
  {
    id: 9,
    name: 'Study Desk',
    price: 449,
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=300&fit=crop',
    category: 'Office',
    colors: ['White', 'Oak', 'Black'],
    sizes: ['Small', 'Medium', 'Large'],
    material: 'Wood & Metal',
    inStock: true,
    description: 'Functional study desk with ample workspace and storage drawers. Ideal for home office or study room.'
  },
  {
    id: 10,
    name: 'Nightstand',
    price: 199,
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&h=300&fit=crop',
    category: 'Bedroom',
    colors: ['White', 'Gray', 'Walnut'],
    sizes: ['Single Drawer', 'Double Drawer'],
    material: 'Wood',
    inStock: true,
    description: 'Compact nightstand with drawers for bedside storage. Perfect companion for your bed.'
  },
  {
    id: 11,
    name: 'Bar Stool Set',
    price: 279,
    image: 'https://images.unsplash.com/photo-1551298370-9d3d53740c72?w=400&h=300&fit=crop',
    category: 'Dining Room',
    colors: ['Black', 'White', 'Chrome'],
    sizes: ['Set of 2', 'Set of 4'],
    material: 'Metal & Leather',
    inStock: true,
    description: 'Modern bar stools with adjustable height and comfortable padded seats. Perfect for kitchen islands.'
  },
  {
    id: 12,
    name: 'TV Unit',
    price: 599,
    image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=400&h=300&fit=crop',
    category: 'Living Room',
    colors: ['Walnut', 'White', 'Black'],
    sizes: ['4ft', '5ft', '6ft'],
    material: 'Engineered Wood',
    inStock: true,
    description: 'Stylish TV unit with cable management and storage compartments. Holds TVs up to 65 inches.'
  }
];

// Seed function
const seedProducts = async () => {
  try {
    // Delete all existing products
    await Product.deleteMany();
    console.log('🗑️  Existing products deleted');

    // Insert new products
    await Product.insertMany(products);
    console.log('✅ Products seeded successfully!');
    console.log(`📦 ${products.length} products added to database`);

    process.exit();
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  }
};

// Run seed function
seedProducts();