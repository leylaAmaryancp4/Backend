const http = require('http');
const {url} = require('url');
 function createApp(){
    const middlewares = [];

    function use(fn){
        middlewares.push({fn});
    }

    function matchPath(routePath, reqPath){
        const routeParts = routePath.split('/').filter(Boolean);
        const reqParts = reqPath.split('/').filter(Boolean)

        if(routeParts.length !== reqParts.length)return null;

        const params = {};

        for(let i = 0; i < routeParts.length; i++){
            if(routeParts[i].startsWith(':')){
                params[routeParts[i].slice(1)] = reqParts[i];
            }else if(routeParts[i] !== reqParts[i]){
                return null;
            }
        }
        return params
    }

    function addRoute(method, path, handlers){
        use((req,res,next)=>{
            if(req.method !== method)return next();

            const params = matchPath(path,req.path);
            if(!params)return next();
             req.params = params;

             let i = 0;

             function run(){
                const handler = handlers[i++];
                     if(!handler)return next();
                     handler(req,res,run);
                
             }

             run();
        })
    }

    function handleRequest(req,res){
        const url = new URL(req.url, `http://${req.headers.host}`);
        req.path = url.pathname;
        req.query = Object.fromEntries(url.searchParams.entries());
        req.params = {};

        res.status = function(code){
            res.statusCode = code;
            return res;
        }
         res.set = function(name,value){
            res.setHeader(name, value);

            return res;
         }

         res.json = function(obj){
            if(!res.getHeader('Content-Type')){
                res.setHeader('Content-Type','application/json')
            }
            res.end(JSON.stringify(obj));

         }

         res.send = function(body){
            if(typeof body === 'object'){
                return res.json(body);
            }

            res.end(body);
         }

         let index = 0;
         let error = null;

         function next(err){
            if(res.writableEnded)return;

            if(err)error = err;

            const layer = middlewares[index++];
            if(!layer){
                if(error){
                    res.status(500).send('Internal Server error');

                }else{
                    res.status(404).send('Not found')
                }
                return;
            }

            const fn = layer.fn;

            try{
                if(error){
                    if(fn.length === 4){
                        fn(error,req,res,next);
                }else{
                    next(error);
                }
            }else{
                if(fn.length < 4){
                    fn(req,res,next)
                }else{
                    next();
                }
            }

         }catch(e){
            next(e);
         }
    }
    next();
}

function listen(port, cb){
    const server = http.createServer(handleRequest)
    server.listen(port,cb)
}

return{
    use,
    get:(p, ...h)=>addRoute('GET',p,h),
    post:(p,...h)=>addRoute('POST', p, h),
    put:(p, ...h)=>addRoute('PUT',p,h),
    delete:(p,...h)=>addRoute('DELETE',p,h),
    listen,


}
 }


 module.exports = createApp;

