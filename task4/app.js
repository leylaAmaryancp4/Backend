let obj = require('./utils');
const today = new Date();
console.log("Formated date:", obj.date.formatDate(today));
console.log("Random number between 1 and 10:", obj.random.randomInt(1, 10));
obj.logger.log("This is a logg message");