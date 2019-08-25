const execSQLQuery = (sqlQry, res) => {
  const mysql = require('mysql');
  const connection = mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '',
      database: 'fish'
  });

  connection.query(sqlQry, (error, results, fields) => {
       console.log(sqlQry)
      if (error)
          res.json(error);
      else
      if (results[0])
          res.json(results);
      else
          res.json({ erro: 'Request Ok'})
      connection.end();
      //console.log('executou!');
  });
}



module.exports = execSQLQuery;