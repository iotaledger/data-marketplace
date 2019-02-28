import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

export default ({ onAnchorClick }) => (
  <Header>
    <Container>
      <Info>
        <Heading>
          IOTA makes it<br className="desktop-hidden-later mobile-hidden-later" /> possible<br className="tablet-hidden-later mobile-hidden-later" />{' '}
          to securely<br className="desktop-hidden-later mobile-hidden-later" /> store, sell,<br className="tablet-hidden-later mobile-hidden-later" />{' '}
          and access<br className="desktop-hidden-later mobile-hidden" /> data streams.
        </Heading>
        <Tagline>Never has getting access to diverse, fine-granular data been this easy!</Tagline>
        <a
          href="https://blog.iota.org/part-1-iota-data-marketplace-update-5f6a8ce96d05"
          target="_blank"
          rel="noopener noreferrer">
          <Button type="button">About the Marketplace</Button>
        </a>
        <Link to={'/#about'} onClick={() => onAnchorClick('about')}>
          <SubLink>{'About the initiative'.toUpperCase()}</SubLink>
        </Link>
        <Link to={'/#participants'} onClick={() => onAnchorClick('participants')}>
          <SubLink>{'Participants'.toUpperCase()}</SubLink>
        </Link>
      </Info>
      <Graphics>
        <Graphic1
          src="/static/illustrations/header-image-3.png"
          srcSet="/static/illustrations/header-image-3@2x.png 2x"
          alt="IOTA sensor data image"
        />
        <Graphic2
          src="/static/illustrations/header-image-1.png"
          srcSet="/static/illustrations/header-image-1@2x.png 2x"
          alt="IOTA sensor data image"
        />
        <Graphic3
          src="/static/illustrations/header-image-2.png"
          srcSet="/static/illustrations/header-image-2@2x.png 2x"
          alt="IOTA sensor data image"
        />
        <GraphicBlock />
      </Graphics>
      <Shape3 src="/static/shapes/shape-header-hero.svg" alt="Background shape" />
    </Container>
    <Shape1 src="/static/shapes/shape-header-bg-1.svg" alt="Background shape" />
    <Shape2 src="/static/shapes/shape-header-bg-2.svg" alt="Background shape" />
  </Header>
);

const Header = styled.header`
  position: relative;
  background-image: linear-gradient(190deg, #f3f8fa 1%, #eaf0f4 95%);
  margin-bottom: 40px;
`;

const SubLink = styled.p`
  font-size: 14px;
  letter-spacing: 1.5px;
  font-weight: 600;
  line-height: 33px;
  padding: 7px 15px 0;
  color: rgba(78, 90, 97, 1);
  opacity: 0.5;
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1170px;
  padding: 0 15px;
  margin-right: auto;
  margin-left: auto;
`;

const Info = styled.div`
  position: relative;
  top: 30px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto 0 95px;
  padding: 40px 0 160px;
  @media (max-width: 1120px) {
    max-width: 420px;
    padding: 30px 0 180px;
    margin-left: 65px;
  }
  @media (max-width: 760px) {
    padding-bottom: 90px;
    margin-left: 10px;
  }
  @media (max-width: 700px) {
    max-width: 400px;
  }
  @media (max-width: 600px) {
    margin-left: 5px;
  }
`;

const Heading = styled.h1`
  font-size: 42px;
  line-height: 62px;
  max-width: 570px;
  margin: 115px 0 30px;
  font-weight: 100;
  @media (max-width: 1120px) {
    font-size: 38px;
    line-height: 56px;
  }
  @media (max-width: 760px) {
    margin-top: 60px;
  }
  @media (max-width: 700px) {
    font-size: 25px;
    line-height: 38px;
  }
  @media (max-width: 600px) {
    max-width: 230px;
    margin-top: 40px;
    margin-bottom: 20px;
  }
`;

const Tagline = styled.h2`
  font-size: 22px;
  line-height: 36px;
  max-width: 400px;
  margin-bottom: 40px;
  color: #4e5a61;
  font-weight: 400;
  @media (max-width: 1120px) {
    margin-bottom: 25px;
  }
  @media (max-width: 700px) {
    font-size: 18px;
    line-height: 28px;
    max-width: 300px;
    margin-bottom: 30px;
  }
  @media (max-width: 470px) {
    max-width: 230px;
  }
`;

const Button = styled.button`
  background-color: #009fff;
  box-shadow: 0 16px 25px 0 rgba(0, 159, 255, 0.27);
  appearance: none;
  font: 15px 'Nunito Sans', sans-serif;
  letter-spacing: 0.47px;
  padding: 20px 38px;
  border-radius: 100px;
  text-transform: uppercase;
  color: #fff;
  font-weight: 700;
  margin-bottom: 15px;
`;

const Graphics = styled.div`
  position: relative;
  top: 45px;
  z-index: 100;
  width: 50%;
  @media (max-width: 1120px) {
    width: 360px;
    left: -15vw;
  }
  @media (max-width: 850px) {
    width: 260px;
  }
  @media (max-width: 700px) {
    position: absolute;
    left: auto;
    top: 140px;
    right: 0;
  }
  &:before {
    top: 135px;
    left: 60px;
    width: 135px;
    height: 50px;
    content: '';
    background-image: linear-gradient(-206deg, #42e4d6 0%, #00b0fd 100%);
    position: absolute;
    border-radius: 6px;
    box-shadow: 0 10px 28px 0 rgba(10, 32, 87, 0.1);
    @media (max-width: 1120px) {
      top: 70px;
      left: 114px;
      z-index: -50;
    }
    @media (max-width: 850px) {
      top: 70px;
      left: 114px;
    }
    @media (max-width: 700px) {
      top: -70px;
    }
    @media (max-width: 470px) {
      top: -75px;
      left: 180px;
    }
    @media (max-width: 400px) {
      left: 200px;
    }
  }
  &:after {
    bottom: 67px;
    left: 255px;
    width: 110px;
    height: 40px;
    content: '';
    background-image: linear-gradient(-206deg, #42e4d6 0%, #00b0fd 100%);
    position: absolute;
    border-radius: 6px;
    box-shadow: 0 10px 28px 0 rgba(10, 32, 87, 0.1);
    @media (max-width: 1120px) {
      bottom: 100px;
      left: 275px;
    }
    @media (max-width: 970px) {
      bottom: 160px;
      left: 295px;
    }
    @media (max-width: 850px) {
      left: 225px;
    }
    @media (max-width: 700px) {
      bottom: 50px;
      left: 120px;
    }
    @media (max-width: 470px) {
      bottom: 40px;
      left: 180px;
    }
    @media (max-width: 400px) {
      left: 200px;
    }
  }
`;

const GraphicBlock = styled.div`
  position: relative;
  bottom: 50px;
  left: 320px;
  width: 220px;
  height: 80px;
  border-radius: 6px;
  background-color: #0a2056;
  box-shadow: 0 14px 28px 0 rgba(10, 32, 87, 0.24);
  @media (max-width: 1120px) {
    bottom: 50px;
    left: 460px;
  }
  @media (max-width: 850px) {
    left: 310px;
  }
  @media (max-width: 700px) {
    display: none;
  }
`;

const float = num => {
  return keyframes`
      0% {transform: translateY(0px) translateX(0px);}
      50% {transform: translateY(${Math.random() * -5 + 'px'}) translateX(${Math.random() * -3 +
    'px'});}
      100% {transform: translateY(0px) translateX(0px);}`;
};

const Graphic = styled.img`
  position: relative;
  z-index: 50;
`;

const Graphic1 = styled(Graphic)`
  top: 30px;
  left: 75%;
  animation: 5s ${float(3)} ease infinite 0s;
  @media (max-width: 1120px) {
    top: 10px;
    left: 110%;
  }
  @media (max-width: 700px) {
    display: none;
  }
`;

const Graphic2 = styled(Graphic)`
  animation: 5s ${float(2)} ease infinite 0s;

  @media (max-width: 1120px) {
    top: -65px;
    left: 50px;
    z-index: -10;
  }
  @media (max-width: 850px) {
    top: -65px;
    left: 50px;
  }
  @media (max-width: 850px) {
    top: -65px;
    left: 50px;
  }
  @media (max-width: 470px) {
    top: -75px;
    left: 130px;
    height: 130px;
  }
  @media (max-width: 400px) {
    left: 150px;
    top: -115px;
  }
`;

const Graphic3 = styled(Graphic)`
  top: 20px;
  left: 115px;
  animation: 5s ${float(1)} ease ${Math.random() * 5 + 's'} infinite 0s;

  @media (max-width: 1120px) {
    top: 10px;
    left: 205px;
  }
  @media (max-width: 850px) {
    left: 155px;
  }
  @media (max-width: 700px) {
    top: -40px;
    left: 110px;
  }
  @media (max-width: 470px) {
    display: none;
  }
`;

const Shape = styled.img`
  position: absolute;
  z-index: 2;
`;

const Shape1 = styled(Shape)`
  bottom: -70px;
  right: 86vw;

  @media (max-width: 767px) {
    display: none;
  }
`;

const Shape2 = styled(Shape)`
  top: 0;
  left: 36vw;
`;

const Shape3 = styled(Shape)`
  z-index: 5;
  top: 8px;
  left: 56vw;
  height: 105%;
  @media (max-width: 700px) {
    left: 67vw;
  }

  @media (max-width: 470px) {
    display: none;
  }
`;
