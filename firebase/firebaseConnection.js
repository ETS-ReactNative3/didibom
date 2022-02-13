import firebase from 'firebase'

firebase.initializeApp({
    apiKey: "AIzaSyCoiKyDxSFXvVQ3JNjDvFY8t-ZlHkDRzug",
    authDomain: "didibom-a9dfa.firebaseapp.com",
    projectId: "didibom-a9dfa",
    storageBucket: "didibom-a9dfa.appspot.com",
    messagingSenderId: "358365710078",
    appId: "1:358365710078:web:3231b4fdacc86a29c607af"
});


//firebase.initializeApp(firebaseConfig)

const database = firebase.firestore();


//const database = firebase.firestore();
export default database;