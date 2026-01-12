const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from backend root
dotenv.config({ path: path.join(__dirname, '../.env') });

const Product = require('../models/productModel');

const products = [
  {
    title: "Classic White T-Shirt",
    slug: "classic-white-t-shirt",
    description: "Comfortable premium cotton t-shirt perfect for everyday wear. Made from 100% breathable cotton.",
    price: 29.99,
    category: "Men",
    quantity: 100,
    size: ["S", "M", "L", "XL", "XXL"],
    sku: "MTS-001",
    images: [{ url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab" }]
  },
  {
    title: "Blue Denim Jeans",
    slug: "blue-denim-jeans",
    description: "Classic fit denim jeans with stretch comfort. Perfect for casual and semi-formal occasions.",
    price: 79.99,
    category: "Men",
    quantity: 75,
    size: ["S", "M", "L", "XL"],
    sku: "MJN-001",
    images: [{ url: "https://images.unsplash.com/photo-1542272604-787c3835535d" }]
  },
  {
    title: "Summer Floral Dress",
    slug: "summer-floral-dress",
    description: "Light and breezy floral print dress perfect for summer. Features adjustable straps.",
    price: 59.99,
    category: "Women",
    quantity: 50,
    size: ["XS", "S", "M", "L"],
    sku: "WDR-001",
    images: [{ url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8" }]
  },
  {
    title: "Black Leather Jacket",
    slug: "black-leather-jacket",
    description: "Premium genuine leather jacket with zippered pockets. Classic biker style.",
    price: 199.99,
    category: "Men",
    quantity: 30,
    size: ["M", "L", "XL"],
    sku: "MLJ-001",
    images: [{ url: "https://images.unsplash.com/photo-1551028719-00167b16eac5" }]
  },
  {
    title: "Red Casual Hoodie",
    slug: "red-casual-hoodie",
    description: "Cozy fleece hoodie with kangaroo pocket. Perfect for cool weather.",
    price: 49.99,
    category: "Men",
    quantity: 80,
    size: ["S", "M", "L", "XL"],
    sku: "MHD-001",
    images: [{ url: "https://shop.nottinghamforest.co.uk/cdn/shop/files/NFFCRedSportsCasualHoodie_0003_NFFC-1865-CASUAL--11683--073.jpg?v=1758807676&width=800" }]
  },
  {
    title: "Women's Black Blazer",
    slug: "womens-black-blazer",
    description: "Professional tailored blazer for office wear. Made from premium fabric.",
    price: 89.99,
    category: "Women",
    quantity: 45,
    size: ["XS", "S", "M", "L", "XL"],
    sku: "WBZ-001",
    images: [{ url: "https://objectstorage.ap-mumbai-1.oraclecloud.com/n/softlogicbicloud/b/cdn/o/products/400-600/132211045--1--1600942835.jpeg" }]
  },
  {
    title: "Kids Cartoon T-Shirt",
    slug: "kids-cartoon-t-shirt",
    description: "Fun and colorful cartoon printed t-shirt for kids. Soft cotton material.",
    price: 19.99,
    category: "Kids",
    quantity: 120,
    size: ["S", "M", "L"],
    sku: "KTS-001",
    images: [{ url: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4" }]
  },
  {
    title: "Women's Skinny Jeans",
    slug: "womens-skinny-jeans",
    description: "High-waisted skinny fit jeans with excellent stretch. Flattering silhouette.",
    price: 69.99,
    category: "Women",
    quantity: 65,
    size: ["XS", "S", "M", "L"],
    sku: "WJN-001",
    images: [{ url: "https://m.media-amazon.com/images/I/71UHzx+7SKL._AC_SX679_.jpg" }]
  },
  {
    title: "Men's Polo Shirt",
    slug: "mens-polo-shirt",
    description: "Classic polo shirt with collar. Perfect for smart casual occasions.",
    price: 39.99,
    category: "Men",
    quantity: 90,
    size: ["S", "M", "L", "XL", "XXL"],
    sku: "MPS-001",
    images: [{ url: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d" }]
  },
  {
    title: "Kids Denim Jacket",
    slug: "kids-denim-jacket",
    description: "Cool denim jacket for kids. Durable and stylish.",
    price: 45.99,
    category: "Kids",
    quantity: 55,
    size: ["S", "M", "L"],
    sku: "KDJ-001",
    images: [{ url: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef" }]
  },
  {
    title: "Women's White Blouse",
    slug: "womens-white-blouse",
    description: "Elegant white blouse for formal and casual wear. Easy to style.",
    price: 44.99,
    category: "Women",
    quantity: 70,
    size: ["XS", "S", "M", "L", "XL"],
    sku: "WBL-001",
    images: [{ url: "https://lavivente.lk/wp-content/uploads/2025/08/30a-3-scaled.jpg.webp" }]
  },
  {
    title: "Men's Chino Pants",
    slug: "mens-chino-pants",
    description: "Versatile chino pants for work and casual wear. Comfortable fit.",
    price: 54.99,
    category: "Men",
    quantity: 60,
    size: ["S", "M", "L", "XL"],
    sku: "MCP-001",
    images: [{ url: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a" }]
  },
  {
    title: "Kids Sports Shorts",
    slug: "kids-sports-shorts",
    description: "Athletic shorts for active kids. Moisture-wicking fabric.",
    price: 24.99,
    category: "Kids",
    quantity: 100,
    size: ["S", "M", "L"],
    sku: "KSS-001",
    images: [{ url: "https://www.pirouette-editions.fr/details/Comfortable-Running-Play-Shorts-For-Toddlers-Boys-Girls/703383" }]
  },
  {
    title: "Women's Maxi Dress",
    slug: "womens-maxi-dress",
    description: "Elegant floor-length maxi dress. Perfect for evening events.",
    price: 79.99,
    category: "Women",
    quantity: 40,
    size: ["S", "M", "L", "XL"],
    sku: "WMD-001",
    images: [{ url: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1" }]
  },
  {
    title: "Men's Graphic Tee",
    slug: "mens-graphic-tee",
    description: "Trendy graphic print t-shirt. Bold and stylish design.",
    price: 34.99,
    category: "Men",
    quantity: 85,
    size: ["S", "M", "L", "XL"],
    sku: "MGT-001",
    images: [{ url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a" }]
  },
  {
    title: "Kids Pajama Set",
    slug: "kids-pajama-set",
    description: "Comfortable pajama set for kids. Soft and cozy material.",
    price: 29.99,
    category: "Kids",
    quantity: 95,
    size: ["S", "M", "L"],
    sku: "KPJ-001",
    images: [{ url: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea" }]
  },
  {
    title: "Women's Cardigan",
    slug: "womens-cardigan",
    description: "Soft knit cardigan perfect for layering. Button-up style.",
    price: 49.99,
    category: "Women",
    quantity: 75,
    size: ["XS", "S", "M", "L", "XL"],
    sku: "WCD-001",
    images: [{ url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea" }]
  },
  {
    title: "Men's Track Pants",
    slug: "mens-track-pants",
    description: "Comfortable athletic track pants with elastic waistband.",
    price: 39.99,
    category: "Men",
    quantity: 70,
    size: ["S", "M", "L", "XL", "XXL"],
    sku: "MTP-001",
    images: [{ url: "https://img.tatacliq.com/images/i16//437Wx649H/MP000000021567839_437Wx649H_202403152024031.jpeg" }]
  },
  {
    title: "Kids Winter Coat",
    slug: "kids-winter-coat",
    description: "Warm winter coat for kids. Water-resistant outer shell.",
    price: 69.99,
    category: "Kids",
    quantity: 50,
    size: ["S", "M", "L"],
    sku: "KWC-001",
    images: [{ url: "https://m.media-amazon.com/images/I/61w-XVqN2oL._AC_SL400_.jpg" }]
  },
  {
    title: "Women's Yoga Pants",
    slug: "womens-yoga-pants",
    description: "High-performance yoga pants with four-way stretch.",
    price: 44.99,
    category: "Women",
    quantity: 80,
    size: ["XS", "S", "M", "L", "XL"],
    sku: "WYP-001",
    images: [{ url: "https://trendy.lk/wp-content/uploads/IMG_9309-scaled.jpg" }]
  },
  {
    title: "Men's Formal Shirt",
    slug: "mens-formal-shirt",
    description: "Classic formal shirt for office and events. Wrinkle-resistant fabric.",
    price: 49.99,
    category: "Men",
    quantity: 65,
    size: ["S", "M", "L", "XL", "XXL"],
    sku: "MFS-001",
    images: [{ url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf" }]
  },
  {
    title: "Kids School Uniform",
    slug: "kids-school-uniform",
    description: "Complete school uniform set. Durable and comfortable.",
    price: 39.99,
    category: "Kids",
    quantity: 110,
    size: ["S", "M", "L"],
    sku: "KSU-001",
    images: [{ url: "https://s.alicdn.com/@sc04/kf/Hfabe53b9b3184c9d9dc1facd1f0c2d63Q/Custom-Design-Summer-Primary-School-Uniform-Shirt-Kindergarten-Student-s-Skirt-and-Pants-Kids-Uniform.jpg" }]
  },
  {
    title: "Women's Evening Gown",
    slug: "womens-evening-gown",
    description: "Stunning evening gown for special occasions. Elegant design.",
    price: 149.99,
    category: "Women",
    quantity: 25,
    size: ["XS", "S", "M", "L"],
    sku: "WEG-001",
    images: [{ url: "https://images.unsplash.com/photo-1566174053879-31528523f8ae" }]
  }
];

const seedProducts = async () => {
  try {
    // Connect to MongoDB directly
    console.log('Connecting to MongoDB...');
    console.log('MongoDB URL:', process.env.MONGODB_URL);
    
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(' Connected to database successfully!');
    
    // Delete existing products
    const deleteResult = await Product.deleteMany({});
    console.log(`  Deleted ${deleteResult.deletedCount} existing products`);
    
    // Insert new products
    const insertedProducts = await Product.insertMany(products);
    console.log(` Successfully seeded ${insertedProducts.length} products!`);
    
    // Display some product info
    console.log('\n Sample products:');
    insertedProducts.slice(0, 3).forEach(p => {
      console.log(`  - ${p.title} (${p.price}) - SKU: ${p.sku}`);
    });
    
    console.log('\n Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error(' Error seeding products:');
    console.error('Error message:', error.message);
    if (error.errors) {
      console.error('Validation errors:', error.errors);
    }
    process.exit(1);
  }
};

seedProducts();