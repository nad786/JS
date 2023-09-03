function myObjectCreate(proto) {
    // Write the solution here ==================================
    const obj = {};
    obj.__proto__ = proto;
    return obj;
  }
  
  const personPrototype = {
    greet: function () {
      console.log("Hello, my name is " + this.name + ".");
    },
  };
  
  const person = myObjectCreate(personPrototype);
  
  person.name = "John";
  person.greet();