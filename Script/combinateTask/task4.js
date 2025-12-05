/*Accepts a file path as a command-line argument and prints its directory name, base name, extension, and parsed parts.
Reads a JSON file, adds a timestamp property, and prepares it for saving.
Uses path utilities to save the updated file into an output folder.
Converts the updated JSON into a buffer, prints its hex representation, and then converts it back into a normal string.
*/

let path = require('path');
let fs = require('fs');
console.log(__dirname);
console.log(__filename);
console.log(path.extname((__filename)));
let result = path.parse("/home/user/projects/task4.js")
console.log(result);

//read json file like text
 let filePath = path.join(__dirname, "file.json");
 let read = fs.readFileSync(filePath,'utf-8');


  // Ավելացնում ենք timestamp
 let obj = JSON.parse(read);
obj.timestap = new Date().toISOString();

let updateJson = JSON.stringify(obj, null);
console.log(updateJson);








