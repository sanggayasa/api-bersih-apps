const mysql = require('mysql');

const conn = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"",
	database:"bersih_db"
});

conn.connect((err)=>{
	if(err) throw err;
	console.log("koneksi berhasil");
});

module.exports = conn;
