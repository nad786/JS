function deepCopy(val) {
    if(typeof val != 'object' && val != null) {
        return val;
    }
    if(Array.isArray(val)) {
        return val.map(item => deepCopy(item));
    } else {
        // let obj = {};
        // for(let key in val) {
        //     obj[key] = deepCopy(val[key]);
        // }
        // return obj;

        return Object.keys(val).reduce((prev, key) => {
            prev[key] = deepCopy(val[key]);
            return prev;
        }, {});
    }
}

let a = {a: 10, b: 20, c: {key: "Testing"}, fn: function(){console.log(this)}};
let b = deepCopy(a);

a.a = "test";
a.c.key = "changed";

console.log(a);
console.log(b);