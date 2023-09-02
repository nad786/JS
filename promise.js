// const promise = Promise.reject("Test");


// promise.catch(() => {
//     console.log("5")
// })
// promise.then(null, () => {
//     console.log("8")
// })

// promise.then((null), () => {
//     console.log("12");
//     return "Hello";
// }).then((data) => {
//     console.log("14", data)
// })

// promise.then(null, () => {
//     console.log("18")
// }).then(() => {
//     console.log("20");
// })

// promise.catch(() => {
//     console.log("18")
// })




const promise = Promise.resolve(10);

promise.catch(data => {
    console.log("33 "+data);
}).finally(console.log).then(data => {
    console.log("35: "+data);
    return 1000;
}).then(data => {
    console.log("37 "+data);
})