// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSR9RGgT2pR0R3SgMcJx7EIneEHBLywns",
  authDomain: "quantsinterview.firebaseapp.com",
  projectId: "quantsinterview",
  storageBucket: "quantsinterview.firebasestorage.app",
  messagingSenderId: "347353569713",
  appId: "1:347353569713:web:ea4701c90d0a22f3aec590",
  measurementId: "G-7MS82R8X69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);