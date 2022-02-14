


//Obter dados
database.collection("restaurantes").get().then((snapshot) => {
    snapshot.docs.forEach(doc => {

        receber(doc.get("nome"));
    })

}).catch((e) => {
    console.log("Erro " + e);
})

//Guardar dados
database.collection("restaurantes").add({
    nome: "cantinho_ativo",
    localizacao: "Viana"
})
