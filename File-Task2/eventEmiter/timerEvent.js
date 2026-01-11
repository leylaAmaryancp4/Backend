/*Create a script that:
Emits a tick event every second.
After 5 ticks, emits a done event.
Stops the timer when the done event is emitted.
*/
const EventEmitter = require("events");

class MyTimer extends EventEmitter{
    start(){
       let count = 0;
const intervalId = setInterval(()=>{
    count++;
    this.emit("tick", count);
    if(count === 5){
        this.emit("done")
    }
},1000)
this.on("done", ()=>{
    clearInterval(intervalId);
    console.log("Timer stopped");
})
    }
}

const obj = new MyTimer();
obj.on("tick", (count)=>{
    console.log(`Tick:${count}`)
})
    obj.on("done",()=>{
        console.log(" done event emitted")

})
obj.start();


