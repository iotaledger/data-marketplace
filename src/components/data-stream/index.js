import React from 'react';
import styled from 'styled-components';
import SensorCard from '../sensor-card';
import Inview from '../inview';

export default props => (
  <InfoCol>
    <CardWrapper>
      {props.packets &&
        props.packets
          .sort((a, b) => b.time - a.time)
          .map((packet, i) => (
            <SensorCard index={i} key={i} layout={props.layout} packet={packet} />
          ))}
      <Fetcher>
        {props.packets.length !== props.streamLength ? (
          <Inview func={props.func} />
        ) : (
          <div>End of data reached</div>
        )}
        <Block />
      </Fetcher>
    </CardWrapper>
  </InfoCol>
);

const InfoCol = styled.main`
  position: relative;
  width: 880px;
  padding-left: 30px;
  @media (max-width: 760px) {
    width: 100%;
    padding: 0;
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 455px;
    width: 1px;
    height: 100%;
    background-color: #738fd4;
    @media (max-width: 1195px) {
      left: 30px;
    }
    @media (max-width: 760px) {
      visibility: hidden;
    }
  }
`;
// const Pulse = keyframes`
// 0% {
//    opacity: 1;
//   }
//   100% {
//     opacity: 0;
//   }
// `;
// const Loader = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   height: 300px;
//   width: 100%;
//   opacity: 0;
//   animation: ${props =>
//     !props.show ? `${Pulse} 1s alternate infinite` : `none`};
//   z-index: 0;
//   background-image: radial-gradient(
//     ellipse at top,
//     rgba(116, 209, 234, 0.3),
//     rgba(116, 209, 234, 0) 50%
//   );
//   @media (max-width: 1200px) {
//     width: calc(100% + 30px);
//     background-image: radial-gradient(
//       ellipse at top left,
//       rgba(116, 209, 234, 0.3),
//       rgba(116, 209, 234, 0) 50%
//     );
//   }
//   @media (max-width: 760px) {
//     width: 100%;
//     background-image: radial-gradient(
//       ellipse at top,
//       rgba(116, 209, 234, 0.3),
//       rgba(116, 209, 234, 0) 50%
//     );
//   }
// `
const CardWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding: 40px 0 200px;
  @media (max-width: 1195px) {
    flex-flow: column nowrap;
    padding-bottom: 0;
    margin-left: 30px;
  }
  @media (max-width: 760px) {
    width: 100%;
    margin-left: 0;
    align-items: center;
  }
`;

const Block = styled.div`
  width: 10px;
  height: 10px;
  position: absolute;
  bottom: 0;
`;

const Fetcher = styled.div`
  position: absolute;
  bottom: 10px;
  color: white;
  padding: 20px 10px;
  margin: 10px 0 20px;
  @media (max-width: 760px) {
    position: relative;
  }
`;
