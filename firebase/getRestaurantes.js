import database from "./firebaseConnection";

var nomes = [];

export default async function receber(e) {
    nomes.push(e);
}

database.collection("restaurantes").get().then((snapshot) => {
    snapshot.docs.forEach(doc => {

        receber(doc.get("nome"));
    })

}).catch((e) => {
    console.log("Erro " + e);
})

export default nomes;
