import ax from 'axios'
/*
    listrik(sumber: String!): Listrik!
    semuaListrik: [Listrik!]!
    matikanListrik(sumber: String!): Boolean!
    hidupkanListrik(sumber: String!): Boolean!
*/

let url = "http://localhost:8082/mobile";

let queryBase = {
    "hidupkanListrik":`
query($sumber: String!){
    hidupkanListrik(sumber: $sumber)
}`,
    "matikanListrik":`
query($sumber: String!){
   matikanListrik(sumber: $sumber)
}    
    `,
    "daftarListrik":`
query{
    semuaListrik{
        sumber
        status
        beban
    }
}
    `,
    "listrik":`
query($sumber: String!){
    listrik(sumber: $sumber){
        sumber
        status
        beban
    }
}
    `
}

export async function post(params){
    return await ax({
        method: "POST",
        data: JSON.stringify(params),
        url: url,
        timeout: 10000
    })
     .then(function (response){
         return response.data
     })
     .catch(function (error){
         console.log(error);
     });
 
 }
 
 export async function Actions(act,variable){
     return await post(
         {
             query: queryBase[act],
             operations: null,
             variables: variable,
         }
     )
 }