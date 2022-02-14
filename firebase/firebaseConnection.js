// Import the functions you need from the SDKs you need
import * as Firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADJhZ82zkF7NDkA_3UqC0rFJr3u-esSr8",
  authDomain: "didibom-3d9fc.firebaseapp.com",
  projectId: "didibom-3d9fc",
  storageBucket: "didibom-3d9fc.appspot.com",
  messagingSenderId: "866449635442",
  appId: "1:866449635442:web:0a241cb8431cc4eed7aaeb",
  measurementId: "G-0HVECWJG76"
};

// Initialize Firebase
/*let app;
if (Firebase.app.length === 0) {
    
} else {
    app = Firebase.app();
    console.log("erro");
}*/

const app = Firebase.initializeApp(firebaseConfig);
const auth = app.auth();

export {auth}