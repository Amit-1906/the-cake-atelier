/**
 * One-time seed script: uploads the local product catalog to Firestore.
 *
 * Usage (from project root, after filling .env):
 *   bun run scripts/seed-firestore.ts
 */
import { upsertCake } from "../src/lib/firebase/firestore";
import { products } from "../src/lib/products";

async function run() {
  console.log(`Seeding ${products.length} cakes…`);
  for (const p of products) {
    await upsertCake({
      id: p.id,
      name: p.name,
      category: p.category,
      price: p.price,
      rating: p.rating,
      image: p.image,
      description: p.description,
      badge: p.badge,
      inStock: true,
    });
    console.log(" ✓", p.name);
  }
  console.log("Done.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
