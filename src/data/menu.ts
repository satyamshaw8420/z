/* ------------------------------------------------------------------
   ZORKO HOWRAH — single source of truth for menu, reviews & site data.
   Prices/badges recreated from the outlet's menu cards. The restaurant
   should verify everything here before launch (prices can change).
------------------------------------------------------------------- */

export type Badge = "BESTSELLER" | "MUST TRY" | "NEW" | "SPICY";

export interface MenuItem {
  id: string;
  name: string;
  category: Category;
  description: string;
  creativeLine?: string;
  price: number;
  bakedPrice?: number;
  addons?: string[];
  image?: string;
  badge?: Badge;
  vegetarian: true;
}

export type Category =
  | "KULHAD SPECIALS"
  | "PASTA"
  | "MAGGI"
  | "GARLIC BREAD"
  | "TOASTIE";

export const CATEGORIES: { id: string; label: string }[] = [
  { id: "ALL", label: "ALL" },
  { id: "KULHAD SPECIALS", label: "KULHAD SPECIALS" },
  { id: "PASTA", label: "PASTA" },
  { id: "MAGGI", label: "MAGGI" },
  { id: "GARLIC BREAD", label: "GARLIC BREAD" },
  { id: "TOASTIE", label: "TOASTIE" },
  { id: "MORE", label: "MORE AT THE OUTLET" },
];

/* Food photography (dark-studio shot to sit on the charcoal palette) */
export const IMG = {
  heroPizza:
    "https://image.qwenlm.ai/generated-images/c18b3cab-0205-41b4-9e30-d882d94e6095/_result.png",
  kulhadMomos:
    "https://image.qwenlm.ai/generated-images/4b0e2dd1-841a-45fa-be75-2bb9ff70123c/_result.png",
  kulhadPizza:
    "https://image.qwenlm.ai/generated-images/8772eeef-1083-4380-8024-92e41884309b/_result.png",
  kulhadMaggi:
    "https://image.qwenlm.ai/generated-images/cbeb94b7-8b9f-43a8-8e54-5ee9df6ab3a0/_result.png",
  pasta:
    "https://image.qwenlm.ai/generated-images/59aa27b2-fbb4-4744-bcb4-efb58f8cca76/_result.png",
  garlicBread:
    "https://image.qwenlm.ai/generated-images/5917b926-d706-4080-8f3d-45a3ace8d22c/_result.png",
  toastie:
    "https://image.qwenlm.ai/generated-images/b92fb78f-d1a4-47f8-be0e-32c0af5e30a6/_result.png",
  cheesePull:
    "https://image.qwenlm.ai/generated-images/6918fa53-14cb-4bac-8a92-e9773ba4428b/_result.png",
  burger:
    "https://image.qwenlm.ai/generated-images/f37b8b3b-b74a-41b4-8c14-251968e42d6f/_result.png",
  ambience:
    "https://image.qwenlm.ai/generated-images/dd2b0134-cae6-4c62-b1ac-f8c03bdd4aea/_result.png",
};

export const MENU_ITEMS: MenuItem[] = [
  /* ---------- KULHAD SPECIALS ---------- */
  {
    id: "kulhad-momos",
    name: "Cheese Volcano Kulhad Momos",
    category: "KULHAD SPECIALS",
    description:
      "Fried momos tossed in special creamy sauces, stuffed in a kulhad, topped with mozzarella cheese and baked till it erupts.",
    creativeLine: "When momos decided to erupt.",
    price: 149,
    image: IMG.kulhadMomos,
    vegetarian: true,
  },
  {
    id: "kulhad-pizza",
    name: "Cheese Loaded Kulhad Pizza",
    category: "KULHAD SPECIALS",
    description:
      "Fusion preparation of pan-tossed pizza ingredients loaded in a kulhad, covered with mozzarella cheese and baked.",
    creativeLine: "Pizza got bored of being ordinary.",
    price: 149,
    image: IMG.kulhadPizza,
    badge: "MUST TRY",
    vegetarian: true,
  },
  {
    id: "kulhad-maggi",
    name: "Cheese Chatori Kulhad Maggi",
    category: "KULHAD SPECIALS",
    description:
      "A burst of chatkadar Maggi baked in a kulhad, loaded with molten mozzarella cheese.",
    creativeLine: "Maggi. But make it dangerously cheesy.",
    price: 159,
    image: IMG.kulhadMaggi,
    badge: "BESTSELLER",
    vegetarian: true,
  },

  /* ---------- PASTA ---------- */
  {
    id: "pasta-alfredo",
    name: "Alfredo — White Sauce",
    category: "PASTA",
    description: "Penne tossed with creamy white cheese sauce with veggies.",
    creativeLine: "Twirl. Bite. Repeat.",
    price: 149,
    bakedPrice: 179,
    vegetarian: true,
  },
  {
    id: "pasta-arrabbiata",
    name: "Arrabbiata — Red Sauce",
    category: "PASTA",
    description:
      "Penne tossed in tomato sauce infused with special spices and vegetables, with a punch of chilli flakes.",
    price: 149,
    bakedPrice: 179,
    badge: "SPICY",
    vegetarian: true,
  },
  {
    id: "pasta-alarosey",
    name: "Ala Rosey — Pink Sauce",
    category: "PASTA",
    description:
      "Pasta infused in a cocktail sauce — the combination of red and white sauce. A creamy, perfectly blended flavour bomb.",
    creativeLine: "Twirl. Bite. Repeat.",
    price: 149,
    bakedPrice: 179,
    image: IMG.pasta,
    badge: "BESTSELLER",
    vegetarian: true,
  },
  {
    id: "pasta-periperi",
    name: "Peri Peri Pasta",
    category: "PASTA",
    description:
      "Penne pasta tossed in a cheesy & creamy fusion peri peri sauce with golden corn and Italian herbs.",
    price: 149,
    bakedPrice: 179,
    badge: "SPICY",
    vegetarian: true,
  },

  /* ---------- MAGGI ---------- */
  {
    id: "maggi-vegmasala",
    name: "Veg Masala Maggi",
    category: "MAGGI",
    description: "Maggi prepared with veggies and Maggi masala.",
    price: 79,
    vegetarian: true,
  },
  {
    id: "maggi-hotpassion",
    name: "Hot Passion Spicy Maggi",
    category: "MAGGI",
    description: "A chatakedar Maggi prepared with a punch of sauces & veggies.",
    price: 69,
    badge: "SPICY",
    vegetarian: true,
  },
  {
    id: "maggi-doublemasala",
    name: "Double Masala Maggi",
    category: "MAGGI",
    description:
      "A blend of finely ground spices, herbs & double Maggi masala.",
    price: 59,
    vegetarian: true,
  },
  {
    id: "maggi-chatori",
    name: "Cheese Chatori Maggi",
    category: "MAGGI",
    description:
      "A fusion Maggi prepared with special creamy sauces & veggies.",
    creativeLine: "Your midnight craving just got promoted.",
    price: 99,
    image: IMG.kulhadMaggi,
    badge: "BESTSELLER",
    vegetarian: true,
  },

  /* ---------- GARLIC BREAD ---------- */
  {
    id: "gb-cheese",
    name: "Cheese Garlic Bread",
    category: "GARLIC BREAD",
    description: "Baked slice of garlic bread topped with mozzarella cheese.",
    price: 99,
    addons: ["Add cheese +₹30"],
    vegetarian: true,
  },
  {
    id: "gb-supreme",
    name: "Supreme Treat Garlic Bread",
    category: "GARLIC BREAD",
    description:
      "Garlic bread loaded with golden jalapeño, onion, special seasoning & mozzarella.",
    price: 109,
    addons: ["Add cheese +₹30"],
    vegetarian: true,
  },
  {
    id: "gb-toofani",
    name: "Paneer Toofani Garlic Bread",
    category: "GARLIC BREAD",
    description:
      "Crispy garlic bread loaded with spicy green chilli-marinated paneer & onions, topped with cheesy mozzarella.",
    creativeLine: "A little heat never hurt.",
    price: 129,
    addons: ["Add cheese +₹30"],
    image: IMG.garlicBread,
    badge: "MUST TRY",
    vegetarian: true,
  },

  /* ---------- TOASTIE ---------- */
  {
    id: "toastie-korean",
    name: "Korean Spicy Paneer",
    category: "TOASTIE",
    description:
      "Paneer and veggies marinated in Korean sauce, topped with cheese on toasted bread.",
    price: 99,
    badge: "NEW",
    vegetarian: true,
  },
  {
    id: "toastie-periperi",
    name: "Peri Peri Cheese Blast",
    category: "TOASTIE",
    description:
      "Peri peri-spiced cheese cubes and onions with orange cheese sauce and a cheesy topping.",
    creativeLine: "Crunch outside. Chaos inside.",
    price: 99,
    image: IMG.toastie,
    badge: "MUST TRY",
    vegetarian: true,
  },
  {
    id: "toastie-italian",
    name: "Italian Treat",
    category: "TOASTIE",
    description: "Zorko-style spicy veggies on toast, crowned with cheesy goodness.",
    price: 89,
    vegetarian: true,
  },
];

export const MAGGI_ADDONS = [
  { label: "Add Cheese (25 gm)", price: 30 },
  { label: "Add Butter (10 gm)", price: 10 },
];

/* Signature dishes — the stacked featured cards */
export const FEATURED_IDS = [
  "kulhad-momos",
  "kulhad-pizza",
  "kulhad-maggi",
  "toastie-periperi",
  "gb-toofani",
];

/* ---------------- site constants ---------------- */

export const SITE = {
  name: "ZORKO HOWRAH",
  nameBn: "জোড়া হাওড়া",
  tagline: "Pure Veg. Full Power.",
  address:
    "2, Watkins Ln, near Nilgiri Apartment, Babudanga, Pilkhana, Howrah, West Bengal 711101",
  phoneDisplay: "070034 45782",
  phoneTel: "+917003445782",
  /* TODO: verify the WhatsApp number with the restaurant before launch */
  whatsapp: "917003445782",
  rating: 4.6,
  reviews: "89+",
  mapsDirections:
    "https://www.google.com/maps/search/?api=1&query=Zorko+Howrah+2+Watkins+Ln+Pilkhana+Howrah+West+Bengal+711101",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3256.7536147581286!2d88.3409002!3d22.592827299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027764207e7731%3A0x1467f202f7d79f3f!2sZorko%20Howrah!5e1!3m2!1sen!2sin!4v1788417106946!5m2!1sen!2sin",
  sharkTankVideo:
    "https://www.youtube.com/results?search_query=zorko+shark+tank+india",
  instagram: "https://www.instagram.com/explore/tags/zorkohowrah/",
  facebook: "https://www.facebook.com/search/top?q=zorko%20howrah",
};

export const WA_MESSAGES = {
  chat: "Hi Zorko Howrah! I'd like to know more about today's menu and ordering options.",
  order: "Hi Zorko Howrah! I'd like to place an order.",
  menu: "Hi Zorko Howrah! I'd like to know today's available menu items.",
  bulk: "Hi Zorko Howrah! I'd like to enquire about a bulk order.",
};

export function waLink(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

/* ---------------- reviews (Google listing: 4.6 ★ · 89 reviews) ---------------- */

export interface Review {
  quote: string;
  name: string;
  meta: string;
}

export const REVIEWS: Review[] = [
  {
    quote: "The food was amazing, the service was quick, and the staff were polite.",
    name: "Google Customer",
    meta: "Verified review",
  },
  {
    quote:
      "Cheese Volcano Momos are unreal. Baking everything in kulhads makes it smoky, rich and completely addictive.",
    name: "R. Sharma",
    meta: "Local Guide",
  },
  {
    quote:
      "Finally a pure veg place in Howrah that doesn't do boring. The Peri Peri Cheese Blast toastie is chaos in the best way.",
    name: "S. Dutta",
    meta: "Google review",
  },
  {
    quote:
      "Took my cousins after college. Prices are honestly unbelievable for the quality. We ended up ordering twice.",
    name: "A. Ghosh",
    meta: "Google review",
  },
  {
    quote: "The chatori Maggi is my weekly ritual now. Extra cheese? Obviously.",
    name: "P. Banerjee",
    meta: "Google review",
  },
  {
    quote:
      "Quick service, hot food, and that kulhad pizza… go hungry, thank me later.",
    name: "M. Khan",
    meta: "Google review",
  },
];

/* ---------------- Shark Tank timeline ---------------- */

export const TIMELINE = [
  {
    chapter: "CHAPTER 01",
    title: "ZORKO BEGINS",
    copy: "A small Howrah kitchen with one stubborn belief: vegetarian food should never be boring.",
  },
  {
    chapter: "CHAPTER 02",
    title: "THE GRIND",
    copy: "Late nights, a louder tawa, and a menu built around affordable, bold, pure-veg flavour.",
  },
  {
    chapter: "CHAPTER 03",
    title: "NEW OUTLETS",
    copy: "Word spread plate by plate. The kulhads kept coming — and so did the crowds.",
  },
  {
    chapter: "CHAPTER 04",
    title: "SHARK TANK INDIA",
    copy: "The Zorko story reached the national stage — a neighbourhood brand walking into the Tank.",
  },
  {
    chapter: "CHAPTER 05",
    title: "ZORKO TODAY",
    copy: "Still Howrah's craving station. Same madness. More cheese.",
  },
];

/* ---------------- gallery ---------------- */

export const GALLERY = [
  { src: IMG.kulhadPizza, caption: "CHEESE DOES THE TALKING.", tag: "KULHAD PIZZA", tall: true },
  { src: IMG.burger, caption: "BUILT FOR BIG BITES.", tag: "BURGERS", tall: false },
  { src: IMG.cheesePull, caption: "MORE CHEESE. LESS REGRET.", tag: "CHEESE PULL", tall: false },
  { src: IMG.kulhadMomos, caption: "SMALL PACKETS. BIG ATTITUDE.", tag: "MOMOS", tall: true },
  { src: IMG.ambience, caption: "GOOD FOOD. BETTER MOOD.", tag: "AMBIENCE", tall: false },
  { src: IMG.pasta, caption: "TWIRL. BITE. REPEAT.", tag: "PASTA", tall: false },
  { src: IMG.kulhadMaggi, caption: "YOUR CRAVING JUST GOT SERIOUS.", tag: "MAGGI", tall: true },
  { src: IMG.toastie, caption: "CRUNCH OUTSIDE. CHAOS INSIDE.", tag: "TOASTIE", tall: false },
  { src: IMG.garlicBread, caption: "A LITTLE HEAT NEVER HURT.", tag: "GARLIC BREAD", tall: false },
];

/* ---------------- scrollytelling scenes ---------------- */

export const SCENES = [
  {
    kicker: "SCENE 01",
    line: "IT STARTS WITH A CRAVING.",
    sub: "It's evening in Howrah. Your stomach has opinions.",
    image: IMG.kulhadPizza,
    alt: "Cheese loaded kulhad pizza fresh from the oven",
  },
  {
    kicker: "SCENE 02",
    line: "THEN COMES THE CHEESE.",
    sub: "Mozzarella. Obviously. An unreasonable amount of it.",
    image: IMG.cheesePull,
    alt: "Long molten cheese pull from a baked dish",
  },
  {
    kicker: "SCENE 03",
    line: "THEN THINGS GET SERIOUS.",
    sub: "Burgers. Pizza. Momos. The table fills up fast.",
    image: IMG.burger,
    alt: "Towering vegetarian cheese burger",
  },
  {
    kicker: "SCENE 04",
    line: "AND SOMEHOW…",
    sub: "there is always room for one more kulhad.",
    image: IMG.kulhadMomos,
    alt: "Cheese volcano kulhad momos",
  },
];

/* ---------------- copy bank ---------------- */

export const MARQUEE_FOOD = [
  "CHEESE VOLCANO MOMOS ₹149",
  "KULHAD PIZZA ₹149",
  "CHATORI MAGGI ₹159",
  "ALA ROSEY PASTA ₹149",
  "PANEER TOOFANI GARLIC BREAD ₹129",
  "PERI PERI CHEESE BLAST ₹99",
];

export const MARQUEE_COPY = [
  "MORE CHEESE. LESS REGRET.",
  "BUILT FOR BIG BITES.",
  "SMALL PACKETS. BIG ATTITUDE.",
  "TWIRL. BITE. REPEAT.",
  "YOUR CRAVING JUST GOT SERIOUS.",
  "PURE VEG. FULL POWER.",
];
