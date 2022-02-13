import database from "./firebaseConnection";

database.collection("restaurantes").get()
    .then((snapshot) => {
        snapshot.docs.forEach(doc => {
            console.log(doc)
        })

    }).catch((e) => {
        console.log(e);
    })