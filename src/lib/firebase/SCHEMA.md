# Firestore Schema — Maison Velvet

## Collections

### `cakes/{cakeId}`
- `name: string`
- `category: "Cakes" | "Pastry" | "Macarons" | "Cheesecake" | "Seasonal"`
- `price: number` (INR)
- `rating: number` (0–5)
- `image: string` (URL)
- `description: string`
- `badge?: string`
- `inStock: boolean`
- `createdAt: Timestamp`

### `users/{uid}`
Created on signup / Google sign-in.
- `uid, email, firstName?, lastName?, displayName, photoURL?`
- `role: "customer" | "admin"`
- `createdAt, lastLoginAt: Timestamp`

#### Subcollection `users/{uid}/cart/{cakeId}`
- `cakeId: string`, `qty: number`, `addedAt: Timestamp`

### `orders/{orderId}`
- `userId: string`
- `items: { cakeId, name, price, qty, image }[]`
- `subtotal, delivery, tax, total: number`
- `status: "pending" | "confirmed" | "preparing" | "delivered" | "cancelled"`
- `address?: string`
- `createdAt: Timestamp`

### `bookings/{bookingId}`
- `userId, date (yyyy-mm-dd), time, guests, notes?`
- `status: "pending" | "confirmed" | "cancelled"`
- `createdAt: Timestamp`

### `reviews/{reviewId}`
- `cakeId, userId, userName, rating (1-5), comment`
- `createdAt: Timestamp`

## Recommended Security Rules (paste in Firebase console)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {
    function signedIn() { return request.auth != null; }
    function isOwner(uid) { return signedIn() && request.auth.uid == uid; }

    match /cakes/{id} {
      allow read: if true;
      allow write: if signedIn() &&
        get(/databases/$(db)/documents/users/$(request.auth.uid)).data.role == "admin";
    }
    match /users/{uid} {
      allow read, write: if isOwner(uid);
      match /cart/{cakeId} {
        allow read, write: if isOwner(uid);
      }
    }
    match /orders/{id} {
      allow create: if signedIn() && request.resource.data.userId == request.auth.uid;
      allow read: if signedIn() && resource.data.userId == request.auth.uid;
    }
    match /bookings/{id} {
      allow create: if signedIn() && request.resource.data.userId == request.auth.uid;
      allow read: if signedIn() && resource.data.userId == request.auth.uid;
    }
    match /reviews/{id} {
      allow read: if true;
      allow create: if signedIn() && request.resource.data.userId == request.auth.uid;
    }
  }
}
```

## Storage Rules

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /cakes/{file=**} { allow read: if true; allow write: if request.auth != null; }
    match /users/{uid}/{file=**} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```
