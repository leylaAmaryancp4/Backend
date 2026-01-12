function urlencodedParser(){
    return (req,res,next)=>{
        if(!["POST","PUT", "PATCH"].includes(req.method))return next();

        const type = req.headers['content-type'] ||'';
        if(!type.includes('application/x-www-form-urlencoded'))return next()

            let body = '';
            req.on('data',chunk=>{
                body += chunk;
                
            })

            req.on('end',()=>{
                if(!body){
                    req.body = {}
                    return next()
                }

                const params = new URLSearchParams(body);
                req.body = Object.fromEntries(params.entries())
                next();
            })
    }
}

module.exports = urlencodedParser;