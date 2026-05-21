// Typed Firestore data layer for Maison Velvet.
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  type DocumentData,
} from "firebase/firestore";
import { db } from "./config";

function getDb() {
  if (!db) throw new Error("Firestore is not configured. Set VITE_FIREBASE_* in .env.");
  return db;
}

// ---------- Types ----------
export type CakeDoc = {
  id: string;
  name: string;
  category: "Cakes" | "Pastry" | "Macarons" | "Cheesecake" | "Seasonal";
  price: number;
  rating: number;
  image: string;
  description: string;
  badge?: string;
  inStock?: boolean;
  createdAt?: unknown;
};

export type OrderDoc = {
  id?: string;
  userId: string;
  items: { cakeId: string; name: string; price: number; qty: number; image: string }[];
  subtotal: number;
  delivery: number;
  tax: number;
  total: number;
  status: "pending" | "confirmed" | "preparing" | "delivered" | "cancelled";
  address?: string;
  createdAt?: unknown;
};

export type BookingDoc = {
  id?: string;
  userId: string;
  date: string; // ISO yyyy-mm-dd
  time: string;
  guests: number;
  notes?: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt?: unknown;
};

export type ReviewDoc = {
  id?: string;
  cakeId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt?: unknown;
};

export type CartItemDoc = {
  cakeId: string;
  qty: number;
  addedAt?: unknown;
};

// ---------- Cakes ----------
export async function listCakes(): Promise<CakeDoc[]> {
  const snap = await getDocs(collection(getDb(), "cakes"));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as DocumentData) }) as CakeDoc);
}

export async function getCake(id: string): Promise<CakeDoc | null> {
  const ref = doc(getDb(), "cakes", id);
  const snap = await getDoc(ref);
  return snap.exists() ? ({ id: snap.id, ...(snap.data() as DocumentData) } as CakeDoc) : null;
}

export async function upsertCake(cake: CakeDoc) {
  const { id, ...data } = cake;
  await setDoc(doc(getDb(), "cakes", id), { ...data, createdAt: serverTimestamp() }, { merge: true });
}

// ---------- Orders ----------
export async function createOrder(order: Omit<OrderDoc, "id" | "createdAt">) {
  const ref = await addDoc(collection(getDb(), "orders"), { ...order, createdAt: serverTimestamp() });
  return ref.id;
}

export async function listUserOrders(userId: string): Promise<OrderDoc[]> {
  const q = query(collection(getDb(), "orders"), where("userId", "==", userId), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as DocumentData) }) as OrderDoc);
}

// ---------- Bookings ----------
export async function createBooking(b: Omit<BookingDoc, "id" | "createdAt">) {
  const ref = await addDoc(collection(getDb(), "bookings"), { ...b, createdAt: serverTimestamp() });
  return ref.id;
}

export async function listUserBookings(userId: string): Promise<BookingDoc[]> {
  const q = query(collection(getDb(), "bookings"), where("userId", "==", userId), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as DocumentData) }) as BookingDoc);
}

// ---------- Reviews ----------
export async function listReviews(cakeId: string): Promise<ReviewDoc[]> {
  const q = query(collection(getDb(), "reviews"), where("cakeId", "==", cakeId), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as DocumentData) }) as ReviewDoc);
}

export async function createReview(r: Omit<ReviewDoc, "id" | "createdAt">) {
  const ref = await addDoc(collection(getDb(), "reviews"), { ...r, createdAt: serverTimestamp() });
  return ref.id;
}

// ---------- Cart (subcollection per user) ----------
export async function getUserCart(userId: string): Promise<CartItemDoc[]> {
  const snap = await getDocs(collection(getDb(), "users", userId, "cart"));
  return snap.docs.map((d) => ({ ...(d.data() as DocumentData) }) as CartItemDoc);
}

export async function setCartItem(userId: string, item: CartItemDoc) {
  await setDoc(doc(getDb(), "users", userId, "cart", item.cakeId), { ...item, addedAt: serverTimestamp() });
}

export async function updateCartQty(userId: string, cakeId: string, qty: number) {
  await updateDoc(doc(getDb(), "users", userId, "cart", cakeId), { qty });
}

export async function removeCartItem(userId: string, cakeId: string) {
  await deleteDoc(doc(getDb(), "users", userId, "cart", cakeId));
}
