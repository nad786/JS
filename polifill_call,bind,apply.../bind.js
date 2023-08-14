const person = {
    firstName:"John",
    lastName: "Doe",
    display: function (x) {
      console.log(this.firstName + " " + this.lastName);
    }
  }
  
  let display = person.display.bind(person);
  setTimeout(display, 10); 


  Function.prototype.myBind = function(scope) {
    // let sym = Symbol();
    // scope[sym] = this;
    // return function(...args) {
    //     scope[sym](...args)
    // }
    let obj = {...scope};
    let sym = Symbol();
    obj[sym] = this;
    // return obj[sym];// wrong it will return function when while calling this fn this will point window or calling context
    return function(...args) {
        obj[sym](...args)
    }
  }

  let display1 = person.display.myBind(person);
  // setTimeout(display1, 10); 
  display1();