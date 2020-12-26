var mysql=require('mysql');
var pool=mysql.createPool({
    host:'localhost',
    port:8080,
    user:'root',
    password:'123',
    database:'doctors',
    connectionLimit:'1000'
});
module.exports=pool;

