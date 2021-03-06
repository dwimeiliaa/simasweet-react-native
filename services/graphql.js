import ax from 'axios'
/*
    listrik(sumber: String!): Listrik!
    semuaListrik: [Listrik!]!
    matikanListrik(sumber: String!): Boolean!
    hidupkanListrik(sumber: String!): Boolean!
*/

let url = "https://simasweets.herokuapp.com/";

let queryBase = {
    "hidupkanListrik":`
mutation($sumber: String!){
    hidupkanListrik(sumber: $sumber)
}`,
    "matikanListrik":`
mutation($sumber: String!){
   matikanListrik(sumber: $sumber)
}    
    `,
    "daftarListrik":`
query{
    semuaListrik{
        Sumber
        Status
        Beban
    }
}
    `,
    "listrik":`
query($sumber: String!){
    listrik(sumber: $sumber){
        Sumber
        Status
        Beban
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
 
 export default async function Actions(act,variable){
     return await post(
         {
             query: queryBase[act],
             operations: null,
             variables: variable,
         }
     )
 }