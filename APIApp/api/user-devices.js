const SQL = require('../database/index')
const { existsOrError } = require('../util/validate')



const myDevices = async (req, res) => { //mostra controladores associados ao usuario
    try {
        const id = (parseInt(req.params.id))
        existsOrError(id, "id inválido", res)

        const devices = await SQL(`
 select configuracao.temp_min tempMin,
        configuracao.tem_max temMax,
        configuracao.time1,
        configuracao.time2,
        configuracao.time3,
        configuracao.id idConfiguracao,
        controlador.id idControlador,
        controlador.numero_serie numeroSerie,
        usuario_controlador.descricao descricaoControlador
   FROM
        configuracao,
        controlador,
        usuarios,
        usuario_controlador
  where configuracao.id = controlador.configuracao_id
    and usuario_controlador.controlador_id = controlador_id
    and usuario_controlador.usuario_id = usuarios.id
    and usuarios.id = ${id}`)

        if (devices)
            return res.status(200).send(Array.isArray(devices)? devices : [devices])

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
                                   WHERE numero_serie = ${ data.numeroSerie } 
                                     AND descricao = ${ data.descricao }`)

        if (!device)
            return res.status(400).send({ err: "Numero de série ou descricao inválidos!" })

        device = await SQL(`SELECT id
                              FROM usuario_controlador
                             WHERE usuario_id = ${ id } 
                               AND controlador_id = ${ data.numeroSerie }`)

        if (device)
            return res.status(400).send({ err: "Controlador já esta cadastrado para este usuário" })

        device = await SQL(`INSERT INTO usuario_controlador
            (usuario_id,
                controlador_id) 
                                 VALUES(${ id },
                    ${ data.numeroSerie }`)
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
                                   WHERE usuario_id = ${ id } 
                                     AND controlador_id = ${ data.numeroSerie }`)

        if (device.affectedRows)
            return res.status(200).end()

        return res.status(400).send({ err: "Não foi possivél remover o dispositivo!" })

    } catch (msg) {

        res.status(500).send({ err: "Erro Interno", msg })

    }
};

module.exports = { save, remove, myDevices }