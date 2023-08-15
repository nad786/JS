const person = {
    firstName: 'John',
    lastName: 'Doe'
}
function greet(greeting, message) {
    return `${greeting} ${this.firstName}. ${message}`;
}
let result = greet.apply(person, ['Hello', 'How are you?']);

console.log(result);


Function.prototype.myApply = function(scope, args) {
    let sym = Symbol();
    scope[sym] = this;
    let res = scope[sym](...args);
    delete scope[sym];
    return res;
    // return this.bind(scope)(...args);
}
result = greet.myApply(person, ['Hello', 'How are you?']);
console.log(result);
