const person = {
    firstName: "Md",
    lastName: "Nad",
    fullName: function() {
      return this.firstName + " " + this.lastName;
    }
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
  let res = person.fullName.call(person1, "Test", "Value");
  console.log(res);

  Function.prototype.myCall = function(scope, ...rest) {
    let sym = Symbol();
    scope[sym] = this;
    let res = scope[sym](...rest);
    delete scope[sym];
    return res;
    // return this.bind(scope)(...rest);
  }
  res = person.fullName.myCall(person1);
  console.log("Res "+res);
  console.log(person)
  res = person.fullName();
  console.log(res);

