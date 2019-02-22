import React from 'react';
import ReactGA from 'react-ga';
import styled from 'styled-components';
import Recaptcha from 'react-recaptcha';
import { connect } from 'react-redux';
import api from '../utils/api';
import Loading from '../components/loading';
import Cookie from '../components/cookie';

class Faucet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      captcha: null,
      loading: false,
      success: false,
      error: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.submit = this.submit.bind(this);
    this.verify = this.verify.bind(this);
  }

  componentDidMount() {
    ReactGA.pageview('/faucet');
  }

  handleInputChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => console.log(this.state));
  }

  verify(data) {
    this.setState({ captcha: data, loading: false });
  }

  async submit(e) {
    e.preventDefault();
    const { captcha, loading, address } = this.state;

    if (loading) return;

    if (!address) {
      return this.setState({ error: 'Please provide a valid address' });
    }

    if (!captcha) {
      return this.setState({ error: 'Please complete the captcha' });
    }

    this.setState({ loading: true }, async () => {
      await api.post('faucet', { captcha, address });
      this.setState({ success: true, loading: false });
    });
  }

  render() {
    const { address, success, error, captcha, loading } = this.state;
    const { settings } = this.props;
    if (!settings.recaptchaSiteKey) return <div />;

    return (
      <React.Fragment>
        <Cookie />
        <FormWrapper>
          {!success ? (
            <Form onSubmit={this.submit}>
              {error && <Error>{error}</Error>}
              <InputFormWrapper>
                <Input
                  type="text"
                  placeholder="Address *"
                  value={address}
                  name="address"
                  onChange={this.handleInputChange}
                />
              </InputFormWrapper>
              <ControllWrapper>
                <RecaptchaContainer>
                  <Recaptcha sitekey={settings.recaptchaSiteKey} verifyCallback={this.verify} />
                </RecaptchaContainer>
                {captcha && !loading && <Button type={'submit'}>Submit</Button>}
                {loading && <Error>Sending</Error>}
                {loading && <Loading color="#009fff"/>}
              </ControllWrapper>
            </Form>
          ) : (
            <Div>
              <Error>Your request has been sent!</Error>
            </Div>
          )}
        </FormWrapper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.settings,
});

export default connect(mapStateToProps)(Faucet);

const RecaptchaContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const Form = styled.form`
  width: 100%;
`;

const Input = styled.input`
  background: transparent;
  border: solid 1px #d8d8d8;
  height: 45px;
  border-radius: 25px;
  padding: 9px 14px;
  margin: 10px 0 0;
  width: 100%;
  font-size: 14px;
  font-weight: normal;
`;

const FormWrapper = styled.section`
  display: flex;
  justify-content: center;
  width: 774px;
  border-radius: 10px;
  background-color: #f0f6f8;
  padding: 3em 2em;
  text-align: center;
  margin: auto;
  margin-top: 150px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ControllWrapper = styled.section`
  width: 100%;

  @media (max-width: 980px) {
    padding: 0 20px;
  }
`;

const InputFormWrapper = styled.section`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Div = styled.div`
  width: 100%;
  max-width: 1440px;
  padding: 0 15px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 60px;
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
  font-size: 15px;
  letter-spacing: 0.47px;
  border-radius: 100px;
  text-transform: uppercase;
  color: #fff;
  padding: 12px 21px;
  margin-top: 30px;
  box-shadow: 0px 9px 26.1px 2.9px rgba(0, 138, 221, 0.3);
  font-weight: 700;
  background-color: #009fff;
  width: 100%;
  height: 60px;
`;
