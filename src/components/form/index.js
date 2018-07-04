import React from 'react';
import styled from 'styled-components';
import Recaptcha from 'react-recaptcha';

export default class extends React.Component {
  state = {
    name: '',
    email: '',
    body: '',
    company: '',
    captcha: null,
    loading: false,
    success: false,
    error: null,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.anchor && nextProps.anchor === 'contact') {
      const target = document.querySelector('#contact');
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  verify = data => {
    this.setState({ captcha: data });
  };

  submit = async e => {
    e.preventDefault();
    let state = this.state;
    if (state.loading) return;

    if (!state.name || !state.email || !state.body)
      return this.setState({ error: 'Please fill out all fields' });

    if (!state.captcha) return this.setState({ error: 'Please complete the captcha' });

    this.setState({ loading: true }, async () => {
      var response = await fetch('/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state),
      });
      var data = await response.json();
      console.log(data);
      this.setState({ success: true });
    });
  };

  render() {
    var { name, email, body, company, success, error } = this.state;
    return (
      <S id="contact">
        <C>
          <H>Get Involved</H>
        </C>
        {!success ? (
          <F onSubmit={this.submit}>
            {error && <Error>{error}</Error>}
            <I
              type={'text'}
              placeholder={'Your Full Name'}
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
            />

            <I
              type={'email'}
              placeholder={'Your email'}
              value={email}
              onChange={e => this.setState({ email: e.target.value })}
            />
            <I
              type={'text'}
              placeholder={'Your Company'}
              value={company}
              onChange={e => this.setState({ company: e.target.value })}
            />
            <T
              value={body}
              placeholder={'Your message here...'}
              onChange={e => this.setState({ body: e.target.value })}
            />
            {this.props.devices.length !== 0 && (
              <Recaptcha
                sitekey="6LeIFTsUAAAAAHRqa-Y9JtoN8Bopd3gQBDM2ItCm"
                verifyCallback={this.verify}
              />
            )}
            {!this.state.loading && <Button type={'submit'}>Submit</Button>}
            {this.state.loading && <Button>Sending</Button>}
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
  /* transform: skewY(-2deg); */
  @media (max-width: 760px) {
    padding-bottom: 45px;
  }
`;
const C = styled.div`
  /* transform: skewY(2deg); */
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

const Ul = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 40px auto;
  width: 80%;
  list-style: none;
  @media (max-width: 1120px) {
    justify-content: space-around;
  }
  @media (max-width: 760px) {
    flex-flow: row wrap;
    max-width: 370px;
    margin: 0 auto;
  }
`;
const Li = styled.li`
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  vertical-align: baseline;
  @media (max-width: 1120px) {
    &:not(:last-of-type) {
      margin-right: 0;
    }
  }
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
