const express = require('express')
var bodyParser = require('body-parser')
const port = parseInt(process.env.PORT, 10) || 3000

const next = require('next')
const routes = require('./routes')
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handler = routes.getRequestHandler(app)

const api = 'key-1104febc601341ced88b1fa1598a5e72'
const domain = 'mail.tangle.works'

var mg = require('mailgun-js')({ apiKey: api, domain: domain })

// var mg = mailgun.client({
//   username: 'api',
//   key: 'key-1104febc601341ced88b1fa1598a5e72',
//   public_key: 'pubkey-b573386b5632c7e2dd7b9447cc00dfe6'
// })

app.prepare().then(() => {
  const server = express()
  server.use(bodyParser.json())

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

    mg.messages().send(
      {
        from: 'Data Market <mailgun@mail.tangle.works>',
        to: ['participate@iota.org'],
        'h:Reply-To': packet.email,
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
      },
      function(error, body) {
        console.log(error)
        console.log(body)
      }
    )

    var list = mg.lists('data-market@mail.tangle.works')
    let user = {
      subscribed: true,
      address: packet.email,
      name: packet.name,
      vars: {
        company: packet.company
      }
    }

    list.members().create(user, function(err, data) {
      // `data` is the member details
      console.log(err)
      console.log(data)
    })

    mg.messages().send(
      {
        from: 'Data Market <mailgun@mail.tangle.works>',
        to: [packet.email],
        'h:Reply-To': 'contact@iota.org',
        subject: 'Submission Recieved - Data Marketplace',
        html: `Hi
        <br/>
        <br/>
        Many thanks for your interest in IOTA and inquiry to join the Data Marketplace. The Proof of Concept initiative receives an overwhelming amount of interest and the list of candidates is exceeding our internal capacity to support the integration of all suggested devices.
        <br/>
        <br/>

        We do our best to review all submissions and get in touch with prioritized use cases and organisations based on their ability to contribute and impact the development of this proof of concept.
        <br/>
        <br/>

        Should your submission doesn't result in any follow up, please note that we will include your email in follow-up newsletter early Q1 2018 which will include further info about the final report and next step activities.
        <br/>
        <br/>

        The whole IOTA team thank you again for your interest and look forward to collaborating with you.
        <br/>
        <br/>

        IOTA Foundation
        <br/>
        www.iota.org`
      },
      function(error, body) {
        console.log(error)
        console.log(body)
        return res.json({ success: true })
      }
    )
  })

  server.get('*', (req, res) => {
    return handler(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
