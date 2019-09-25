const bcrypt = require('bcrypt');
const SQL = require('../database/index')
const authConfig = require('../config/auth.json')
const jwt = require('jsonwebtoken');
const { existsOrError, validateEmail } = require('../util/validate')

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400, /// expira em 1 dia, tempo em segundos
    });
}

const findById = async (req, res) => { //Buscar usuário por id
    try {

        const id = (parseInt(req.params.id))

        existsOrError(id, "id inválido!", res)

        const user = await SQL(`SELECT id,
                                       nome,
                                       email,
                                       telefone,
                                       data_cadastro dataCadastro,
                                       data_modificacao dataModificacao
                                  FROM usuarios
                                 WHERE ID = ${id}`)
        if (user)
            return res.status(200).send(user)

        return res.status(204).end()

    } catch (msg) {

        return res.status(500).send({ err: "Erro Interno", msg })

    }
};

const auth = async (req, res) => { //Autenticar Usuário
    try {

        const user = req.body

        existsOrError(user.email, "E-mail não Informado", res)
        existsOrError(user.senha, "Senha não Informada", res)
        validateEmail(user.email, "E-mail em formato inválido!", res)

        const userFromDB = await SQL(`SELECT id,
                                             nome,
                                             email,
                                             senha,
                                             telefone,
                                             data_cadastro dataCadastro,
                                             data_modificacao dataModificacao
                                        FROM usuarios
                                       WHERE email = '${user.email}'`)
        if (!userFromDB)
            return res.status(400).send({ err: "Usuário não cadastrado!" })

        if (bcrypt.compareSync(user.senha, userFromDB.senha)) {
            userFromDB.senha = undefined
            return res.status(200).send({ ...userFromDB, token: generateToken({ id: userFromDB.id }) });
        }

        return res.status(400).send({ err: "Senha inválida!" })

    } catch (msg) {

        return res.status(500).send({ err: "Erro Interno", msg })

    }
};

const findAll = async (req, res) => { //Buscar todos os usuarios
    try {

        users = await SQL(`SELECT id,
                                  nome,
                                  email,
                                  telefone,
                                  data_cadastro dataCadastro,
                                  data_modificacao dataModificacao
                             FROM usuarios`)

        if (users)
            return res.status(200).send(users)

        return res.status(204).end()

    } catch (msg) {

        return res.status(500).json({ err: "Erro Interno", msg })
    }
};

const update = async (req, res) => { //Atualizar usuario
    try {

        const id = (parseInt(req.params.id))
        const user = req.body

        existsOrError(id, "id não informado ou inválido", res)
        existsOrError(user.nome, "Nome não informado", res)
        existsOrError(user.email, "E-mail não informado", res)
        validateEmail(user.email, "E-mail em formato inválido!", res)
        existsOrError(user.telefone, "Telefone não informado", res)
        existsOrError(user.endereco, "Endereço não informado", res)
        existsOrError(user.senha, "Senha não informado", res)

        data = await SQL(`UPDATE usuarios
                             SET nome ='${user.nome}',
                                 email = '${user.email}',
                                 telefone = '${user.telefone}',
                                 endereco = '${user.endereco}',
                                 senha = '${user.senha}',
                                 data_modificacao = NOW()
                           WHERE id = ${id}`)

        if (data.affectedRows)
            return res.status(200).end()

        return res.status(400).send({ err: "Não foi possivél atualizar", msg: data.message })

    } catch (msg) {

        return res.status(500).json({ err: "Erro Interno", msg })

    }
};

const save = async (req, res) => {
    try {
        let user = req.body;

        existsOrError(user.nome, "Nome não informado", res)
        existsOrError(user.email, "E-mail não informado", res)
        validateEmail(user.email, "E-mail em formato inválido!", res)
        existsOrError(user.telefone, "Telefone não informado", res)
        existsOrError(user.endereco, "Endereço não informado", res)
        existsOrError(user.senha, "Senha não informado", res)

        let userFromDB = await SQL(`SELECT email
                                        FROM usuarios
                                       WHERE email = '${user.email}'`
        )

        if (userFromDB) {
            return res.status(400).send({ err: 'Usuário já cadastrado' });
        }

        user.senha = bcrypt.hashSync(user.senha, bcrypt.genSaltSync(10))

        userFromDB = await SQL(`INSERT INTO usuarios(
                                            nome,
                                            email,
                                            senha,
                                            telefone,
                                            endereco,
                                            data_cadastro)
                                    VALUES(
                                            '${user.nome}',
                                            '${user.email}',
                                            '${user.senha}',
                                            '${user.telefone}',
                                            '${user.endereco}',
                                            NOW()
                                           )`)

        if (userFromDB.insertId)
            return res.status(200).end()

        return res.status(203).end()

    } catch (msg) {

        return res.status(500).send({ err: 'Erro Interno ', msg });

    }
};

const remove = async (req, res) => { //deletar um usuario
    try {

        const id = (parseInt(req.params.id))

        existsOrError(id, "id inválido", res)

        const data = await SQL(`DELETE 
                                  FROM usuarios
                                 WHERE id = ${id}`)

        if (data.affectedRows)
            return res.status(200).end()

        return res.status(400).send({ err: "Não foi possivél excluir", msg: data })

    } catch (msg) {

        return res.status(500).send({ err: "Erro Interno", msg })

    }
};

module.exports = { findAll, findById, update, save, remove, auth }