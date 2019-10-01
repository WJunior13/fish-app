const bcrypt = require('bcrypt');
const SQL = require('../database/index')
const authConfig = require('../config/auth.json')
const jwt = require('jsonwebtoken');
const { existsOrError } = require('../util/validate')


const findById = async (req, res) => { //Buscar controlador por numero de serie
    try {

        const nserie = (parseInt(req.params.nserie))

        existsOrError(nserie, "nº de serie inválido!", res)

        const controlador = await SQL(`SELECT nserie,
                                              descricao
                                  FROM controlador
                                 WHERE nserie = ${nserie}`)
        if (controlador)
            return res.status(200).send(controlador)

        return res.status(204).end()

    } catch (msg) {

        return res.status(500).send({ err: "Erro Interno", msg })

    }
};

const findAll = async (req, res) => { //Buscar todos controladores
    try {

        controladores = await SQL(`SELECT nserie,
                                          descricao
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
        existsOrError(controlador.descricao, "descricao não informado", res)
      
       

        data = await SQL(`UPDATE controlador
                             SET
                                descricao='${controlador.descricao}'
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
        existsOrError(controlador.decricao, "descricao nao informada", res)

        let controladorFromDB = await SQL(`SELECT nserie
                                        FROM controlador
                                       WHERE nserie = '${controlador.nserie}'`
        )

        if (controladorFromDB) {
            return res.status(400).send({ err: 'Controlador já cadastrado' });
        }


        controladorFromDB = await SQL(`INSERT INTO controlador(
                                            nserie,
                                            descricao)
                                    VALUES(
                                            '${controlador.nserie}',
                                            '${controlador.descricao}'
                                           )`)

        if (controladorFromDB.insertId)
            return res.status(200).end()

        return res.status(203).end()

    } catch (msg) {

        return res.status(500).send({ err: 'Erro Interno ', msg });

    }
};


module.exports = { findAll, findById, update, save}