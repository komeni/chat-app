import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHIUjbOEsQ6T6n_j3pAr6PF_51nkYgLVw",
  authDomain: "komeni-chats.firebaseapp.com",
  projectId: "komeni-chats",
  storageBucket: "komeni-chats.appspot.com",
  messagingSenderId: "431068585513",
  appId: "1:431068585513:web:eef87882e40f1101acc638",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
