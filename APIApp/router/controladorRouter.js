var express = require('express');
var router = express.Router();
const execSQLQuery = require('../banco/dbConexao');


router.post('/cadastro',(req, res) => { 
    const {nserie,senha } = req.body
    let query = `INSERT INTO controlador(nserie,senha) VALUES("${nserie}","${senha}")`
    execSQLQuery(query, res);
});
	

router.get('/cadastro/:nserie?', (req, res) => {  
    let filter = '';
    if (req.params.nserie) filter = ' WHERE nserie=' + parseInt(req.params.nserie);
    execSQLQuery(`SELECT * FROM controlador ${filter}`, res);
});

router.delete('/cadastro/:nserie', (req, res) =>{
    execSQLQuery('DELETE FROM controlador WHERE nserie=' + parseInt(req.params.nserie), res);
});


router.patch('/cadastro/:nserie', (req, res) =>{
    const senha = req.body.senha;
    const nserie = req.body.nserie;
    execSQLQuery(`UPDATE controlador SET senha='${senha}' WHERE nserie='${nserie}' `, res);
})

 


module.exports = router;