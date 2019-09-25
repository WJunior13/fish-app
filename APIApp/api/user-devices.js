const SQL = require('../database/index')
const { existsOrError } = require('../util/validate')



const myDevices = async (req, res) => { //mostra configuraçao associados ao controlador
    try {
        const nserie = (parseInt(req.params.nserie))
        existsOrError(nserie, "numero de serie inválido", res)

        const devices = await SQL(`SELECT  time1, 
                                           time2,
                                           time3,
                                           tempmax,
                                           tempmin
                                     FROM configuracao 
                               INNER JOIN controlador_configuracao 
                                       ON controlador_configuracao .controlador_nserie = controlador.nserie_controlador 
                                    WHERE controlador_configuracao.nserie = ${nserie}`)

        if (devices)
            return res.status(200).send(devices)

        return res.status(400).send({ err: "Nenhum Controlador encontrado" })

    } catch (msg) {

        return res.status(500).send({ err: "Erro Interno", msg })

    }
};

const save = async (req, res) => { //ASSOCIA Configuraçao ao controlador
    try {
        const data = req.body;
        const nserie= (parseInt(req.params.nserie))

        existsOrError(nserie, "Nº de serie inválido", res)
        existsOrError(data.nserie, "Numero de série não informado", res)
        existsOrError(data.senha, "Senha não informado", res)

        let device = await SQL(`SELECT nserie
                                    FROM controlador
                                   WHERE nserie = ${data.nserie} 
                                     AND senha = ${data.senha}`)

        if (!device)
            return res.status(400).send({ err: "Numero de série ou senha inválidos!" })

        device = await SQL(`SELECT id
                              FROM controlador_configuracao
                             WHERE usuario_id = ${id} 
                               AND controlador_id = ${data.numeroSerie}`)

        if (device)
            return res.status(400).send({ err: "Controlador já esta cadastrado para este usuário" })

        device = await SQL(`INSERT INTO usuario_controlador
                                        (usuario_id,
                                        controlador_id,
                                        data_cadastro) 
                                 VALUES (${id},
                                        ${data.numeroSerie},
                                        NOW())`)
        if (device.affectedRows)
            return res.status(200).end()

        return res.status(400).send({ err: "Dados Invalidos" })

    } catch (msg) {

        res.status(500).send({ err: "Erro Interno", msg })

    }
};

const remove = async (req, res) => { //Deleta associaçao de controlador com usuario
    try {
        const data = req.body;
        const id = (parseInt(req.params.id))

        existsOrError(id, "id inválido", res)
        existsOrError(data.numeroSerie, "Numero de série não informado!", res)

        const device = await SQL(`DELETE FROM usuario_controlador
                                   WHERE usuario_id = ${id} 
                                     AND controlador_id = ${data.numeroSerie}`)

        if (device.affectedRows)
            return res.status(200).end()

        return res.status(400).send({ err: "Não foi possivél remover o dispositivo!" })

    } catch (msg) {

        res.status(500).send({ err: "Erro Interno", msg })

    }
};

module.exports = { save, remove, myDevices }