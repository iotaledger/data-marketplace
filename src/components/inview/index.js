import React, { useContext, useEffect } from 'react';
import InView from 'in-view';
import { SensorContext } from '../../pages/sensor';

export default ({ children }) => {
  const { func } = useContext(SensorContext);

  useEffect(() => {
    InView('.inview').on('enter', el => func());
  }, []);

  return <div className={'inview'}>{children}</div>;
}
