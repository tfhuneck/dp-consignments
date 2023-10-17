import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAlpHfLixUS94ufuOwu1_i5jyHiifKW2l4",
  authDomain: "dandpconsignments-9e9c2.firebaseapp.com",
  projectId: "dandpconsignments-9e9c2",
  storageBucket: "dandpconsignments-9e9c2.appspot.com",
  messagingSenderId: "314567179622",
  appId: "1:314567179622:web:e8ae83a12c939c15cd5ca7"
};

// Initialize Firebase
const authApp = initializeApp(firebaseConfig);

export default authApp;