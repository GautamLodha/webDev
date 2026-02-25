const fs = require('fs')
const { resolve } = require('path')



// normal async calling
/*
fs.readFile('d.txt','utf-8',function(err,data){
    if(err){
        console.log('err while reading file')
    }else{
        console.log(data)
    }
})
*/

// promisified version of the readFile
function promisifiedReadFile(path,encoding){
    return new Promise(function(resolve,reject){
        fs.readFile(path,encoding,function(err,data){
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}
/*

one way of calling the promise
promisifiedReadFile('d.txt','utf-8')
.then(function(){
    console.log("file readed");
}).catch(function(){
    console.log("error while reading");
}).finally(function(){
    console.log("finally runs at end"); // runs at the final at both completion or rejection
})
*/
async function main() { // try cathc only works on the promise and if any line throws error it will goes to the catch
    try {
        let contents1 = await promisifiedReadFile('a.txt','utf-8');
        let contents2 = await promisifiedReadFile('d.txt','utf-8');
        let contents3 = await promisifiedReadFile('c.txt','utf-8');
        return {contents1,contents2,contents3};
    } catch (error) {
        throw new Error(error)
    }
}
main()
.then(function(c1){
    console.log(c1);
})
.catch(function(){
    console.log("bad");
})