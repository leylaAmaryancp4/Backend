//1. Resolve Module Path

const path = require('path');//Verifies file existence



console.log(path.basename(__filename))//path.js
console.log(path.dirname(__filename))//C:\Users\leyla\OneDrive\Skrivbord\Backend
console.log(path.parse(__filename))/*
  root: 'C:\\',
  dir: 'C:\\Users\\leyla\\OneDrive\\Skrivbord\\Backend',
  base: 'path.js',
  ext: '.js',
  name: 'path'
}
  */

console.log(path.extname('path.js'))//.js
console.log(path.join(__dirname, 'library', 'services', 'libraryService.js'))//C:\Users\leyla\OneDrive\Skrivbord\Backend\library\services\libraryService.js
console.log(path.resolve('library', 'services', 'libraryService.js'))//Converts relative → absolute path

console.log("After caching");
 let res = require.cache;
 console.log(res);
