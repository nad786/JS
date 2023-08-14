function fullName() {
  setTimeout(() => {
    console.log(this.firstName + " " + this.lastName);
  })
}
  const person1 = {
    firstName:"John",
    lastName: "Doe"
  }
  const person2 = {
    firstName:"Mary",
    lastName: "Doe"
  }
  
  // This will return "John Doe":
  fullName.call(person1);

  Function.prototype.myCall = function(scope, ...rest) {
    let sym = Symbol();
    scope[sym] = this;
    let res = scope[sym](...rest);
    delete scope[sym];
    return res;
    // return this.bind(scope)(...rest);
  }
  fullName.myCall(person2);


