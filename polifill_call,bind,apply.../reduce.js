let a = [1,2,3];
let b = a.reduce((p,c) => {
    return c+p;
});
console.log(b);

Array.prototype.myreduce = function(cb, initialValue) {
    let res = initialValue;
    let i = 0;
    if(res == undefined) {
        i = 1;
        res = this[0];
    }

    while(this[i]) {
        res = cb(res, this[i++]);
    }
    return res;
}

let c = a.myreduce((p,c) => {
    return c+p;
});
console.log(c);


let arr = [{x:1}, {x:2}, {x:4}];
let result = arr.reduce(function (acc, obj) { return acc + obj.x; }, 0);
let result1 = arr.myreduce(function (acc, obj) { return acc + obj.x; }, 0);
console.log(result, result1);  // 7


arr = [{x:1},{x:2},{x:4}];

let res = arr.myreduce(function (a, b) {
  return {x: a.x + b.x}; // returns object with property x
})

// ES6
let res1 = arr.myreduce((a, b) => ({x: a.x + b.x}));
console.log("res "+JSON.stringify(res));
console.log("res1 "+JSON.stringify(res1));