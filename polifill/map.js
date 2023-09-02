//map polyfill
let a = [1,2,3];
let b = a.map((value, index) => {
    return value*value + index;
});
console.log(b);
if(!Array.prototype.myMap) {
    Array.prototype.myMap = function(cb) {
        let res = [];
        for(let index = 0; index < this.length; index++) {
            res.push(cb(this[index], index));
        }
        return res;
    }
}


let c = a.myMap((value, index) => {
    return value*value + index;
});
console.log(c);
