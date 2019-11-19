const authMiddleware = require('../middleware/auth'); // validaçoes do tokem

const controlador = require('./controlador')
const user = require('./user')
const userDevices = require('./user-devices')

module.exports = app => {
    
    app.route('/auth')
        .post(user.auth)

   

    app.route('/usuario')
        .post(user.save)
        // .all(authMiddleware)
        .get(user.findAll)
        

    app.route('/usuario/:id')
       // .all(authMiddleware)
        .get(user.findById)
        .put(user.update)
        .delete(user.remove)

        
    app.route('/controlador/:id')
        // .all(authMiddleware)
        .get(controlador.lastedData)
        .put(controlador.setSituation)
        .post(controlador.saveData)

    app.route('/controlador')
        //  .all(authMiddleware)
        .get(controlador.findAll)
        .put(controlador.saveConfiguracao)

    app.route('/usuario/controlador/:id')
        // .all(authMiddleware)
        .get(userDevices.myDevices)
        .post(userDevices.save)
        .delete(userDevices.remove)

    app.all('/*', (req, res) => {
        return res.status(401).json({ err: "Not found / Unauthorized" });
    });
};