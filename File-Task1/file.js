const fs = require('fs');  
const filePath = "example.txt";


if(!fs.existsSync(filePath)){
    console.log("File not exist.creating file...");
     fs.writeFileSync(filePath,"");//Create an empty file
}else{
console.log("File exists.");
} 

//Write and read  text into the file (overwrite)
fs.writeFileSync(filePath,"Hello my friend");
let filecontent = fs.readFileSync(filePath,"utf8")
console.log(filecontent);


//append new line

fs.appendFileSync(filePath, "  This is append line.")
filecontent  = fs.readFileSync(filePath,"utf8");
console.log(filecontent);

//delete a file at the end of execution.
fs.unlinkSync(filePath);
console.log("Deleted successfully");






