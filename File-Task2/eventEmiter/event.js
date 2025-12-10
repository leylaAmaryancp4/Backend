const EventEmitter = require("events");

class MyProcess extends EventEmitter{
    start(){
        console.log("process started.");
        this.emit("start")

    }
    finish(){
        console.log("process finised.");
        this.emit("finish")
    }
        
}

let obj = new MyProcess();
obj.on("start",()=>{
    console.log("Listner: start event received")
})

obj.on("finish", ()=>{
    console.log("Listner: finish event received");
})

obj.start();
setTimeout(()=>{
    obj.finish();
}, 2000);