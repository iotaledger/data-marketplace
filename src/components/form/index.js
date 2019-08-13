import React from 'react';
import styled from 'styled-components';
import ReactGA from 'react-ga';
import Recaptcha from 'react-recaptcha';
import { connect } from 'react-redux';
import api from '../../utils/api';
import Dropdown from './dropdown';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      acceptedDisclaimer: false,
      newsletter: false,
      name: '',
      email: '',
      comments: '',
      company: '',
      country: '',
      website: '',
      category: '',
      industry: '',
      captcha: null,
      loading: false,
      success: false,
      error: null,
      categoryList: [
        '',
        'Consortium',
        'Consulting firm',
        'Event',
        'Freelance influencer',
        'International institutions',
        'Investor & VC',
        'Incubator & Cluster',
        'Large corporation',
        'Medium size corporation',
        'Not-for-profit organisation',
        'Public sector',
        'Research & Academia',
        'Startup',
        'Testbed, Prototyping, Living lab',
        'Other',
      ],
      industryList: [
        '',
        'Agriculture / Smart Farming',
        'Consulting',
        'Education',
        'Finance',
        'Food & Beverages',
        'Global Trade & Supply Chain',
        'Government',
        'Hardware Technology & Electronics',
        'Healthcare & Pharma',
        'Industry 4.0 / Industrial IoT',
        'Insurance',
        'IoT / M2M',
        'Maritime',
        'Materials',
        'Media & Entertainment',
        'Mobility',
        'Personal Data',
        'Oil & Gas',
        'Power & Utilities',
        'Public institutions',
        'Real Estate, Smart Buildings',
        'Retail',
        'Sales & Marketing',
        'SDGs',
        'Smart cities',
        'Software Tech & Internet',
        'Telecom',
        'Several',
        'Other',
      ],
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.submit = this.submit.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.verify = this.verify.bind(this);
  }

  handleInputChange({ target }) {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(
      {
        [name]: value,
      },
      () => console.log(this.state)
    );
  }

  selectItem(type, title) {
    this.setState({ [type]: title });
  }

  verify(data) {
    this.setState({ captcha: data, loading: false });
  }

  async submit(e) {
    e.preventDefault();
    const {
      captcha,
      loading,
      name,
      email,
      country,
      website,
      company,
      acceptedDisclaimer,
      category,
      industry,
      newsletter,
      comments,
    } = this.state;

    if (loading) return;

    if (!acceptedDisclaimer || !name || !email || !country || !company) {
      return this.setState({ error: 'Please fill out all fields' });
    }

    if (!captcha) {
      return this.setState({ error: 'Please complete the captcha' });
    }

    this.setState({ loading: true }, async () => {
      const packet = {
        captcha,
        name,
        email,
        country,
        website,
        company,
        acceptedDisclaimer,
        category,
        industry,
        newsletter,
        comments,
      };

      await api.post('sendEmail', packet);
      this.setState({ success: true });
      ReactGA.event({
        category: 'Send Email',
        action: 'Send Email',
        label: `Name ${name}, email: ${email}`
      });
    });
  }

  render() {
    const {
      acceptedDisclaimer,
      name,
      email,
      comments,
      country,
      website,
      company,
      success,
      error,
      captcha,
      loading,
      industry,
      category,
      newsletter,
      categoryList,
      industryList,
    } = this.state;
    const { settings } = this.props;
    if (!settings.recaptchaSiteKey) return <div />;

    return (
      <FormWrapper>
        {!success ? (
          <F onSubmit={this.submit}>
            {error && <Error>{error}</Error>}
            <InputFormWrapper>
              <ColumnFormWrapper>
                <I
                  type="text"
                  placeholder="Name *"
                  value={name}
                  name="name"
                  onChange={this.handleInputChange}
                />
                <I
                  type="email"
                  placeholder="Email *"
                  value={email}
                  name="email"
                  onChange={this.handleInputChange}
                />
                <I
                  type="text"
                  placeholder="Company *"
                  value={company}
                  name="company"
                  onChange={this.handleInputChange}
                />
                <I
                  type="text"
                  placeholder="Company Website"
                  value={website}
                  name="website"
                  onChange={this.handleInputChange}
                />
                <I
                  type="text"
                  placeholder="Country *"
                  value={country}
                  name="country"
                  onChange={this.handleInputChange}
                />
              </ColumnFormWrapper>
              <ColumnFormWrapper>
                <Dropdown
                  title={industry || 'Industry'}
                  list={industryList}
                  selectItem={this.selectItem}
                  type="industry"
                />
                <Dropdown
                  title={category || 'Category'}
                  list={categoryList}
                  selectItem={this.selectItem}
                  type="category"
                />
                <T
                  value={comments}
                  placeholder="Comments"
                  name="comments"
                  onChange={this.handleInputChange}
                />
              </ColumnFormWrapper>
            </InputFormWrapper>
            <CheckboxWrapper>
              <Label>
                <Input
                  name="acceptedDisclaimer"
                  type="checkbox"
                  checked={acceptedDisclaimer}
                  onChange={this.handleInputChange}
                />
                <strong>Acknowledgement</strong> of{' '}
                <a 
                  target="_blank" 
                  rel="noopener noreferrer"
                  href="https://www.iota.org/research/privacy-policy"
                >
                  Disclaimer clause
                </a>
              </Label>
              <Label>
                <Input
                  name="newsletter"
                  type="checkbox"
                  checked={newsletter}
                  onChange={this.handleInputChange}
                />
                Please add me to the newsletter
              </Label>
            </CheckboxWrapper>
            <ControllWrapper>
              <RecaptchaContainer>
                <Recaptcha sitekey={settings.recaptchaSiteKey} verifyCallback={this.verify} />
              </RecaptchaContainer>
              {captcha && !loading && <Button type={'submit'}>Submit</Button>}
              {loading && <Error>Sending</Error>}
            </ControllWrapper>
          </F>
        ) : (
          <C>
            <Error>Your message has been sent!</Error>
          </C>
        )}

        <Bottom />
      </FormWrapper>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.settings,
});

export default connect(mapStateToProps)(Form);

const RecaptchaContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const Bottom = styled.div`
  position: absolute;
  height: 50px;
`;

const F = styled.form`
  width: 100%;
`;

const CheckboxWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 13px;
  margin-left: 20px;
`;
const Input = styled.input`
  margin: 0 10px 0 5px;
`;
const Label = styled.label`
  font-size: 14px;
  font-weight: normal;
  font-style: italic;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: rgba(78, 90, 97, 1);
  margin-bottom: 5px;
`;
const I = styled.input`
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

const T = styled.textarea`
  height: 155px;
  width: 100%;
  font-size: 14px;
  padding: 9px 14px;
  margin: 10px 0 0;
  border: none;
  background: transparent;
  border: solid 1px #d8d8d8;
  border-radius: 25px;
  &::placeholder {
    color: rgba(78, 90, 97, 1);
    font-size: 14px;
    font-weight: normal;
  }
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

const ColumnFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0px 20px;

  @media (max-width: 768px) {
    margin: 0;
    padding: 0 20px;
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
