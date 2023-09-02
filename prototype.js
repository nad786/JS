function A(name) {
    this.name = name;
}

A.prototype.sayHi = function() {
    console.log(this.name);
}

let a = new A("Rabbit");

a.sayHi();
A.prototype.sayHi();
Object.getPrototypeOf(a).sayHi();
a.__proto__.sayHi();
console.log(Object.getPrototypeOf(a));