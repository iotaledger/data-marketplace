const express = require('express')
var bodyParser = require('body-parser')
const port = parseInt(process.env.PORT, 10) || 3000

const next = require('next')
const routes = require('./routes')
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handler = routes.getRequestHandler(app)

const Firebase = require('./lib/serverDB')

app.prepare().then(() => {
  const server = express()
  server.use(bodyParser.json())

  server.post('/purchase', (req, res) => {
    console.log(req.body)
    var packet = req.body
    if (packet.full) {
      Firebase.full(packet.id, packet.device)
    } else {
      Firebase.partial(packet.id, packet.device)
    }
    return true
  })

  server.get('*', (req, res) => {
    return handler(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
