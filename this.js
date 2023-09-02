let fn = () => {
    console.log(this);
  };
  let obj = {
    name: "Nad",
    printName() {
      setTimeout(fn.bind(this));
    },
  };
  
  obj.printName();
  
  let f = function () {
    return () => {
      return function() {
        console.log(this);
      };
    };
  };
  
  f.call({})()();