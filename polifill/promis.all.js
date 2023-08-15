const promise1 = Promise.resolve(3);
const prmoise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(
    function (key) {
      resolve(key);
    },
    100,
    "foo"
  );
});

// Promise.all([promise1, prmoise2, promise3]).then((values) => {
//     console.log(values);
// });

// first way to usinf async await
Promise.myAll = function (arr = []) {
  return new Promise((resolve, reject) => {
    let res = [];
    async function reolveAll() {
      try {
        for (let item of arr) {
          res.push(await item);
        }
        resolve(res);
      } catch (err) {
        reject(err);
      }
    }
    reolveAll();
  });
};

//second way
// Promise.myAll = function (arr = []) {
//   return new Promise((resolve, reject) => {
//     let res = new Array(arr.length);
//     let count = 0;
//     arr.forEach((item, index) => {
//       Promise.resolve(item).then((value) => {
//         res[index] = value;
//         count++;
//         if (count == arr.length) {
//           resolve(res);
//         }
//       }).catch(err => reject(err));
//     });
//   });
// };
Promise.myAll([promise3, prmoise2, promise1]).then((values) => {
  console.log(values);
});
