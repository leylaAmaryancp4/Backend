require('dotenv').config({quiet:true});

const settings ={
    PORT:process.env.PORT,
    DB_HOST:process.env.DB_HOST || process.env.DB_LOCALHOST,
    DB_PORT:process.env.DB_PORT,
    DB_NAME:process.env.DB_NAME,
    DB_USER:process.env.DB_USER,
    DB_DEFAULT_NAME:process.env.DB_DEFAULT_NAME,
    DB_PASSWORD:process.env.DB_PASSWORD
}


module.exports = settings;

