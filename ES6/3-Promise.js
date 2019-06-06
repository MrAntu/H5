

function timeout(ms) {
    return new Promise((resolve, reject) => {
        // setTimeout(resolve, ms, "done");
        resolve("sdfdf")
        reject("3423423")
    })
}

timeout(100).then((value => {
    console.log(value) // done
})).catch((err)=>{
    console.log(err)
})



