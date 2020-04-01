// 'use strict';
// const config = require('./src/config/common');

// const app = require('./src/app');

// const server = app.listen(config.port, config.ip, () => {
//   console.log('%s (%s) listening at http://%s:%s', config.serviceName, config.env, config.ip, config.port);
// });

// module.exports = {
//   app
// };
const mysql = require('mysql');

var config =
{
  username: 'batatinha',
  password: 'P3p3n0d3n9v9',
  database: 'rooms',
  host: 'room.database.windows.net',
  port: 1433,
  dialect: 'mysql'
};

const conn = new mysql.createConnection(config);

conn.connect(
	function (err) { 
	if (err) { 
		console.log("!!! Cannot connect !!! Error:");
		throw err;
	}
	else
	{
	   console.log("Connection established.");
           queryDatabase();
	}	
});

function queryDatabase(){
	  //  conn.query('DROP TABLE IF EXISTS inventory;', function (err, results, fields) { 
		// 	if (err) throw err; 
		// 	console.log('Dropped inventory table if existed.');
		// })
  	//    conn.query('CREATE TABLE inventory (id serial PRIMARY KEY, name VARCHAR(50), quantity INTEGER);', 
	  //     	function (err, results, fields) {
    //   			if (err) throw err;
		// 	console.log('Created inventory table.');
		// })
	  //  conn.query('INSERT INTO inventory (name, quantity) VALUES (?, ?);', ['banana', 150], 
    //   		function (err, results, fields) {
    //   			if (err) throw err;
		// 	else console.log('Inserted ' + results.affectedRows + ' row(s).');
	  //  	})
	  //  conn.query('INSERT INTO inventory (name, quantity) VALUES (?, ?);', ['orange', 154], 
    //   		function (err, results, fields) {
    //   			if (err) throw err;
		// 	console.log('Inserted ' + results.affectedRows + ' row(s).');
	  //  	})
	  //  conn.query('INSERT INTO inventory (name, quantity) VALUES (?, ?);', ['apple', 100], 
		// function (err, results, fields) {
    //   			if (err) throw err;
		// 	console.log('Inserted ' + results.affectedRows + ' row(s).');
	  //  	})
	  //  conn.end(function (err) { 
		// if (err) throw err;
		// else  console.log('Done.') 
		// });
};