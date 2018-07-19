const axios = require('axios');
const {
  apiKey,
  googleSecretKey,
  domain,
  emailRecepient,
  emailReplyTo,
} = require('../email_config.json');
const mg = require('mailgun-js')({ apiKey, domain });

const checkRecaptcha = async captcha => {
  const response = await axios({
    method: 'post',
    url: `https://www.google.com/recaptcha/api/siteverify?secret=${googleSecretKey}&response=${captcha}`,
  });
  return response ? response.data : null;
};

const mailgunSendEmail = packet => {
  mg.messages().send(
    {
      from: 'Data Market <mailgun@mail.tangle.works>',
      to: emailRecepient,
      'h:Reply-To': packet.email,
      subject: 'Marketplace Form Inquiry',
      html: `<div>
          <p><strong>Name:</strong></p><p>${packet.name}</p>
        </div>
        <div>
          <p><strong>Company:</strong></p><p>${packet.company}</p>
        </div>
        <div>
          <p><strong>Email:</strong></p><p>${packet.email}</p>
        </div>
        <div>
          <p><strong>Message:</strong></p><p>${packet.body}</p>
        </div>`,
    },
    (error, body) => {
      if (error) {
        console.log('Email callback error', error);
      }
    }
  );

  const list = mg.lists('data-market@mail.tangle.works');
  const user = {
    subscribed: true,
    address: packet.email,
    name: packet.name,
    vars: {
      company: packet.company,
    },
  };

  list.members().create(user, (error, data) => {
    if (error) {
      console.log('Email members callback error', error);
    }
  });

  mg.messages().send(
    {
      from: 'Data Market <mailgun@mail.tangle.works>',
      to: [packet.email],
      'h:Reply-To': emailReplyTo,
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

        Should your submission doesn't result in any follow up, please note that we will include your email in follow-up newsletter early Q3 2018 which will include further info about the final report and next step activities.
        <br/>
        <br/>

        The whole IOTA team thank you again for your interest and look forward to collaborating with you.
        <br/>
        <br/>

        IOTA Foundation
        <br/>
        www.iota.org`,
    },
    (error, body) => {
      if (error) {
        console.log('Email automatic reply error', error);
      }
    }
  );
};

exports.sendEmail = async (packet: any) => {
  // Check Recaptcha
  const recaptcha = await checkRecaptcha(packet.captcha);
  if (!recaptcha || !recaptcha.success) {
    console.log('sendEmail failed. Recaptcha is incorrect. ', recaptcha['error-codes']);
    return 'Malformed Request';
  }

  // Send message
  mailgunSendEmail(packet);
  return true;
};
