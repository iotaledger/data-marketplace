import React from 'react';
import styled from 'styled-components';
import Recaptcha from 'react-recaptcha';
import { connect } from 'react-redux';
import api from '../../utils/api';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      body: '',
      company: '',
      captcha: null,
      loading: false,
      success: false,
      error: null,
    };

    this.submit = this.submit.bind(this);
    this.verify = this.verify.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.anchor && nextProps.anchor === 'contact') {
      const target = document.querySelector('#contact');
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  verify(data) {
    this.setState({ captcha: data, loading: false });
  };

  async submit(e) {
    e.preventDefault();
    const { captcha, loading, name, email, body } = this.state;

    if (loading) return;

    if (!name || !email || !body) {
      return this.setState({ error: 'Please fill out all fields' });
    }

    if (!captcha) {
      return this.setState({ error: 'Please complete the captcha' });
    }

    this.setState({ loading: true }, async () => {
      await api('sendEmail', this.state);
      this.setState({ success: true });
    });
  };

  render() {
    const { name, email, body, company, success, error, captcha, loading } = this.state;
    const { devices, settings } = this.props;
    if (!settings.recaptchaSiteKey) return <div />;

    return (
      <S id="contact">
        <C>
          <H>Get Involved</H>
        </C>
        {!success ? (
          <F onSubmit={this.submit}>
            {error && <Error>{error}</Error>}
            <I
              type="text"
              placeholder="Your Full Name"
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
            />

            <I
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={e => this.setState({ email: e.target.value })}
            />
            <I
              type="text"
              placeholder="Your Company"
              value={company}
              onChange={e => this.setState({ company: e.target.value })}
            />
            <T
              value={body}
              placeholder="Your message here..."
              onChange={e => this.setState({ body: e.target.value })}
            />
            {devices.length !== 0 && (
              <Recaptcha sitekey={settings.recaptchaSiteKey} verifyCallback={this.verify} />
            )}
            {captcha && !loading && <Button type={'submit'}>Submit</Button>}
            {loading && <Button>Sending</Button>}
          </F>
        ) : (
          <C>
            <Error>Your message has been sent!</Error>
          </C>
        )}

        <Bottom />
      </S>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.settings,
});

export default connect(mapStateToProps)(Form);

const Bottom = styled.div`
  position: absolute;
  height: 50px;
`;

const F = styled.form`
  display: flex;
  margin: 0 auto;
  padding: 0 10px;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
`;

const I = styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  padding: 9px 14px;
  font-size: 105%;
  margin: 30px 0 0;
  width: 100%;
  &::placeholder {
    color: rgba(0, 0, 0, 0.3);
  }
`;

const T = styled.textarea`
  height: 100px;
  width: 100%;
  font-size: 105%;
  padding: 9px 14px;
  margin: 30px 0;
  border: none;
  background: transparent;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  &::placeholder {
    color: rgba(0, 0, 0, 0.3);
  }
`;

const S = styled.section`
  background-image: linear-gradient(-189deg, #eaf0f4 1%, #f3f8fa 95%);
  padding: 90px 0 70px;
  @media (max-width: 760px) {
    padding-bottom: 45px;
  }
`;

const C = styled.div`
  width: 100%;
  max-width: 1440px;
  padding: 0 15px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 60px;
`;

const H = styled.p`
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.84px;
  text-align: center;
  text-transform: uppercase;
  color: rgba(137, 156, 166, 1);
  @media (max-width: 760px) {
    margin-bottom: 40px;
  }
`;

const Error = styled.p`
  padding: 15px 0 0px;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.84px;
  text-align: center;
  text-transform: uppercase;
  color: #fba471ff;
  @media (max-width: 760px) {
    margin-bottom: 40px;
  }
`;

const Button = styled.button`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  font: 15px 'Nunito Sans', sans-serif;
  letter-spacing: 0.47px;
  padding: 20px 38px;
  border-radius: 100px;
  text-transform: uppercase;
  color: #fff;
  font-size: 12px;
  letter-spacing: 0.38px;
  padding: 12px 21px;
  margin: 30px 0 0;
  box-shadow: 0 10px 20px 0 rgba(10, 32, 86, 0.4);
  font-weight: 700;
  background-color: #009fff;
`;
