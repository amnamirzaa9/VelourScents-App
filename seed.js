const mongoose=require(`mongoose`);
const {connectdb}=require(`./config/db`);

const product = require("./model/product");
const products = [
  //  WOMEN
  {
    name: "Azure Grace",
    price: 2800,
    image: "images/women1.jpg",
    description: "a fusion of cassis, jasmine, and oakmoss that balances vibrant freshness with warmth.",
    category: ["women"],
    gender: ["women"],
    occasion: ["office", "university", "family"],
    weather: ["mild", "cold"],
    scentProfile: "fresh",
    projection: "moderate",
    longevity: "6-8",
    adventurousness: "safe"
  },
  {
    name: "Floral Whisper",
    price: 2400,
    image: "images/women2.jpg",
    description: "a light, airy fragrance with notes of jasmine and citrus.",
    category: ["women"],
    gender: ["women"],
    occasion: ["university", "casual", "family"],
    weather: ["hot", "mild"],
    scentProfile: "floral",
    projection: "subtle",
    longevity: "4-6",
    adventurousness: "safe"
  },
  {
    name: "Velvet Rose",
    price: 2200,
    image: "images/women3.jpg",
    description: "a rich, sensual scent with deep rose and vanilla notes.",
    category: ["women"],
    gender: ["women"],
    occasion: ["wedding", "eid", "family"],
    weather: ["mild", "cold"],
    scentProfile: "sweet",
    projection: "moderate",
    longevity: "6-8",
    adventurousness: "safe"
  },
  {
    name: "Jasmine Silk",
    price: 2400,
    image: "images/women4.jpg",
    description: "a delicate, floral fragrance with a soft, silken finish.",
    category: ["women"],
    gender: ["women"],
    occasion: ["casual", "university", "office"],
    weather: ["hot", "mild"],
    scentProfile: "floral",
    projection: "subtle",
    longevity: "4-6",
    adventurousness: "safe"
  },
  {
    name: "Opulent Bloom",
    price: 3200,
    image: "images/women5.jpg",
    description: "a luxurious, full-bodied scent with exotic floral and spicy notes.",
    category: ["women"],
    gender: ["women"],
    occasion: ["wedding", "eid", "family"],
    weather: ["mild", "cold"],
    scentProfile: "spicy",
    projection: "strong",
    longevity: "8+",
    adventurousness: "distinctive"
  },

  //MEN
  {
    name: "Night Fall",
    price: 2400,
    image: "images/men1.png",
    description: "a fresh, aquatic scent with notes of sea salt and bergamot.",
    category: ["men"],
    gender: ["men"],
    occasion: ["casual", "university", "office"],
    weather: ["hot", "mild"],
    scentProfile: "fresh",
    projection: "moderate",
    longevity: "6-8",
    adventurousness: "safe"
  },
  {
    name: "Obsidian Onyx",
    price: 2000,
    image: "images/men2.jpg",
    description: "a bold, woody fragrance with hints of sandalwood and vetiver.",
    category: ["men"],
    gender: ["men"],
    occasion: ["office", "casual", "family"],
    weather: ["mild", "cold"],
    scentProfile: "woody",
    projection: "moderate",
    longevity: "6-8",
    adventurousness: "different"
  },
  {
    name: "Cedar Ridge",
    price: 2400,
    image: "images/men3.jpg",
    description: "a warm, resinous scent with notes of cedar and patchouli.",
    category: ["men"],
    gender: ["men"],
    occasion: ["office", "family", "wedding"],
    weather: ["mild", "cold"],
    scentProfile: "woody",
    projection: "moderate",
    longevity: "8+",
    adventurousness: "different"
  },
  {
    name: "Crimson Trace",
    price: 2900,
    image: "images/men4.jpg",
    description: "a rich, spicy fragrance with hints of cinnamon and cardamom.",
    category: ["men"],
    gender: ["men"],
    occasion: ["wedding", "eid", "family"],
    weather: ["cold", "mild"],
    scentProfile: "spicy",
    projection: "strong",
    longevity: "8+",
    adventurousness: "distinctive"
  },
  {
    name: "Cobalt Shift",
    price: 2000,
    image: "images/men5.jpg",
    description: "a modern, citrus-based scent with notes of lemon and grapefruit.",
    category: ["men"],
    gender: ["men"],
    occasion: ["university", "casual", "office"],
    weather: ["hot", "mild"],
    scentProfile: "fresh",
    projection: "subtle",
    longevity: "4-6",
    adventurousness: "safe"
  },

  //NEW ARRIVALS
  {
    name: "Solar Amber",
    price: 2400,
    image: "images/newarrivals1.jpg",
    description: "a warm, sunny scent with notes of amber and citrus.",
    category: ["new-arrivals", "men"],
    gender: ["men", "unisex"],
    occasion: ["casual", "university", "eid"],
    weather: ["hot", "mild"],
    scentProfile: "sweet",
    projection: "moderate",
    longevity: "6-8",
    adventurousness: "different"
  },
  {
    name: "Serene Santal",
    price: 2900,
    image: "images/newarrivals2.jpg",
    description: "a calming, woody fragrance with hints of sandalwood.",
    category: ["new-arrivals", "men"],
    gender: ["men", "unisex"],
    occasion: ["office", "casual", "family"],
    weather: ["mild", "cold"],
    scentProfile: "woody",
    projection: "subtle",
    longevity: "8+",
    adventurousness: "safe"
  },
  {
    name: "Violet Ether",
    price: 2000,
    image: "images/newarrivals3.jpg",
    description: "a fresh, ethereal scent with notes of violet and ozone.",
    category: ["new-arrivals", "women"],
    gender: ["women", "unisex"],
    occasion: ["university", "casual", "office"],
    weather: ["hot", "mild"],
    scentProfile: "fresh",
    projection: "subtle",
    longevity: "4-6",
    adventurousness: "different"
  },
  {
    name: "Verdant Mist",
    price: 2400,
    image: "images/newarrivals4.jpg",
    description: "a fresh, green scent with notes of leaves and rain.",
    category: ["new-arrivals", "women"],
    gender: ["women", "unisex"],
    occasion: ["casual", "university", "office"],
    weather: ["hot", "mild"],
    scentProfile: "fresh",
    projection: "subtle",
    longevity: "6-8",
    adventurousness: "safe"
  },
  {
    name: "Lunar Incense",
    price: 2900,
    image: "images/newarrivals5.jpg",
    description: "a mysterious, celestial fragrance with hints of moonlight.",
    category: ["new-arrivals", "women"],
    gender: ["women", "unisex"],
    occasion: ["wedding", "eid", "family"],
    weather: ["cold", "mild"],
    scentProfile: "spicy",
    projection: "strong",
    longevity: "8+",
    adventurousness: "distinctive"
  }
];
connectdb();
const seedDb=async()=>{
try{
  await product.deleteMany({});
  console.log('old products removed');
 await product.insertMany(products); 
  console.log(' products added');
}
catch(err){
console.error(err.message);
}
finally{
  mongoose.connection.close();
  console.log(`db connection closed`);
}


}
seedDb();