const express = require('express')
var bodyParser = require('body-parser')
const port = parseInt(process.env.PORT, 10) || 3000

const next = require('next')
const routes = require('./routes')
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handler = routes.getRequestHandler(app)

const Firebase = require('./lib/serverDB')
var mailgun = require('mailgun.js')

var mg = mailgun.client({
  username: 'api',
  key: 'key-1104febc601341ced88b1fa1598a5e72',
  public_key: 'pubkey-b573386b5632c7e2dd7b9447cc00dfe6'
})

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

  server.post('/email', async (req, res) => {
    var packet = req.body
    console.log(packet)
    if (
      !packet ||
      !packet.name ||
      !packet.company ||
      !packet.email ||
      !packet.body ||
      !packet.captcha
    )
      return res.json('Malformed Request')

    var cap = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=6LeIFTsUAAAAAEuditG8maUke__qA9h2NywlQIBv&response=${
        packet.captcha
      }`,
      {
        method: 'POST'
      }
    )
    var resp = await cap.json()
    if (!resp.success) return res.json({ error: 'Malformed Request' })

    mg.messages
      .create('mail.tangle.works', {
        from: 'Data Market <mailgun@mail.tangle.works>',
        to: ['participate@iota.org'],
        subject: 'Marketplace Form Inquiry',
        html: `<div>
          <p><strong>Name:</strong></p><br /><p>${packet.name}</p>
        </div>
        <div>
          <p><strong>Company:</strong></p><br /><p>${packet.company}</p>
        </div> 
        <div>
          <p><strong>Email:</strong></p><br /><p>${packet.email}</p>
        </div>          
        <div>
          <p><strong>Message:</strong></p><br /><p>${packet.body}</p>
        </div>`
      })
      .then(msg => {
        return res.json({ success: true })
      }) // logs response data
      .catch(err => console.log(err)) // logs any error
  })

  server.get('*', (req, res) => {
    return handler(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
