const SQL = require('../database/index')
const { existsOrError } = require('../util/validate')

const findAll = async (req, res) => { //Traz todos os controladores cadastrados
    try {
        const devices = await SQL(`SELECT numero_serie,
                                          descricao
                                     FROM controlador`)

        existsOrError(devices, "Nenhum Controlador cadastrado", res)

        return res.status(200).send(devices)

    } catch (msg) {

        res.status(500).json({ erro: "Erro Inteiro", msg })

    }
}

const lastedData = async (req, res) => { //Ultimo dado recebido
    try {
        const nsDevice = parseInt(req.params.id)
        existsOrError(nsDevice, "id inválido!", res)

        const filters = req.query
        if (filters.limit) {
            // TRATAMENTO DOS FILTROS
            return res.send({ err: "filtros nao tratados" })
        }

        const data = await SQL(`SELECT temp_min,
                                       temp_max,
                                       time1,
                                       time2,
                                       time3  
                                  FROM NS_${nsDevice} 
                                 WHERE id = 1`)

        existsOrError(data, "Não foi possivél buscar as infrmaçoes!", res)

        return res.status(200).send(data)

    } catch (msg) {
        res.status(500).json({ err: "Erro Interno", msg })
    }
}

const setSituation = async (req, res) => { //Altera situação do device
    try {
        const data = req.body;

        existsOrError(data.numeroSerie, "Numero de série não informado!", res)
        existsOrError(data.descricao, "descricao não informado!", res)
        
        const device = await SQL(`UPDATE controlador
                                     SET descricao = '${data.descricao}' 
                                   WHERE numero_serie = ${data.numeroSerie}`)

        if (device.affectedRows)
            return res.status(200).end()

        return res.status(400).send({ err: "Não foi possivél atualizar !" })

    } catch (msg) {

        res.status(500).send({ err: "Erro Interno", msg })

    }
};
 const saveConfiguracao= async (req,res)=>{
         const id= req.params.id
         try{
           await SQL(`UPDATE configuracao 
                 SET temp_max = "${controlador.temp_max}", 
                 SET tem_min = "${controlador.temp_min}", 
                 SET time1 = "${controlador.time1}",
                 SET time2 = "${controlador.time2}",
                 SET time3 = "${controlador.time3}"
                 where id = ${id}`)
         }catch(err){

         }
 };
 const save = async (req, res) => {
    try {
        let controlador = req.body;

        existsOrError(controlador.descricao, "Descrição não informado", res)
        existsOrError(controlador.nserie, "nserie não informado", res)

        let controllerFromDB = await SQL(`SELECT numero_serie
                                        FROM controlador
                                       WHERE numero_serie = '${controlador.nserie}'`
        )

        if (controllerFromDB) {
            return res.status(400).send({ err: 'Controlador já cadastrado' });
        }

        const {insertId} = await SQL(`INSERT INTO configuracao VALUES(null, "teste", "18", "21", "0","0", "0")`)
        
        controllerFromDB = await SQL(`INSERT INTO controlador(
                                            descricao,
                                            numero_serie,
                                            configuracao_id)
                                    VALUES(
                                            '${controlador.descricao}',
                                            '${controlador.nserie}',
                                            '${insertId}'
                                           )`)

        if (controllerFromDB.insertId)
            return res.status(200).end()

        return res.status(203).end()

    } catch (msg) {

        return res.status(500).send({ err: 'Erro Interno ', msg });

    }
};
const saveData = (req, res) => { //salva novo ou atualiza o antigo
    const controlador = req.body;
    try {
        SQL(`SELECT data 
           FROM ns_${controlador.id}
       ORDER BY data DESC LIMIT 1`)
            .then(dado => {
                let data = new Date(dado.data)
                let dataAtual = new Date

                if ((data.getMinutes() + 5 <= dataAtual.getMinutes()) || (data.getHours() != dataAtual.getHours())) { // salva novo dado a cada 5 minutos
                    SQL(`INSERT INTO NS_${controlador.wifi_ns}
                     VALUES ('',
                            NOW(), 
                            ${controlador.temp_max}, 
                            ${controlador.temp_min}, 
                            ${controlador.time1},
                            ${controlador.time2},
                            ${controlador.time3})`)
                } // Atualiza id 1, tempo real
                SQL(`UPDATE NS_${controlador.wifi_ns} 
                    SET data = NOW(),
                    ${controlador.temp_max}, 
                    ${controlador.temp_min}, 
                    ${controlador.time1},
                    ${controlador.time2},
                    ${controlador.time3}
                  WHERE id = 1`)
                    .then(data => {
                        res.status(200).json({ save: "SUCESS" })
                    })
                    .catch(err => {
                        res.status(400).json({ save: err })
                    })
            }) // se nao existir a taela cria nova
            .catch(err => {
                SQL(`CREATE TABLE IF NOT EXISTS NS_${controlador.wifi_ns} (
                id int(11) NOT NULL AUTO_INCREMENT,
                data datetime DEFAULT NOW(),
               
            
                PRIMARY KEY (id)
              )`) // Cria nova tabela se nao existir no banco(NOVO CONROLADOR)
                    .then(data => {
                        SQL(`INSERT INTO ns_${controlador.wifi_ns} 
                                     (data)
                         VALUES ('NOW()')`)
                            .then(
                                SQL(`INSERT INTO controlador 
                                                 (numero_serie,
                                                 descricao)
                                          VALUES (${controlador.wifi_ns},
                                                 ${controlador.wifi_senha},
                                                 'L',
                                                 NOW())`) // Insere na tabela controladores um NOVO CONROLADOR
                                    .then(res.status(200).json({ save: "SUCESS", create: `NS_${controlador.wifi_ns}` }))
                            )
                    })
                    .catch(err => {
                        res.status(400).json({ save: err })
                    })
            })
    } catch (err) {
        res.send({ err: "erro" })
    }
}

module.exports = { findAll, lastedData, saveData, setSituation , save}