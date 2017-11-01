const routes = (module.exports = require('next-routes')())

routes.add('sensor', '/sensor/:id').add('sensor-test', '/sensor-test/:id')
