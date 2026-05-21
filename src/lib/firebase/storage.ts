import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "./config";

function getStore() {
  if (!storage) throw new Error("Firebase Storage is not configured. Set VITE_FIREBASE_* in .env.");
  return storage;
}

export async function uploadFile(path: string, file: File | Blob): Promise<string> {
  const r = ref(getStore(), path);
  await uploadBytes(r, file);
  return getDownloadURL(r);
}

export async function deleteFile(path: string): Promise<void> {
  await deleteObject(ref(getStore(), path));
}

export async function getFileUrl(path: string): Promise<string> {
  return getDownloadURL(ref(getStore(), path));
}
