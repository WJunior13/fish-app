const mysql = require('mysql');

const execSQLQuery = sqlquery => {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '',
            database: 'fish'
        });
        connection.query(sqlquery, (error, results, fields) => {
            connection.end()
            if (error) {
                reject(error)
                return
            }
            resultquery = Array.isArray(results) ? results.length > 1 ? [...results] : results[0] : results;
            resolve(resultquery)
        })
    })
}



module.exports = execSQLQuery;