//mysql connection
const mysql = require('mysql');

const connectDb = () => {
	const connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'bersih_db',
	});

	connection.connect(function (err) {
		if (err) {
			console.log('something wrong with mysql database connection');

			connection.end();
		}
	});
};

module.exports = connectDb;
