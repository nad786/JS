function makeDeepCopy(val) {
    if(typeof val != 'object' && val != null) {
        return val;
    }
    if(Array.isArray(val)) {
        return val.map(item => makeDeepCopy(item));
    } else {
        // let obj = {};
        // for(let key in val) {
        //     obj[key] = makeDeepCopy(val[key]);
        // }
        // return obj;

        return Object.keys(val).reduce((prev, key) => {
            prev[key] = makeDeepCopy(val[key]);
            return prev;
        }, {});
    }
}

let a =  { dish: "noodles", recipe: { list: ["eggs", "flour", "water"] } };
let b = makeDeepCopy(a);

a.dish = "test";
a.recipe.list.pop();

console.log(a);
console.log(b);