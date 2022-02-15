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

let app;

if (Firebase.apps.length === 0) {
  app = Firebase.initializeApp(firebaseConfig);
} else {
  app = Firebase.app();
}

//const app = Firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = Firebase.firestore(app);

function newUser(userId, name, email, imageUrl) {
  db.collection('users').doc(auth.currentUser.uid)
    .set({
      userId: auth.currentUser.uid,
      name: name,
      email: email,
      imgUrl: "https://www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg"
    })
}

async function getUserInfo(userId = auth.currentUser.uid) {
  let users = [];

  let userCollection = await db.collection('users').get();

  userCollection.docs.forEach((doc) => {

    if (doc.data().userId == userId) {
      users.push({imgUrl: doc.data().imgUrl, name: doc.data().name, userId: doc.data().userId, type: 1});
    }
  });

  return users;
}

async function getAllUsers() {
  let users = [];

  let userCollection = await db.collection('users').get();

  userCollection.docs.forEach((doc) => {
    users.push({imgUrl: doc.data().imgUrl, name: doc.data().name, type: 1});
  });

  return users;
}

async function getAllRestaurants() {
  let restaurants = [];

  let userCollection = await db.collection('restaurantes').get();

  userCollection.docs.forEach((doc) => {
    restaurants.push({
      imgUrl: doc.data().imgs[0],
      name: doc.data().nome,
      descricao: doc.data().descricao,
      localizacao: doc.data().localizacao,
      type: 2
    });
  });

  return restaurants;
}

async function getRandom() {
  let all = [];
  let finalVet = [];
  let auxVet = [];

  let userCollection = await db.collection('users').get();

  userCollection.docs.forEach((doc) => {
    all.push({imgUrl: doc.data().imgUrl, name: doc.data().name, type: 1});
  });

  let restaurantCollection = await db.collection('restaurantes').get();

  restaurantCollection.docs.forEach((doc) => {
    all.push({
      imgUrl: doc.data().imgs[0],
      name: doc.data().nome,
      descricao: doc.data().descricao,
      localizacao: doc.data().localizacao,
      type: 2
    });
  });

  let i = 0;
  while (finalVet.length < 5) {
    if (Math.floor(Math.random() * 5) == 3) {
      finalVet.push(all[i]);
    }

    i++;

    if (i == all.length) {
      i = 0;
    }
  }
  return finalVet;
}

export { db, auth, newUser, getUserInfo, getAllUsers, getAllRestaurants, getRandom };
