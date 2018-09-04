const axios = require('axios');
const { getEmailSettings } = require('./firebase');

const checkRecaptcha = async (captcha, emailSettings) => {
  const response = await axios({
    method: 'post',
    url: `https://www.google.com/recaptcha/api/siteverify?secret=${emailSettings.googleSecretKey}&response=${captcha}`,
  });
  return response ? response.data : null;
};

const mailgunSendEmail = (packet, emailSettings) => {
  const {
    apiKey, domain, emailRecepient, emailBcc, emailReplyTo, emailSender, emailList,
  } = emailSettings;
  const mg = require('mailgun-js')({ apiKey, domain });
  mg.messages().send(
    {
      from: `Data Market <${emailSender}>`,
      to: emailRecepient,
      bcc: emailBcc,
      'h:Reply-To': packet.email,
      subject: 'Marketplace Form Inquiry',
      html: `<div>
          <p><strong>Name: </strong>   ${packet.name}</p>
        </div>
        <div>
          <p><strong>Email: </strong>   ${packet.email}</p>
        </div>
        <div>
          <p><strong>Company: </strong>   ${packet.company}</p>
        </div>
        <div>
          <p><strong>Company Website: </strong>   ${packet.website}</p>
        </div>
        <div>
          <p><strong>Country: </strong>   ${packet.country}</p>
        </div>
        <div>
          <p><strong>Industry: </strong>   ${packet.industry}</p>
        </div>
        <div>
          <p><strong>Category: </strong>   ${packet.category}</p>
        </div>
        <div>
          <p><strong>Message:</strong></p><p>${packet.comments}</p>
        </div>
        <div>
          <p><strong>Newsletter: </strong>   ${packet.newsletter}</p>
        </div>`,
    },
    (error, body) => {
      if (error) {
        console.log('Email callback error', error);
      }
    }
  );

  if (packet.newsletter.toString() === 'true') {
    const list = mg.lists(emailList);
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
  }

  mg.messages().send(
    {
      from: `Data Market <${emailSender}>`,
      to: packet.email,
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
  const emailSettings = await getEmailSettings();
  // Check Recaptcha
  const recaptcha = await checkRecaptcha(packet.captcha);
  if (!recaptcha || !recaptcha.success) {
    console.log('sendEmail failed. Recaptcha is incorrect. ', recaptcha['error-codes']);
    return 'Malformed Request';
  }

  // Send message
  mailgunSendEmail(packet, emailSettings);
  return true;
};
