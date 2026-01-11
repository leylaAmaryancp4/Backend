const Logger = require("./logger");
const logger = new Logger();

console.log("Logger started...\nGenerating log events...\n");

// Emit log events
logger.emit("info", "Application started");
logger.emit("info", "User logged in");
logger.emit("warn", "User attempted restricted action");
logger.emit("error", "Database connection failed");
logger.emit("info", "Application finished work");

console.log("Logs created in /logs folder.");