import React from 'react';
import styled from 'styled-components';
import upperFirst from 'lodash-es/upperFirst';

const partners = [
  { src: '42.png', alt: '42' },
  { src: '3for2.png', alt: '3for2' },
  { src: 'acando.png', alt: 'acando' },
  { src: 'accenture.png', alt: 'accenture' },
  { src: 'agder.png', alt: 'agder' },
  { src: 'akita.png', alt: 'akita' },
  { src: 'aliander.png', alt: 'aliander' },
  { src: 'allego.png', alt: 'allego' },
  { src: 'amrita.png', alt: 'amrita' },
  { src: 'aparito.png', alt: 'aparito' },
  { src: 'apgsga.png', alt: 'apgsga' },
  { src: 'ariwonto.png', alt: 'ariwonto' },
  { src: 'arundo.png', alt: 'arundo' },
  { src: 'biilabs.png', alt: 'biilabs' },
  { src: 'bIOTAsphere.png', alt: 'bIOTAsphere' },
  { src: 'bkk.png', alt: 'bkk' },
  { src: 'blocklab.png', alt: 'blocklab' },
  { src: 'bosch.png', alt: 'bosch' },
  { src: 'cgi.png', alt: 'cgi' },
  { src: 'crayon.png', alt: 'crayon' },
  { src: 'dnvgl.png', alt: 'dnvgl' },
  { src: 'dt.png', alt: 'dt' },
  { src: 'dnb.png', alt: 'dnb' },
  { src: 'elering.png', alt: 'elering' },
  { src: 'enexis.png', alt: 'enexis' },
  { src: 'engie.png', alt: 'engie' },
  { src: 'entra.png', alt: 'entra' },
  { src: 'epm.png', alt: 'epm' },
  { src: 'ewe.png', alt: 'ewe' },
  { src: 'ey.png', alt: 'ey' },
  { src: 'farmboek.png', alt: 'farmboek' },
  { src: 'farmforce.png', alt: 'farmforce' },
  { src: 'festo.png', alt: 'festo' },
  { src: 'fourc.png', alt: 'fourc' },
  { src: 'frankfurt.png', alt: 'frankfurt' },
  { src: 'fujitsu.png', alt: 'fujitsu' },
  { src: 'gasunie.png', alt: 'gasunie' },
  { src: 'grandcentrix.png', alt: 'grandcentrix' },
  { src: 'grid.png', alt: 'grid' },
  { src: 'handelshoyskolen.png', alt: 'handelshoyskolen' },
  { src: 'ice.png', alt: 'ice' },
  { src: 'innoenergy.png', alt: 'innoenergy' },
  { src: 'intelzone.png', alt: 'intelzone' },
  { src: 'ismb.png', alt: 'ismb' },
  { src: 'kpmg.png', alt: 'kpmg' },
  // { src: 'kryha.png', alt: 'kryha' },
  { src: 'movimento.png', alt: 'movimento' },
  { src: 'multiconsult.png', alt: 'multiconsult' },
  { src: 'nordic.png', alt: 'nordic' },
  { src: 'nordic_semiconductor.png', alt: 'nordic semiconductor' },
  { src: 'nte.png', alt: 'nte' },
  { src: 'ntnu.png', alt: 'ntnu' },
  { src: 'occ.png', alt: 'occ' },
  { src: 'orange.png', alt: 'orange' },
  { src: 'oslo.png', alt: 'oslo' },
  { src: 'philips.png', alt: 'philips' },
  { src: 'poyry.png', alt: 'poyry' },
  { src: 'RWTH.png', alt: 'RWTH Aachen' },
  { src: 'samsung.png', alt: 'samsung' },
  { src: 'schuco.png', alt: 'schuco' },
  { src: 'south-east-water.png', alt: 'South East Water' },
  { src: 'sweco.png', alt: 'sweco' },
  { src: 'swisscom.png', alt: 'swisscom' },
  { src: 'techMahindra.png', alt: 'techMahindra' },
  { src: 'tele2.png', alt: 'tele2' },
  { src: 'telstra.png', alt: 'telstra' },
  { src: 'tine.png', alt: 'tine' },
  { src: 'trianel.png', alt: 'trianel' },
  { src: 'trondheim.png', alt: 'trondheim' },
  { src: 'tukio.png', alt: 'tukio' },
  { src: 'tum.png', alt: 'Technical University of Munich' },
  { src: 'uio.png', alt: 'uio' },
  { src: 'undc.png', alt: 'undc' },
  { src: 'unmsm.png', alt: 'Grupo de Investigación de Internet de las Cosas UNMSM' },
  { src: 'USC_viterbi.png', alt: 'USC Viterbi' },
  { src: 'XDK2MAM.png', alt: 'XDK2MAM' },
  { src: 'wondrwall.png', alt: 'wondrwall' },
  { src: 'yield.png', alt: 'yield' },
];

export default class extends React.Component {
  render() {
    return (
      <Section id="participants">
        <Div>
          <P>Selected Participants</P>
          <Ul>
            {partners.map(({ alt, src, height = null, width = null }) => (
              <Li key={alt}>
                <Img
                  src={`/static/logotypes/${src}`}
                  srcSet={`/static/logotypes/${src} 2x`}
                  alt={upperFirst(alt)}
                  height={height}
                  width={width}
                />
              </Li>
            ))}
          </Ul>
        </Div>
      </Section>
    );
  }
}

const Section = styled.section`
  background-image: linear-gradient(-189deg, #eaf0f4 1%, #f3f8fa 95%);
  padding: 40px 0 20px;
  margin: 50px 0 -50px;
  transform: skewY(2deg);
  @media (max-width: 760px) {
    padding-bottom: 20px;
  }
`;

const Div = styled.div`
  transform: skewY(-2deg);
  width: 100%;
  max-width: 1440px;
  padding: 0 15px;
  margin-right: auto;
  margin-left: auto;
`;

const P = styled.p`
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.84px;
  text-align: center;
  text-transform: uppercase;
  color: rgba(137, 156, 166, 1);

  @media (max-width: 760px) {
    margin-bottom: 40px;
  }
`;

const Ul = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 40px auto;
  width: 80%;
  list-style: none;
  @media (max-width: 1120px) {
    justify-content: space-around;
  }
  @media (max-width: 760px) {
    flex-flow: row wrap;
    margin: 0 auto;
  }
`;

const Li = styled.li`
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  vertical-align: baseline;
  @media (max-width: 1120px) {
    &:not(:last-of-type) {
      margin-right: 0;
    }
  }
  @media (max-width: 760px) {
    margin-bottom: 40px;
  }
`;

const Img = styled.img`
  max-width: ${props => (props.width ? `${props.width}px` : '200px')};
  max-height: ${props => (props.height ? `${props.height}px` : '120px')};
  padding: 10px 15px;
`;
