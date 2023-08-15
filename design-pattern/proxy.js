let obj = {
    prop1: "Testing",
    prop2: "2nd value",
}

const handler = {
    // Define traps to intercept various operations
    get(target, property) {
      console.log(`Getting property: ${property}`);
      return target[property];
    },
    set(target, property, value) {
      console.log(`Setting property: ${property} to ${value}`);
      target[property] = value;
    },
  };

obj = new Proxy(obj, handler);

obj.prop1 = "changed";
obj.prop2 = "modified";

console.log(obj);