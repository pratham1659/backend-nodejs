function delayFn(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function delayedGreet(name) {
  await delayFn(2000);
  console.log(name);
}

delayedGreet("Jhon");

async function divideFn(num1, num2) {
  try {
    if (num2 == 0) throw new error("can not perform divide by 0");
    return num1 / num2;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
async function mainFn() {
  console.log(await divideFn(10, 2));
  console.log(await divideFn(10, 0));
}

mainFn();
