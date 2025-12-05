let Bad = require('./bad.js');
let Good = require('./good.js');

console.log(Bad);
console.log(Good.msg);
/*Այսինքն՝ exports պարզապես հղում է դեպի module.exports սկզբում
Այստեղ դու փոխում ես exports օբյեկտի property–ները, որը դեռ նույնը module.exports է
 → Node.js կարողանում է վերադարձնել { msg: "Hello" }
 exports = { msg: "Not exported" };
Այստեղ դու փոխում ես exports-ի հղումը, բայց module.exports չի փոխվում
Node.js երբ require անում է bad.js → վերադարձնում է module.exports, որը դեռ {} է
bad: {}
❌ Հետեւաբար, exports = { ... } չի աշխատում մոդուլի export-ի համար */