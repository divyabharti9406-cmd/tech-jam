
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  set,
  update,
  onValue,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCkpOOuX4bQgU3NxHE1sqsQ2nITwaeJULQ",
  authDomain: "live-classroom-pulse.firebaseapp.com",
  databaseURL: "https://live-classroom-pulse-default-rtdb.firebaseio.com",
  projectId: "live-classroom-pulse",
  storageBucket: "live-classroom-pulse.firebasestorage.app",
  messagingSenderId: "629211362834",
  appId: "1:629211362834:web:e0b5c99d01332692768acb",
  measurementId: "G-96VESDGQ5S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

// Add data
export async function addData(path, data) {
  const newRef = push(ref(db, path));

  await set(newRef, {
    ...data,
    createdAt: serverTimestamp()
  });

  return newRef.key;
}

// Read data in real time
export function listenData(path, callback) {
  return onValue(ref(db, path), (snapshot) => {
    callback(snapshot.val() || {});
  });
}

// Update existing data
export async function updateData(path, data) {
  await update(ref(db, path), data);
}

// Delete data
export async function deleteData(path) {
  await set(ref(db, path), null);
}

console.log("Live Classroom Pulse Firebase initialized");
