
// we cant send body with the GET request
// but we can send the query parameters
const axios = require('axios')
async function forFetch(){
    const res = await fetch('https://httpdump.app/dumps/d3209e20-1205-445b-b675-f1e2f0156660',{
        method : "POST",
        headers : {
            Authorization : "Bearer 123"
        },
        body : JSON.stringify({
            "username" : "Gautam"
        })
    })
    const a = await res.text()
    console.log(a);
}
// forFetch()
async function forAxios(){
    // const res = await axios.post('https://httpdump.app/dumps/d3209e20-1205-445b-b675-f1e2f0156660',{
    //     username : "Gautam",
    // },{
    //     headers : {
    //         "Authorization" : "Bearer 123"
    //     }
    // }) ---> one way 
    const res = await axios({
        url : 'https://httpdump.app/dumps/d3209e20-1205-445b-b675-f1e2f0156660',
        method : "POST",
        headers : {
            Authorization : "Bearer 123"
        },
        data : {
            username : "Gautam"
        },
    })
    console.log(res.data)
}
forAxios()