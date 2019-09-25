const bcrypt = require('bcrypt');
const SQL = require('../database/index')
const authConfig = require('../config/auth.json')
const jwt = require('jsonwebtoken');
const { existsOrError} = require('../util/validate')

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400, /// expira em 1 dia, tempo em segundos
    });
}

const findById = async (req, res) => { //Buscar controlador por numero de serie
    try {

        const nserie = (parseInt(req.params.nserie))

        existsOrError(nserie, "nº de serie inválido!", res)

        const controlador = await SQL(`SELECT nserie,
                                       senha
                                  FROM controlador
                                 WHERE nserie = ${nserie}`)
        if (controlador)
            return res.status(200).send(controlador)

        return res.status(204).end()

    } catch (msg) {

        return res.status(500).send({ err: "Erro Interno", msg })

    }
};

const auth = async (req, res) => { //Autenticar Controlador
    try {

        const controlador = req.body

        existsOrError(controlador.nserie, "Numero de serie não Informado", res)
        existsOrError(controlador.senha, "Senha não Informada", res)
       

        const controladorFromDB = await SQL(`SELECT nserie,
                                             senha
                                        FROM controlador
                                       WHERE nserie = '${controlador.nserie}'`)
        if (!controladorFromDB)
            return res.status(400).send({ err: "Controlador não cadastrado!" })

        if (bcrypt.compareSync(controlador.senha, controladorFromDB.senha)) {
            controladorFromDB.senha = undefined
            return res.status(200).send({ ...controladorFromDB, token: generateToken({ nserie: controladorFromDB.nserie }) });
        }

        return res.status(400).send({ err: "Senha inválida!" })

    } catch (msg) {

        return res.status(500).send({ err: "Erro Interno", msg })

    }
};

const findAll = async (req, res) => { //Buscar todos controladores
    try {

        controladores = await SQL(`SELECT nserie,
                                          senha
                                 FROM controlador`)

        if (controladores)
            return res.status(200).send(controladores)

        return res.status(204).end()

    } catch (msg) {

        return res.status(500).json({ err: "Erro Interno", msg })
    }
};

const update = async (req, res) => { //Atualizar controlador
    try {

        const nserie = (parseInt(req.params.nserie))
        const controlador = req.body

        existsOrError(controlador.nserie, "numero de serie não informado", res)
        existsOrError(controlador.senha, "Senha não informado", res)

        data = await SQL(`UPDATE controlador
                             SET
                                 senha = '${controlador.senha}'
                           WHERE nserie = ${nserie}`)

        if (data.affectedRows)
            return res.status(200).end()

        return res.status(400).send({ err: "Não foi possivél atualizar", msg: data.message })

    } catch (msg) {

        return res.status(500).json({ err: "Erro Interno", msg })

    }
};

const save = async (req, res) => {
    try {
        let controlador = req.body;

        existsOrError(controlador.nserie, "Nº de serie não informado", res)
        existsOrError(controlador.senha, "Senha não informado", res)

        let controladorFromDB = await SQL(`SELECT nserie
                                        FROM controlador
                                       WHERE nserie = '${controlador.nserie}'`
        )

        if (controladorFromDB) {
            return res.status(400).send({ err: 'Controlador já cadastrado' });
        }

        controlador.senha = bcrypt.hashSync(controlador.senha, bcrypt.genSaltSync(10))

        controladorFromDB = await SQL(`INSERT INTO controlador(
                                            nserie,
                                            senha)
                                    VALUES(
                                            '${controlador.nserie}',
                                            '${controlador.senha}'
                                           )`)

        if (controladorFromDB.insertId)
            return res.status(200).end()

        return res.status(203).end()

    } catch (msg) {

        return res.status(500).send({ err: 'Erro Interno ', msg });

    }
};


module.exports = { findAll, findById, update, save, auth }