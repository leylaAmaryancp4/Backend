const {User, validateUser, ROLES} = require('./userService.js');
const user = new User("Anna Doe", "Anna@example.com", "student");
const isValidate = validateUser(user);
console.log("Is user valid? ", isValidate);
console.log(user.getInfo());
console.log("Available rols", ROLES.join(","));