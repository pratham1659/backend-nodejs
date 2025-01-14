function delayFn(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

console.log("Promise lecture started");
delayFn(2000).then(() => {
  console.log("after 2 seconds promise resolved");
});
console.log("node end");

function divideFn(num1, num2) {
  return new Promise((resolve, reject) => {
    if (num2 == 0) {
      reject("can not perform divide by 0");
    } else {
      resolve(num1 / num2);
    }
  });
}

divideFn(22, 0)
  .then((result) => console.log("ans: ", result))
  .catch((error) => console.error("err:", error));
