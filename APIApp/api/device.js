const SQL = require('../database/index')
const { existsOrError } = require('../util/validate')

const findAll = async (req, res) => { //Traz todos os controladores cadastrados
    try {
        const devices = await SQL(`SELECT numero_serie numeroSerie,
                                          senha_serie senha,
                                          situacao,
                                          data_cadastro dataCadastro
                                     FROM controladores`)

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

        const data = await SQL(`SELECT data,
                                       temperatura temp,
                                       temperatura_ajuste tempAjst,
                                       umidade umid,
                                       umidade_ajuste umidAjst,
                                       sts_ventoinha ventoinha,
                                       sts_alarme alarme,
                                       modo_trabalho modoTrabalho,
                                       sts_trava trava,
                                       fase,
                                       clima,
                                       tipo_sensor tipoSensor,
                                       versao_soft versaoSoftware,
                                       sts_falta_energia energia
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
        existsOrError(data.senha, "Numero de série não informado!", res)
        existsOrError(data.situacao, "Situação não informada!", res)

        const device = await SQL(`UPDATE controladores
                                     SET situacao = '${data.situacao}',
                                         data_modificacao = NOW() 
                                   WHERE numero_serie = ${data.numeroSerie} 
                                     AND senha_serie = ${data.senha}`)

        if (device.affectedRows)
            return res.status(200).end()

        return res.status(400).send({ err: "Não foi possivél atualizar !" })

    } catch (msg) {

        res.status(500).send({ err: "Erro Interno", msg })

    }
};

const saveData = (req, res) => { //salva novo ou atualiza o antigo
    const controlador = req.params;
    try {
        SQL(`SELECT data 
           FROM ns_${controlador.wifi_ns}
       ORDER BY data DESC LIMIT 1`)
            .then(dado => {
                let data = new Date(dado.data)
                let dataAtual = new Date

                if ((data.getMinutes() + 5 <= dataAtual.getMinutes()) || (data.getHours() != dataAtual.getHours())) { // salva novo dado a cada 5 minutos
                    SQL(`INSERT INTO NS_${controlador.wifi_ns}
                     VALUES ('',
                            NOW(), 
                            ${controlador.temp}, 
                            ${controlador.temp_ajt}, 
                            ${controlador.umid}, 
                            ${controlador.umid_ajt}, 
                            ${controlador.sts_ventoinha},
                            ${controlador.sts_alarme},
                            ${controlador.modo_trabalho},
                            ${controlador.sts_trava},
                            ${controlador.fase},
                            ${controlador.clima},
                            ${controlador.tp_sensor},
                            ${controlador.wifi_ns},
                            ${controlador.wifi_senha},
                            '${controlador.versao_soft}',
                            ${controlador.falta_energia}
                            )`)
                } // Atualiza id 1, tempo real
                SQL(`UPDATE NS_${controlador.wifi_ns} 
                    SET data = NOW(),
                        temperatura = ${controlador.temp},
                        temperatura_ajuste = ${controlador.temp_ajt}, 
                        umidade = ${controlador.umid}, 
                        umidade_ajuste = ${controlador.umid_ajt}, 
                        sts_ventoinha = ${controlador.sts_ventoinha}, 
                        sts_alarme = ${controlador.sts_alarme},
                        modo_trabalho = ${controlador.modo_trabalho},
                        sts_trava = ${controlador.sts_trava}, 
                        fase = ${controlador.fase}, 
                        clima =${controlador.clima}, 
                        tipo_sensor = ${controlador.tp_sensor}, 
                        wifi_ns = ${controlador.wifi_ns}, 
                        wifi_senha = ${controlador.wifi_senha}, 
                        versao_soft = '${controlador.versao_soft}', 
                        sts_falta_energia = ${controlador.falta_energia} 
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
                temperatura int(6) DEFAULT 0,
                temperatura_ajuste int(6) DEFAULT 0,
                umidade int(6) DEFAULT 0,
                umidade_ajuste int(6) DEFAULT 0,
                sts_ventoinha int(3) DEFAULT 0,
                sts_alarme int(3) DEFAULT 0,
                modo_trabalho int(3) DEFAULT 0,
                sts_trava int(3) DEFAULT 0,
                fase int(3) DEFAULT 0,
                clima int(3) DEFAULT 0,
                tipo_sensor int(3) DEFAULT 0,
                wifi_ns int(8) DEFAULT 0,
                wifi_senha int(8) DEFAULT 0,
                versao_soft varchar(30) DEFAULT 0,
                sts_falta_energia int(3) DEFAULT 0,
                PRIMARY KEY (id)
              )`) // Cria nova tabela se nao existir no banco(NOVO CONROLADOR)
                    .then(data => {
                        SQL(`INSERT INTO ns_${controlador.wifi_ns} 
                                     (data)
                         VALUES ('NOW()')`)
                            .then(
                                SQL(`INSERT INTO controladores 
                                                 (numero_serie,
                                                 senha_serie,
                                                 situacao,
                                                 data_cadastro)
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

module.exports = { findAll, lastedData, saveData, setSituation }