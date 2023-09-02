function sum(a,b) {
    return new Promise((resolve) => {
        resolve(a+b);
    })
}

async function fn() {
    const res = await sum(10, 15);
    console.log("res " +res);
    return Promise.resolve(20);
}
console.log(fn());