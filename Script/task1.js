console.log(__dirname);
console.log(__filename);
console.log(require('path').extname(__filename));
console.log(require('path').join("src", "utils", "data.json"));
console.log(require('path').normalize("folder//subfolder/file.txt"))//folder sub folder/ file
console.log(require('path').normalize("folder/../other/file.txt"))//other\file.tst;


let path = require('path');
let parsed = path.parse("/home/user/projects/task1B.json")
console.log(parsed);

const formatted = path.format(parsed)
console.log(formatted);

