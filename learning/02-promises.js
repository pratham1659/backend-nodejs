console.log("START");

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("promise p1 executed");
  }, 2000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("promise p2 executed");
  }, 3000);
});

p1.then((data) => {
  console.log(data);
});

p1.then((data) => {
  console.log("then 1", data);
  return p1;
}).catch((err) => console.log(err));

p2.then((data) => {
  console.log("Promise p2 executed", data);
  return p2;
})
  .then((data) => {
    console.log("then 2", data);
  })
  .catch((err) => console.log(err));

console.log("END");
