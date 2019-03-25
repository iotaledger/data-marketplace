import React from 'react';
// import Slider from 'react-slick';
import styled from 'styled-components';

export default class extends React.Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <Container>
        {/* <Slider {...settings}>
          {this.props.items.map(item => (
            <Item key={item}>
              <P>{item}</P>
            </Item>
          ))}
        </Slider> */}
      </Container>
    );
  }
}

const Container = styled.div`
  display: none;
  @media (max-width: 650px) {
    width: 90%;
    display: flex;
    flex-direction: column;
    align-self: center;
    margin-bottom: 30px;
  }
`;

const Item = styled.div`
  padding: 10px;
`;

const P = styled.p`
  height: 200px;
  font-size: 17px;
  font-weight: normal;
  line-height: 1.88;
  text-align: left;
  color: #ffffff;
  border-radius: 10px;
  border: solid 1px #4194ff;
  padding: 0 30px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-image: linear-gradient(219deg, #4194ff, #175fe1);
`;
