let fs = require('fs');
let path = require('path');
const filePath = path.join(__dirname, "task2.json")
 let readFile = fs.readFileSync(filePath,"utf-8")

const obj = JSON.parse(readFile);
obj.isbool = true;
obj.skills.push("Ts");// avelacvac property
console.log(obj);
console.log(obj.name);
console.log(obj.age);
console.log(obj.skills.join(","))

let newFile = path.join(__dirname,"updatetask2.js")
fs.writeFileSync(newFile, JSON.stringify(obj,null,2), "utf-8");

console.log("Updated JSON saved to updatetask2.json");


/*let obj = require('./task2.json'); 
console.log(obj);*/ 

/*Node.js-ի require() ավտոմատ կարդում է JSON ֆայլը

JSON-ի string-ը ավտոմատ parse է լինում JavaScript object

Հետո կարող ես ուղղակի օգտագործել obj.name, obj.age և այլն
Այս ձևը synchronous է (միջնաժամանակ չի աշխատում async)

Եթե JSON ֆայլը մեծ է կամ պետք է async operation → ավելի լավ է օգտագործել fs.readFile կամ fs.promises.readFile*/