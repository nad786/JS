function memozied(func) {
    let cacheVar = {};
  
    return function(...args) {
      const param = args.join(",");
      if(!cacheVar[param]) {
        cacheVar[param] = func(...args);
      }
      return cacheVar[param];
    }
  };
  function addingTo(val) {
    console.log("function called");
    let sum = 0;
    for(let i=1;i < val ;i++) {
      sum += i;
    }
    return sum;
  }
  
  let memFn = memozied(addingTo);
  console.time("10000")
  memFn(10000);
  console.timeEnd("10000")
  
  console.time("20000")
  memFn(20000);
  console.timeEnd("20000")
  
  
  console.time("200000")
  memFn(20000);
  console.timeEnd("200000")