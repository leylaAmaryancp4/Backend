const jwt = require('jsonwebtoken');

function authenticate(req,res,next){

    const authHeader = req.headers.authorization;
    if(!authHeader)return res.status(401).send("Unauthorized");
    const token = authHeader.split(' ')[1];
    if(!token)return res.status(401).send("Unauthorized");

    // const token = authHeader.split('')[1];
    try{
        const user = jwt.verify(token,process.env.JWT_SECRET)
        req.user = user;
        next();
    }catch(err){
        res.status(401).send("Invalid token");
    }
}

module.exports = authenticate;

// Հավաքում ենք միայն token-ը, քանի որ հեդերը սովորաբար ունենում է «Bearer token» տեսքը:

// split(' ') բաժանում է հեդերը space-ով

// [1] ընտրում է երկրորդ մասը՝ իսկապես token-ը

1.  

/*jwt.verify(token, secret)

Ստուգում է, որ token-ը վավեր է

Կոդի մեջ process.env.JWT_SECRET պետք է լինի գաղտնի բանալին, որով ստեղծվել է token-ը

Եթե token-ը ճիշտ է, ստանում ենք user data (payload)*/

 2.

 /*req.user = user

Middleware-ը ավելացնում է request-ին օգտագործողի տվյալները

Այս տվյալները հետո կարող են օգտագործվել route handlers-ում, օրինակ՝ պարզելու ով է user-ը

next()

Անհրաժեշտ է, որպեսզի request-ը գնա հաջորդ middleware/route handler-ի մոտ

catch

Եթե token-ը սխալ է, ժամկետը անցել է, կամ ոչ վավեր, ուղարկում ենք 401՝ «Invalid token» */