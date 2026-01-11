const fs = require('fs');
const path = require('path');
   
function readJSON(file){
    const filePath = path.join(__dirname, '..', 'data',file);
    if(!fs.existsSync(filePath))return [];
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function writeJSON(file,data){
    const filePath = path.join(__dirname, '..', 'data', file);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

}

module.exports ={readJSON,writeJSON};

// 1.Կարդում է JSON ֆայլեր → readJSON('tasks.json') վերադարձնում է տվյալները որպես JavaScript զանգված կամ օբյեկտ։

// 2.Գրում է JSON ֆայլեր → writeJSON('tasks.json', data) պահում է տվյալները ֆայլում։

// 3.Օգտագործելի է ուրիշ ֆայլերում → կարող ես import անել ու օգտագործել տվյալ ֆունկցիաները: