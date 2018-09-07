import React from 'react';
import styled from 'styled-components';

const Card = ({ imageSrc, imageAlt, heading, text, scale }) => (
  <InfoCol>
    <Image scale={scale} src={imageSrc} alt={imageAlt} />
    <InfoHeading>{heading}</InfoHeading>
    <Text>{text}</Text>
  </InfoCol>
);

export default props => {
  if (props.link) {
    return (
      <a href={props.link} target="_blank" rel="noopener noreferrer">
        <Card {...props} />
      </a>
    );
  }
  return <Card {...props} />;
};

const InfoCol = styled.div`
  width: 100%;
  max-width: 350px;
  text-align: center;
  padding: 0 30px;
  margin-bottom: 60px;

  @media (max-width: 767px) {
    margin-bottom: 30px;
  }
`;

const Image = styled.img`
  @media (max-width: 760px) {
    margin-bottom: 18px;
  }
  margin-bottom: 35px;
  height: 100px;
  width: ${props => (props.scale ? `${props.scale}%` : '100px')};
`;

const InfoHeading = styled.p`
  @media (max-width: 760px) {
    font-size: 22px;
    margin-bottom: 0;
  }
  font-size: 24px;
  line-height: 42px;
  margin-bottom: 10px;
`;

const Text = styled.p`
  @media (max-width: 1120px) {
    font-size: 16px;
    line-height: 27px;
    max-width: 260px;
    margin: 0 auto;
  }
  font-size: 17px;
  line-height: 32px;
  color: #4e5a61;
`;
