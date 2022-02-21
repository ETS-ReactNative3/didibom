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

const cloudStorage = app.storage();
//const app = Firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = Firebase.firestore(app);

function newUser(userId, name, email, imageUrl) {
  db.collection('users').doc(auth.currentUser.uid)
    .set({
      userId: auth.currentUser.uid,
      name: name,
      email: email,
      imgUrl: "https://www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg",
      conexoes: 0
    })
}

export async function newConnection(userId2, userId1 = auth.currentUser.uid) {

  let idConnection = userId1 + "" + userId2;

  /* Verificar se existe conexão */

  var connections = [];

  let connectionCollection = await db.collection('connections').get();

  connectionCollection.docs.forEach((doc) => {
    if ((doc.data().userId1 == userId1 && doc.data().userId2 == userId2
      || doc.data().userId1 == userId2 && doc.data().userId2 == userId1)) {
      connections.push({ pending: doc.data().pending });
    }
  });

  /* Fim da verificação de conexão */

  if (connections.length == 0) {
    db.collection('connections').doc(idConnection)
      .set({
        idConnection: idConnection,
        userId1: userId1,
        userId2: userId2,
        pending: true,
        dateOfCon: new Date()
      });

    alert("Foi enviado um pedido de conexão!");
  } else {
    if (connections[0].pending) {
      alert("Já enviou um pedido. Aguarde resposta!");
    } else {
      alert("Já está conectado");
    }
  }
}

export function newInvite(idRestaurante, userId2, userId1 = auth.currentUser.uid) {

  let idInvite = userId1 + "" + userId2 + "" + idRestaurante;

  db.collection('invites').doc(idInvite)
    .set({
      idInvite: idInvite,
      idRestaurante: idRestaurante,
      userId1: userId1,
      userId2: userId2,
      pending: true,
      dateOfCon: new Date()
    });

    alert("Convite enviado!");
}

export async function getNotifications(userId = auth.currentUser.uid) {
  /* Verificar se existe conexão */

  let ids1 = [];
  let ids2 = [];
  let notifications = [];

  let connectionCollection = await db.collection('connections').get();
  let inviteCollection = await db.collection('invites').get();

  connectionCollection.docs.forEach(async (doc) => {
    let equalsUserId2 = doc.data().pending == true && doc.data().userId2 == userId;

    if (equalsUserId2) {
      ids1.push({ user: doc.data().userId1, pending: doc.data().pending });
    }
  });

  inviteCollection.docs.forEach(async (doc) => {
    let equalsUserId2 = doc.data().pending == true && doc.data().userId2 == userId;

    if (equalsUserId2) {
      ids2.push({ user: doc.data().userId1, restaurant: doc.data().idRestaurante, pending: doc.data().pending });
    }
  });

  for (let i = 0; i < ids1.length; i++) {
    let userInfo = await getUserInfo(ids1[i].user);

    if (ids1[i].pending == true) {
      notifications.push({ user: {...userInfo[0]}, pending: ids1[i].pending, typeNotification: 1 });
    }
  }

  for (let i = 0; i < ids2.length; i++) {
    let userInfo = await getUserInfo(ids2[i].user);
    let restaurantInfo = await getRestaurantInfo(ids2[i].restaurant);

    if (ids2[i].pending == true) {
      notifications.push({
        user: {...userInfo[0]},
        restaurant: {...restaurantInfo[0]},
        pending: ids2[i].pending,
        typeNotification: 2
      });
    }
  }

  return notifications;
}

export function acceptInvite(userId1, idRestaurante) {

  let userId2 = auth.currentUser.uid;

  let idInvite = userId1 + "" + userId2 + "" + idRestaurante;

  db.collection('invites').doc(idInvite)
  .set({
    idInvite: idInvite,
    idRestaurante: idRestaurante,
    userId1: userId1,
    userId2: userId2,
    pending: false,
    dateOfCon: new Date()
  });
}

export function acceptConnection(userId1) {

  let userId2 = auth.currentUser.uid;

  let idConnection = userId1 + "" + userId2;

  db.collection('connections').doc(idConnection)
    .set({
      idConnection: idConnection,
      userId1: userId1,
      userId2: userId2,
      pending: false,
      dateOfCon: new Date()
    });
}

export async function rejectConnection(userId) {

}

export async function getNoOfConnections(userId = auth.currentUser.uid) {

  let connectionCollection = await db.collection('connections').get();
  let noConnections = 0;

  connectionCollection.docs.forEach(async (doc) => {
    let equalsUserId = doc.data().pending == false && (doc.data().userId2 == userId || doc.data().userId1 == userId);

    if (equalsUserId) {
      noConnections++;
    }
  });

  return noConnections;
}

async function getUserInfo(userId = auth.currentUser.uid) {
  let users = [];

  let userCollection = await db.collection('users').get();

  userCollection.docs.forEach((doc) => {
    if (doc.data().userId == userId) {
      users.push({ imgUrl: doc.data().imgUrl, name: doc.data().name, userId: doc.data().userId, type: 1 });
    }
  });

  return users;
}

async function getRestaurantInfo(idRestaurante) {
  let restaurants = [];

  let restaurantCollection = await db.collection('restaurantes').get();

  restaurantCollection.docs.forEach((doc) => {
    if (doc.data().id == idRestaurante) {
      restaurants.push({
        imgUrl: doc.data().imgs[0],
        imagens: doc.data().imgs.slice(1),
        name: doc.data().nome,
        descricao: doc.data().descricao,
        localizacao: doc.data().localizacao,
        id: doc.data().id,
        type: 2
      });
    }
  });

  return restaurants;
}

async function getAllUsers() {
  let users = [];

  let userCollection = await db.collection('users').get();

  userCollection.docs.forEach((doc) => {
    users.push({ imgUrl: doc.data().imgUrl, name: doc.data().name, type: 1, email: doc.data().email, userId: doc.data().userId });
  });

  return users;
}

export async function getConnections(userId = auth.currentUser.uid) {
  /* Verificar se existe conexão */

  let ids = [];
  let connections = [];

  let connectionCollection = await db.collection('connections').get();

  connectionCollection.docs.forEach(async (doc) => {
    let equalsUserId = doc.data().pending == false && (doc.data().userId2 == userId || doc.data().userId1 == userId);

    if (equalsUserId) {
      console.log(doc.data());
      ids.push({ user: (doc.data().userId1 != userId) ? doc.data().userId1 : doc.data().userId2 });
    }
  });

  for (let i = 0; i < ids.length; i++) {
    let userInfo = await getUserInfo(ids[i].user);

    connections.push({ ...userInfo[0] });
  }

  return connections;
}

async function getAllRestaurants() {
  let restaurants = [];

  let userCollection = await db.collection('restaurantes').get();

  userCollection.docs.forEach((doc) => {
    restaurants.push({
      imgUrl: doc.data().imgs[0],
      imagens: doc.data().imgs.slice(1),
      name: doc.data().nome,
      descricao: doc.data().descricao,
      localizacao: doc.data().localizacao,
      id: doc.data().id,
      type: 2
    });
  });

  return restaurants;
}

async function getRandom() {
  let all = [];
  let finalVet = [];

  let userCollection = await db.collection('users').get();

  userCollection.docs.forEach((doc) => {
    all.push({ imgUrl: doc.data().imgUrl, name: doc.data().name, type: 1, email: doc.data().email, userId: doc.data().userId });
  });

  let restaurantCollection = await db.collection('restaurantes').get();

  restaurantCollection.docs.forEach((doc) => {
    all.push({
      imgUrl: doc.data().imgs[0],
      name: doc.data().nome,
      descricao: doc.data().descricao,
      localizacao: doc.data().localizacao,
      id: doc.data().id,
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


async function getRandomItem() {
  let all = [];
  let finalVet = [];

  let userCollection = await db.collection('users').get();

  userCollection.docs.forEach((doc) => {
    all.push({ imgUrl: doc.data().imgUrl, name: doc.data().name, type: 1, email: doc.data().email, userId: doc.data().userId });
  });

  let restaurantCollection = await db.collection('restaurantes').get();

  restaurantCollection.docs.forEach((doc) => {
    all.push({
      imgUrl: doc.data().imgs[0],
      name: doc.data().nome,
      descricao: doc.data().descricao,
      localizacao: doc.data().localizacao,
      id: doc.data().id,
      type: 2
    });
  });

  finalVet.push(all[Math.floor(Math.random() * all.length)]);

  return finalVet;
}

async function getRandomPeople(x) {
  let all = [];
  let finalVet = [];

  let userCollection = await db.collection('users').get();

  userCollection.docs.forEach((doc) => {
    all.push({ imgUrl: doc.data().imgUrl, name: doc.data().name, type: 1 });
  });

  let i = 0;

  while (finalVet.length < x) {
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



export { db, auth, newUser, getUserInfo, getAllUsers, getAllRestaurants, getRandom, getRandomPeople, getRandomItem };
