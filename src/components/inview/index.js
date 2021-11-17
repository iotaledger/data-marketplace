import React, { useContext, useEffect } from 'react';
import InView from 'in-view';
import { SensorContext } from '../../pages/sensor';

const InViewEvent = ({ children }) => {
  const { func } = useContext(SensorContext);

  // Attach eventListener to last data packet to load new data when last packet is in view
  useEffect(() => {
    InView('.inview').on('enter', (el) => func());
  }, []);

  return <div className={'inview'}>{children}</div>;
};

export default InViewEvent;
