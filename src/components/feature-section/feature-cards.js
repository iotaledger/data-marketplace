import React from 'react';
import styled from 'styled-components';

export default class extends React.Component {
  render() {
    return (
      <Container>
        {this.props.items.map((item, index) => {
          const colored = index === 0 || index === 2;
          return (
            <Item key={item} colored={colored}>
              <P colored={colored}>{item}</P>
              <Image src="/static/icons/get_involved/icon-quote.svg" colored={colored} />
            </Item>
          );
        })}
      </Container>
    );
  }
}

const Container = styled.div`
  width: 100%;
  max-width: 1190px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-self: center;
  justify-content: center;
  margin: 30px 20px;

  @media (max-width: 650px) {
    display: none;
  }
`;

const Item = styled.div`
  max-width: 376px;
  width: 30%;
  height: 178px;
  border-radius: 10px;
  border: solid 1px #4194ff;
  padding: 50px 35px;
  margin: 20px 10px;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-image: ${props =>
    props.colored ? 'linear-gradient(219deg, #4194ff, #175fe1)' : 'none'};

  @media (max-width: 999px) {
    height: 240px;
  }

  @media (max-width: 860px) {
    height: 300px;
  }

  @media (max-width: 768px) {
    height: 400px;
  }
`;

const P = styled.p`
  font-size: 17px;
  font-weight: normal;
  line-height: 1.88;
  text-align: left;
  color: ${props => (props.colored ? '#ffffff' : '#4e5a61')};
`;

const Image = styled.img`
  width: 35%;
  opacity: 0.1;
  position: absolute;
  left: 30%;
  bottom: ${props => (props.colored ? 'unset' : '-48px')};
  top: ${props => (props.colored ? '-75px' : 'unset')};

  @media (max-width: 860px) {
    bottom: ${props => (props.colored ? 'unset' : '-37px')};
    top: ${props => (props.colored ? '-60px' : 'unset')};
  }

  @media (max-width: 768px) {
    bottom: ${props => (props.colored ? 'unset' : '-30px')};
    top: ${props => (props.colored ? '-50px' : 'unset')};
  }
`;
