const authMiddleware = require('../middleware/auth'); // validaçoes do tokem

const controlador = require('./controlador')
//const device = require('./device')
//const userDevices = require('./user-devices')

module.exports = app => {
/*
    app.route('/api/controlador/save/:temp/:temp_ajt/:umid/:umid_ajt/:sts_ventoinha/:sts_alarme/:modo_trabalho/:sts_trava/:fase/:clima/:tp_sensor/:wifi_ns/:wifi_senha/:versao_soft/:falta_energia*')
        .get(device.saveData)
*/
    app.route('/auth')
        .post(controlador.auth)

    app.route('/cadastro')
        .post(controlador.save)
        //.all(authMiddleware)
        .get(controlador.findAll)
/*

    app.route('/init')
        .all(authMiddleware)
        .get(device.findAll)

    app.route('/init/:nserie')
        .all(authMiddleware)
        .get(device.lastedData)
        .put(device.setSituation)

    /*app.route('/usuario/controlador/:id')
        .all(authMiddleware)
        .get(userDevices.myDevices)
        .post(userDevices.save)
        .delete(userDevices.remove)
*/
    app.all('/*', (req, res) => {
        return res.status(401).json({ err: "Not found / Unauthorized" });
    });
};