import React from 'react';
import styled from 'styled-components';
import { reducer } from '../../lib/utils';

const Sidebar = styled.aside`
  background-image: linear-gradient(-189deg, #0d3497 1%, #1857eb 95%);
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-end;
  width: 25vw;
  min-width: 330px;
  padding: 40px 30px 0 0;
  @media (max-width: 1235px) {
    width: 10vw;
    min-width: 290px;
  }
  @media (max-width: 760px) {
    width: 100%;
    padding: 30px 15px;
  }
`;

const Details = styled.div`
  width: 230px;
  position: relative;
  padding-bottom: 30px;
  margin-bottom: 30px;
  @media (max-width: 760px) {
    width: 100%;
  }
  &::before {
    content: '';
    position: absolute;
    right: -30px;
    bottom: 0;
    height: 1px;
    width: 100vw;
    background-color: rgba(115, 143, 212, 0.15);
  }
`;
const Label = styled.label`
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.41px;
  position: relative;
  display: block;
  margin: 0 0 30px;
  cursor: pointer;
  text-transform: uppercase;
  color: #009fff;
`;
const DetailRow = styled.div`
  @media (max-width: 760px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
const DetailKey = styled.p`
  font-size: 12px;
  line-height: 16px;
  color: #738fd4;
`;
const DetailValue = styled.p`
  font-size: 16px;
  line-height: 32px;
  color: #fff;
`;

export default class extends React.Component {
  componentWillReceiveProps = props => {
    this.setState(props);
  };

  render() {
    var { deviceInfo } = this.props;
    return (
      <Sidebar>
        <Details>
          <Label>Sensor details:</Label>
          <div>
            <a
              href={`https://testnet.thetangle.org/address/${deviceInfo.address}`}
              target={`_blank`}
            >
              <DetailRow>
                <DetailKey>Device Balance:</DetailKey>
                <DetailValue>{deviceInfo.balance ? reducer(deviceInfo.balance) : `--`}</DetailValue>
              </DetailRow>
            </a>
            <DetailRow>
              <DetailKey>Location:</DetailKey>
              <DetailValue>
                {' '}
                {deviceInfo.location
                  ? `${deviceInfo.location.city}, ${deviceInfo.location.country} `
                  : `--`}
              </DetailValue>
            </DetailRow>
            {/* <DetailRow>
              <DetailKey>Owner:</DetailKey>
              <DetailValue>
                {" "}
                {deviceInfo.owner ? deviceInfo.owner : `--`}
              </DetailValue>
            </DetailRow>{" "} */}
            <DetailRow>
              <DetailKey>Owner:</DetailKey>
              <DetailValue> {deviceInfo.company ? deviceInfo.company : `--`}</DetailValue>
            </DetailRow>
            {/* <DetailRow>
              <DetailKey>Data Types:</DetailKey>
              {deviceInfo.dataTypes &&
                deviceInfo.dataTypes.map((type, i) => (
                  <DetailValue key={i}>{` - ${type.name}`}</DetailValue>
                ))}
            </DetailRow> */}
          </div>
        </Details>
        {/* <Details className="sensor-data-wrapper">
          <Label>Sensor data:</Label>
          <div className="sensor-data">
            <div className="chart-wrapper">
              <header className="chart-header">
                <span className="chart-desc">AVG Temperature</span>
                <span className="chart-value">
                  68 <span>°F</span>
                </span>
              </header>
              <canvas id="temperatureChart" width={400} height={205} />
            </div>
            <div className="chart-wrapper">
              <header className="chart-header">
                <span className="chart-desc">AVG Humidity</span>
                <span className="chart-value">15%</span>
              </header>
              <canvas id="humidityChart" width={400} height={205} />
            </div>
            <div className="chart-wrapper">
              <header className="chart-header">
                <span className="chart-desc">AVG Presure</span>
                <span className="chart-value">990 hPa</span>
              </header>
              <canvas id="pressureChart" width={400} height={205} />
            </div>
          </div>
        </Details> */}
        <Fetcher>
          {this.props.dataEnd && <More>{`End of data reached`}</More>}
          {this.props.fetching && this.props.packets[0] && !this.props.dataEnd ? <Loading /> : null}
        </Fetcher>
      </Sidebar>
    );
  }
}

// const A = styled.a`
//   text-decoration: none;
// `

const More = styled.div`
  color: white;
  padding: 20px 20px 10px;
  margin: 10px 0 20px;
`;

const Fetcher = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  justify-content: center;
  @media (max-width: 760px) {
    display: none;
  }
`;

const Loading = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
      viewBox="0 0 38 38"
      stroke="#fff"
    >
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)" strokeWidth="2">
          <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
          <path d="M36 18c0-9.94-8.06-18-18-18" transform="rotate(319.698 18 18)">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>
    </svg>
  );
};
