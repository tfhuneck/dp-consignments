import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDHg2X7OPNb9scfrc7mKl0HRI0R3XxyoqM",
  authDomain: "dp-consignment.firebaseapp.com",
  projectId: "dp-consignment",
  storageBucket: "dp-consignment.appspot.com",
  messagingSenderId: "453077400502",
  appId: "1:453077400502:web:43c7bf4ca52ef246381f17"
};

// Initialize Firebase
const authApp = initializeApp(firebaseConfig);

export default authApp;