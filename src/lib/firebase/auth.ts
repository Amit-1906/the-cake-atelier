import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "./config";

function ensureAuth() {
  if (!auth || !db) throw new Error("Firebase is not configured. Set VITE_FIREBASE_* in .env.");
  return { auth, db };
}

export async function signUpWithEmail(params: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) {
  const { auth, db } = ensureAuth();
  const cred = await createUserWithEmailAndPassword(auth, params.email, params.password);
  const displayName = `${params.firstName} ${params.lastName}`.trim();
  await updateProfile(cred.user, { displayName });
  await setDoc(doc(db, "users", cred.user.uid), {
    uid: cred.user.uid,
    email: params.email,
    firstName: params.firstName,
    lastName: params.lastName,
    displayName,
    role: "customer",
    createdAt: serverTimestamp(),
  });
  return cred.user;
}

export async function signInWithEmail(email: string, password: string) {
  const { auth } = ensureAuth();
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function signInWithGoogle() {
  const { auth, db } = ensureAuth();
  const cred = await signInWithPopup(auth, googleProvider);
  await setDoc(
    doc(db, "users", cred.user.uid),
    {
      uid: cred.user.uid,
      email: cred.user.email,
      displayName: cred.user.displayName,
      photoURL: cred.user.photoURL,
      role: "customer",
      lastLoginAt: serverTimestamp(),
    },
    { merge: true },
  );
  return cred.user;
}

export async function signOutUser() {
  const { auth } = ensureAuth();
  await signOut(auth);
}

export async function resetPassword(email: string) {
  const { auth } = ensureAuth();
  await sendPasswordResetEmail(auth, email);
}
