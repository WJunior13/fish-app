const SQL = require('../database/index')
const { existsOrError } = require('../util/validate')



const myDevices = async (req, res) => { //mostra controladores associados ao usuario
    try {
        const id = (parseInt(req.params.id))
        existsOrError(id, "id inválido", res)

        const devices = await SQL(`SELECT numero_serie, 
                                          descricao
                                     FROM controlador
                               INNER JOIN usuario_controlador 
                                       ON usuario_controlador.controlador_id = controlador.numero_serie 
                                    WHERE usuario_controlador.usuario_id = ${id}`)

        if (devices)
            return res.status(200).send(devices)

        return res.status(400).send({ err: "Nenhum Controlador encontrado" })

    } catch (msg) {

        return res.status(500).send({ err: "Erro Interno", msg })

    }
};

const save = async (req, res) => { //ASSOCIA Controlador ao usuario
    try {
        const data = req.body;
        const id = (parseInt(req.params.id))

        existsOrError(id, "id inválido", res)
        existsOrError(data.numeroSerie, "Numero de série não informado", res)
        existsOrError(data.descricao, "descricao não informado", res)

        let device = await SQL(`SELECT id
                                    FROM controlador
                                   WHERE numero_serie = ${data.numeroSerie} 
                                     AND descricao = ${data.descricao}`)

        if (!device)
            return res.status(400).send({ err: "Numero de série ou descricao inválidos!" })

        device = await SQL(`SELECT id
                              FROM usuario_controlador
                             WHERE usuario_id = ${id} 
                               AND controlador_id = ${data.numeroSerie}`)

        if (device)
            return res.status(400).send({ err: "Controlador já esta cadastrado para este usuário" })

        device = await SQL(`INSERT INTO usuario_controlador
                                        (usuario_id,
                                        controlador_id) 
                                 VALUES (${id},
                                        ${data.numeroSerie}`)
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