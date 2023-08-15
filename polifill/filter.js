 let a = [5,3,2];

 b = a.filter(item => item);
 console.log(b);

 Array.prototype.myFilter = function(cb) {
    let res = [];
    for(let item of this) {
        if(cb(item)) {
            res.push(item);
        }
    }
    return res;
 }
 b = a.myFilter(item => item);
 console.log(b);
