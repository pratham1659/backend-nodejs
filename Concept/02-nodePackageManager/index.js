const lodash = require("lodash");

const names = ["pratham", "yahsraj", "sachin", "rahul", "saurav", "virendra", "anil", "kapil", "sunil", "mohinder"];

const capitalize = lodash.map(names, lodash.capitalize);
const upperCase = lodash.map(names, lodash.upperCase);

console.log(capitalize);
console.log(upperCase);
