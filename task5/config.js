 const PORT = 3000;
const database_URL = "mongodb://localhost:27017/myapp";
const isProduction  = false;


 function getEnvironmentInfo(){
    return `Port is ${PORT}, URL is ${database_URL}, Production${isProduction}`;
 }
 module.exports = {
    PORT,
    database_URL,
    isProduction,
    getEnvironmentInfo
 }
