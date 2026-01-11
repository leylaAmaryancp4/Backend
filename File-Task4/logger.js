const fs = require("fs");
const EventEmitter = require("events");

class Logger extends EventEmitter {
    constructor() {
        super();

        // Create logs folder if not exists
        if (!fs.existsSync("logs")) {
            fs.mkdirSync("logs");
        }

        // Listen to events
        this.on("info", (msg) => this.writeLog("info.log", msg));
        this.on("warn", (msg) => this.writeLog("warn.log", msg));
        this.on("error", (msg) => this.writeLog("error.log", msg));
    }

    writeLog(filename, message) {
        const fullMessage = `${new Date().toISOString()} - ${message}\n`;
        fs.appendFile(`logs/${filename}`, fullMessage, (err) => {
            if (err) console.log("Error writing log:", err);
        });
    }
}

module.exports = Logger;
