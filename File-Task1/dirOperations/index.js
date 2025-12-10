const fs = require("fs");
const folder = "logs";
// creates 3 files and Writes a different message into each of the three files.
const files =  [
    {name:"info.log", message:"Hello file info.log"}, 
        {name:"warning.log", message:"Hello file warning.log"}, 
            {name:"error.log", message:"Hello file error.log"}
]

if(!fs.existsSync(folder)){
    fs.mkdirSync(folder);
    console.log("Folder created", folder);
}else{
    console.log("folder exists")
}

//Inside the folder, creates three files: info.log, warning.log, and error.log.
files.forEach(file=>{
    fs.writeFileSync(`${folder}/${file.name}`, file.message);
  })

 //Reads the folder and prints all filenames.
  let fileNames = fs.readdirSync(folder)
  console.log("In folder are 3 files", fileNames); 

  // Deletes all files and removes the logs folder.
   files.forEach(file=>{
    fs.unlinkSync(`${folder}/${file.name}`)
   })

   fs.rmdirSync(folder);
   console.log("Folder deleted successfuly");

   




  

