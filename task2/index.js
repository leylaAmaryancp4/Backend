let obj = require('./car.js');
const car1 = new obj("Mazda", "CX-5", 2021);
const car2 = new obj ("Toyota", "Corolla", 2020);
console.log(car1.getInfo());
console.log(car1.drive());
console.log(car2.getInfo());
console.log(car2.drive());