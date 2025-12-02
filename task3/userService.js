class User{
    constructor(name, email, role){
        this.name = name;
        this.email = email;
        this.role = role;
        
    }
    getInfo() {
    return `${this.name} (${this.email})  Role: ${this.role}`;
  }
}


function validateUser(user){
if(!user.name || !user.email || !user.role){
    return false;
} 
if(!ROLES.includes(user.role)) {
    return false;
}
return true;
}


const ROLES = ["student", "admin"]

module.exports = {User, validateUser, ROLES}; 



