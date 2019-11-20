import React from 'react';
import ReactGA from 'react-ga';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import BurgerMenu from '../components/header/burger';
import MiniHeader from '../components/header/mini-header';
import Header from '../components/header';
import Content from '../components/content';
import Partners from '../components/partners';
import Footer from '../components/footer';
import ScrollToTop from '../components/scroll-to-top';
import Cookie from '../components/cookie';
import Banner from '../components/banner';

const content1 = {
  id: 'about',
  text: `The IOTA Foundation launched the Data Marketplace as a proof of concept and open innovation ecosystem in the fourth quarter of 2017. The rationale and opportunity landscape related to this initiative are described in depth <a href="https://blog.iota.org/iota-data-marketplace-cb6be463ac7f">here</a>.
<br /><br />As of 2019, the initiative produced a PoC available online at <a href="https://data.iota.org">https://data.iota.org</a> and continued to onboard organisations. We now have more than 70 organisations signed up.`,
};

const content2 = {
  text: `The IOTA Tangle is a secure data communication protocol and zero fee micro-transaction system for the IoT/M2M. It provides the means to develop new "smart" business models in the IoT, enabling connected devices and "machines" to share securely information based on a new framework of 'Trust in the Data' and also allow seamless transactions between IoT devices.
<br /><br />
The IOTA Data Marketplace is a simplified platform which simulates how a connected device running the IOTA protocol can be paid rapidly for sharing secure data over to a web browser.`,
};

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchor: null,
    };

    this.onAnchorClick = this.onAnchorClick.bind(this);
  }

  componentDidMount() {
    ReactGA.pageview('/home');
    const { location } = this.props;
    const anchor = (location.state && location.state.anchor) || null;
    this.setState({ anchor });
  }

  onAnchorClick(anchor) {
    this.setState({ anchor });
  }

  onScrollToTop() {
    const target = document.querySelector('#main');
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  render() {
    const { anchor } = this.state;
    return (
      <Main id="main">
        <Cookie />
        <BurgerMenu />
        <MiniHeader />
        <Banner />
        <Header onAnchorClick={this.onAnchorClick} />
        <Content content={content1} anchor={anchor} />
        <ImgContainer>
          <Image src="/static/illustrations/home1.png" alt="IOTA process illustration" />
        </ImgContainer>
        <Content content={content2} />
        <Partners anchor={anchor || (this.props.location && this.props.location.hash)} />
        <ScrollToTop onClick={this.onScrollToTop} />
        <Footer />
      </Main>
    );
  }
}

export default withRouter(HomePage);

const Main = styled.div`
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

const Image = styled.img`
  height: 100%;
  padding: 10px 0;
  width: 500px;
  @media (max-width: 650px) {
    width: 350px;
  }
`;
