module.exports = function sendResponse(res, statusCode, data){
    res.writeHead(statusCode,{
        'content-Type':"application/json",
    })

    if(data !== undefined){
        res.end(JSON.stringify(data));
    }else{
        res.end();
    }



}