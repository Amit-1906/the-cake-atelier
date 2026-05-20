import chocolate from "@/assets/cake-chocolate.jpg";
import macaron from "@/assets/cake-macaron.jpg";
import strawberry from "@/assets/cake-strawberry.jpg";
import tiramisu from "@/assets/cake-tiramisu.jpg";
import cheesecake from "@/assets/cake-cheesecake.jpg";
import redvelvet from "@/assets/cake-redvelvet.jpg";
import pastry from "@/assets/cake-pastry.jpg";
import hero from "@/assets/hero-cake.jpg";

export type Product = {
  id: string;
  name: string;
  category: "Cakes" | "Pastry" | "Macarons" | "Cheesecake" | "Seasonal";
  price: number;
  rating: number;
  image: string;
  description: string;
  badge?: string;
};

export const products: Product[] = [
  { id: "rose-velvet", name: "Rose Velvet Atelier", category: "Cakes", price: 1850, rating: 4.9, image: hero, description: "Soft rose petal sponge layered with mascarpone cream and wild berries.", badge: "Signature" },
  { id: "gold-ganache", name: "Gold Leaf Ganache", category: "Cakes", price: 2200, rating: 4.9, image: chocolate, description: "Single-origin Valrhona ganache finished with 23k gold leaf.", badge: "Best Seller" },
  { id: "pastel-macarons", name: "Pastel Macaron Box", category: "Macarons", price: 950, rating: 4.8, image: macaron, description: "Twelve hand-piped macarons in seasonal flavours." },
  { id: "strawberry-cloud", name: "Strawberry Cloud", category: "Cakes", price: 1450, rating: 4.7, image: strawberry, description: "Genoise sponge, vanilla chantilly, sun-ripened strawberries." },
  { id: "tiramisu-noir", name: "Tiramisu Noir", category: "Seasonal", price: 1250, rating: 4.8, image: tiramisu, description: "Slow-brewed espresso, mascarpone, hand-dusted cocoa." },
  { id: "burnt-basque", name: "Burnt Basque Cheesecake", category: "Cheesecake", price: 1600, rating: 4.9, image: cheesecake, description: "Caramelised crown, silken centre, salted caramel pour.", badge: "New" },
  { id: "red-velvet", name: "Classic Red Velvet", category: "Cakes", price: 1550, rating: 4.6, image: redvelvet, description: "Three layers of cocoa sponge with vanilla bean cream cheese." },
  { id: "morning-pastry", name: "Atelier Pastry Board", category: "Pastry", price: 780, rating: 4.7, image: pastry, description: "Hand-laminated croissants, kouign amann and pain suisse." },
];

export const categories = ["All", "Cakes", "Pastry", "Macarons", "Cheesecake", "Seasonal"] as const;
