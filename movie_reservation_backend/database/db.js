const settings = require('../config')
const {Client}= require('pg')
const {Pool} = require('pg')


const ifDBExists = async()=>{
    
const client = new Client({
   host:settings.DB_HOST,
    port:settings.DB_PORT,
    database:settings.DB_DEFAULT_NAME,
     user:settings.DB_USER,
    password:settings.DB_PASSWORD,

})

try{
    await client.connect();
    const result = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`,[settings.DB_NAME])
    console.log(result.rowCount)
    if(!result.rowCount){
        await client.query(`Create database ${settings.DB_NAME}`);
    }
}catch(err){
    console.log(err.message)
}finally{
    await client.end()
}
}

const initDB = ()=>{
    
    try{
        const pool =  new Pool({
    host:settings.DB_HOST,
    port:settings.DB_PORT,
    database:settings.DB_NAME,
     user:settings.DB_USER,
    password:settings.DB_PASSWORD,

        })
        return pool;

    }catch(err){
        console.log(err.message)
    }
}

module.exports = { ifDBExists, initDB };
