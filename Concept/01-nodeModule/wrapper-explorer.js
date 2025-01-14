console.log("Node Module wrapper demo");

console.log("__filename in explorer", __filename);
console.log("__dirname in explorer", __dirname);

module.exports.greet = function (name) {
  console.log(`Hello ${name}`);
};
