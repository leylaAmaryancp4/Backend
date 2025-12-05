let Func = require('./func.js');
let obj = require('./obj.js');

console.log(Func(3,3));
console.log(obj.add(2,3));
console.log(obj.mul(10,9));
console.log(obj.div(10,5));

/*Export a function

module.exports = greet

Երբ require անում ես, Node.js վերադարձնում է հենց ֆունկցիան

Կարող ես անմիջապես կանչել որպես greet()

Export an object

module.exports = { add, mul }

Երբ require անում ես, Node.js վերադարձնում է object

Կարող ես օգտագործել property–ները, օրինակ math.add(), math.mul() */
