import React from 'react';
import styled from 'styled-components';
import MiniHeader from '../components/header/mini-header';
import Content from '../components/content';
import List from '../components/content/list';
import Footer from '../components/footer';

const content1 = {
  title: 'The Devnet, also known as Testnet',
  text: `Aside from the mainnet, the IOTA Foundation operates a separate Tangle network called <a href="https://blog.iota.org/first-of-the-new-testnets-live-f8f41b99e9a3">“the devnet”</a>. It is a version of the Tangle meant for development and testing purposes.
<br /><br />The Devnet runs the latest stable version of IRI, and allow developers to work on their apps without getting in their way — or costing them any real tokens.
<br /><br />Read more about the devnet <a href="https://blog.iota.org/first-of-the-new-testnets-live-f8f41b99e9a3">here</a>.`,
};

const content2 = {
  title: 'Masked Authenticated Messaging (MAM)',
  text: `Masked Authenticated Messaging (MAM) is a second layer data communication protocol which adds functionality to emit and access encrypted data stream, like RSS, over the Tangle (IOTA’s distributed ledger) regardless of the size or cost of device. IOTA’s consensus protocol adds integrity to these message streams. Given these properties, MAM fulfills an important need in industries where integrity and privacy are required.
<br /><br />MAM uses Encrypted Messaging Streams, to emit and access a forward-secret and encrypted data stream over the Tangle.
<br /><br />Masked Authenticated Messaging allow for public or encrypted messaging streams to be published to the Tangle.
<br />These streams can be read back by anyone who has access to the Ledger, and anyone who has the encryption key. These message streams are signed so you are also able to attest to the authenticity of the data.
<br />Current MAM is written in RUST with bindings for Javascript and Java.
<br /><br />In the Data Marketplace implementation, each data packet is encrypted with it's own randomly generated encryption key. All keys are securely stored in our cloud backend system (powered and secured by Google for this first version).
<br /><br />In IOTA, a user or sensor can publish a message at any time. They only need to conduct a small amount of <a href="https://docs.iota.org/introduction/tangle/proof-of-work">“Proof-of-Work”</a>* to allow the data to propagate through the network.
<br /><br /><strong>* Proof of Work (PoW)</strong> - An algorithm which prevents Denial of Service and spam attacks on a network. a computationally hard puzzle to solve, but easy to verify. IOTA uses a <a href="https://en.wikipedia.org/wiki/Hashcash">Hashcash</a> based puzzle.
<br /><br />Since these messages are part of the distributed ledger, they both contribute to the security of the network by increasing total hashing power and benefit from the data integrity properties of the network as other transactions continue to indirectly reference them.
<br /><br />Read more about the MAM <a href="https://blog.iota.org/introducing-masked-authenticated-messaging-e55c1822d50e">here</a>.`,
};

const content3 = {
  title: 'Payment',
  text: `Data can be decrypted if payment is made. Price of the data stream is defined by sensor owner, and usually set between 1000 and 50000 IOTAs.
<br /><br />A buyer can ”fund” the wallet for free and will be granted with 10,000,000 virtual IOTAs, which he/she can spend exclusively for purchasing sensor data.
<br /><br /><strong>Important note for data stream purchasers:</strong> please note that these are not real IOTAs. The current balance can’t currently be topped up or transferred to another wallet address. The only valid operation is purchasing of the sensor data.
<br /><br /><strong>Important note for sensor owners:</strong> please note that received tokens are not real IOTAs. The collected balance can’t currently be withdrawn or transferred to another wallet address.
<br /><br />Beyond the current PoC,  commercial data marketplaces will integrate with customers’ existing wallets, where real IOTA tokens will be transferred from data buyers to sensor owners.
<br /><br />After the buyers clicks on the “Purchase access” button, the sensor is added to the list of your purchased data streams. In the background the <a href="https://docs.iota.org/introduction/tangle/proof-of-work">“Proof-of-Work”</a> is run to ensure the data integrity in the Tangle. This operation can take up to 60 seconds depending on the buyers computer and should not be interrupted by page reload.`,
};

const content4 = {
  title: 'Data storage in the Cloud',
  text: `The Data Marketplace PoCt uses a cloud backend service provided by Google Firebase. All information is stored securely and confidentially. Google cloud services are used for user authentication and access rights management.
<br />All other information is currently stored in the Firebase cloud database as well, but can be easily migrated to any other cloud provider like Amazon AWS or Microsoft Azure.
<br />Frontend application communicates with the cloud backend service over APIs, which makes the entire backend interchangeable.`,
};

const content5 = {
  title: 'Data Streaming',
  text: `New data packets can be added with a recommended minimum time interval of 5-10 min. More frequent additions are possible, but you need to keep in mind that <a href="https://docs.iota.org/introduction/tangle/proof-of-work">“Proof-of-Work”</a> functionality might require to run up to 60 seconds for every new packet.
<br /><br />A Publish Script, provided with every onboarded sensor, contains preconfigured examples on how to send sensor data packages from a static file, database, remote server using API. the script can be run in a loop with defined time interval in order to ensure continuous streaming.
<br /><br />Data readings should be timed between 5 to 10 minutes. More regular readings (every minute) are also possible, but not recommended.`,
};

const content6 = {
  title: 'Which data',
  text: `The Data Marketplace is not just aimed at IoT data, an example could be financial data from an API could also be stored and sold on the marketplace.
<br /><br />Existing functional examples of MAM being utilised on embedded devices.
<br />One can create portable weather stations, proximity beacons, vehicle locators and many other nifty sensor applications that report telemetry to a limited audience via the tangle or receive commands through a MAM stream.`,
};

const content7 = {
  text: `Other concepts that would find a great advantage in MAM include transmitting remote control commands and orchestrating updates.
<br /><br />Being able to secure data’s integrity and control its access management is a prerequisite for things like Over-The-Air updates(OTA), Fog Analytics, End-to-End verifiable Supply Chains, Automated Insurance and so much more.
<br /><br />If you do not have a sensor to utilize, but instead want to sell API data: feel free to do so!`,
};

const content8 = {
  text: `The Masked Authenticated Messaging (MAM) module is used to ensure encrypted messaging, ensuring security and privacy despite the permissionless nature of the IOTA Tangle.
<br /><br />This experiment runs on the IOTA testnet and runs IOTA testnet tokens which do not have real value. No real world payments or other real world financial consequences result from the current proof-of-concept and experiment made available online.
<br /><br />All data being contributed to this proof of concept is either non-sensitive data of which the participants are the authorized owners and/or is publicly available data which the participants may freely choose to share. Participation in the IOTA Data Marketplace takes place on a voluntary, non-contractual basis. Participants may choose to discontinue their participation at any time.`,
};

const content9 = {
  title: 'Sensors',
  text: `The data marketplace is agnostic to the sensors and the data that you connect to it. Any sensor that has the ability to transmit data and has an easy way to get regular data readings (e.g. through an API) can be used for the data marketplace. In order to submit the data to the marketplace, all you have to do is execute a NodeJS script (as listed in the Example Page).
<br /><br /><strong>Example Sensors to utilize</strong>
  `,
};

const content10 = {
  title: 'Work in progress functionality',
  text: `The PoC released on github is a first version of an opensource development that will continue onwards and feed from the inputs from the community. Work in progress includes:`,
};

const content11 = {
  title: 'Opensource Code',
  text: `As of August 2018, the code developed during the initiative is opensourced <a href="https://github.com/iotaledger/data-marketplace">here</a> in order to allow the innovation community to build further solutions. A dedicated chat channel in Discord is made available <a href="https://discordapp.com/channels/397872799483428865/400989166114177034">here</a> to developers.`,
};

const listSensors = [
  '<a href="https://www.netatmo.com/en-US/product/weather/">Netatmo Weather Station</a>',
  '<a href="https://xdk.bosch-connectivity.com/">Bosch XDK</a>',
  '<a href="https://www.artik.io/modules/artik-0-family/">Samsung Artik</a>',
  '<a href="http://www.nordicsemi.com/eng/Products/Nordic-Thingy-52">Nordic Semiconductor Thingy:52</a>',
  '<a href="https://www.adafruit.com/product/2733">Or simple Raspberry Pi’s, with a sensor kit</a>',
];

const limitations = [
  'Maximum size of a single data packet is limited to 1kb',
  'Google Mail or Google Business account required in order to onboard a new sensor',
  'Number of sensors per account is limited, but can be adjusted upon request',
  'New sensors require manual approval from IOTA team in order to be visible in the list/sensor map',
  'Virtual payments, no real tokens can be sent or received. No transfer to a different wallet possible',
  'No tokens to fiat currency exchange',
];

const workInProgress = [
  'Custom wallet configuration',
  'Migration over to Mainnet, real wallets and payments',
  'Modifying the data stream price, dynamic pricing',
  'Modifying of the sensor data fields',
  'Updated API <a href="https://marketplace.tangle.works/">documentation page</a>',
  'Latest data updates from device, visible prior to purchase',
  'External data storage of data (interchangeable cloud providers)',
  'Visualisation / graph tools',
];

export default () => (
  <Main>
    <MiniHeader />
    <ImgContainer>
      <Image src="/static/illustrations/vision.png" alt="Proof of Concept Illustration" />
    </ImgContainer>
    <Content content={content1} />
    <Content content={content2} />
    <Content content={content3} />
    <ImgContainer>
      <Image src="/static/illustrations/proof_of_concept.png" alt="IOTA Proof of Concept" />
    </ImgContainer>
    <Content content={content4} />
    <Content content={content5} />
    <Content content={content6} />
    <ImgContainer>
      <Image src="/static/illustrations/use_case_ideation.png" alt="IOTA process illustration" />
    </ImgContainer>
    <Content content={content7} />
    <ImgContainer>
      <Image src="/static/illustrations/MAM.png" alt="IOTA process illustration" />
    </ImgContainer>
    <Content content={content8} />
    <Content content={content9} />
    <List items={listSensors} />
    <List items={limitations} title="Limitations of the current version" />
    <Content content={content10} />
    <List items={workInProgress} />
    <Content content={content11} />
    <Footer />
  </Main>
);

const Main = styled.div`
  overflow-x: hidden;
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Image = styled.img`
  width: 40%;
  height: 40%;
  padding: 10px 0;
`;
