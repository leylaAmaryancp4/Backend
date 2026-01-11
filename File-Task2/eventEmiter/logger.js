/*Create a logger system that:
Defines events: info, warn, and error.
Writes messages into different log files using fs when the related event is triggered.
Demonstrates triggering all three event types.*/

const fs = require('fs');
const EventEmitter = require('events');
let path = require('path');
 const folder = './Logs';
 if(!fs.existsSync(folder)){
    fs.mkdirSync(folder)
}

class Mylogger extends EventEmitter{}
const logger = new Mylogger()
    
logger.on("info", (message)=>{
fs.appendFileSync(`${folder}/info.log`,message + '\n')
console.log("Info saved",message)
})

logger.on("warm",(message)=>{
    fs.appendFileSync(`${folder}/warm.log`, message + '\n')
    console.log("Warning saved", message)
})

logger.on("error",(message)=>{
    fs.appendFileSync(`${folder}/error.log`, message + '\n')
    console.log("Error saved", message)
} )
 
logger.emit("info","This is an info message");
logger.emit("warm", "This is an warning message");
logger.emit("error","This is a errorn message");


    
   




