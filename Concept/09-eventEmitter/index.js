const EventEmitter = require("events");

const myFirstEmitter = new EventEmitter();

//register a listern
myFirstEmitter.on("greet", (name) => {
  console.log(`Hello ${name}`);
});

myFirstEmitter.emit("greet", "Jhon");
