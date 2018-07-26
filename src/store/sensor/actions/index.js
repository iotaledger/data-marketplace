import { LOAD_SENSOR } from '../../actionTypes';
import api from '../../../utils/api';

export const loadSensor = deviceId => {
  const promise = api('getDevice', { deviceId });
  return {
    type: LOAD_SENSOR,
    promise,
  };
};
