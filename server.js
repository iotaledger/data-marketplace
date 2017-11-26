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

  server.post('/purchase', async (req, res) => {
    var packet = req.body
    console.log(packet)
    if (!packet || !packet.id || !packet.device)
      return res.json('Malformed Request')

    if (packet.full) {
      var resp = await Firebase.full(packet.id, packet.device)
      console.log(resp)
      return res.json(JSON.stringify(resp))
    } else {
      var resp = await Firebase.partial(packet.id, packet.device)
      return res.json(JSON.stringify(resp))
    }
  })

  server.post('/new-device', async (req, res) => {
    var packet = req.body
    console.log(packet)
    var resp = await Firebase.newDevice(packet.id, packet.device, packet.sk)
    return res.json(JSON.stringify(resp))
  })

  server.post('/new-data', async (req, res) => {
    var packet = req.body
    if (!packet.id || !packet.packet || !packet.sk)
      return res.json(JSON.stringify({ error: 'Values missing' }))

    var resp = await Firebase.newData(packet.id, packet.packet, packet.sk)
    return res.json(JSON.stringify(resp))
  })

  server.get('*', (req, res) => {
    return handler(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
