import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBEp-wXOQTNFOj4TKD8aw7Ml1Y55NMbjrg",
  authDomain: "foodie-app-ab8ac.firebaseapp.com",
  projectId: "foodie-app-ab8ac",
  storageBucket: "foodie-app-ab8ac.firebasestorage.app",
  messagingSenderId: "380421685241",
  appId: "1:380421685241:web:ea4c1ffa4027d22da38728"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);