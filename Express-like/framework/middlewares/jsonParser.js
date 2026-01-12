function jsonParser(){
    return(req,res,next)=>{
        if(!['POST','PUT','PUTCH'].includes(req.method))return next()

            const type = req.headers['content-type'] ||'';
            if(!type.includes('application/json'))return next();

            let body = '';
             req.on('data', chunk=>{
                body += chunk;
             })

             req.on('end',()=>{
               if(!body){
                req.body = {};
                return next()
               }

               try{
                req.body = JSON.parse(body);
                next();

               }catch{
                res.status(400).json({error: 'Invalid JSON'})              
 }
            
})
    }
}

module.exports = jsonParser