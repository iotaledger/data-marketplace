import { LOAD_PROJECT_SETTINGS } from '../../actionTypes';
import api from '../../../utils/api';

export const storeProjectSettings = () => {
  const promise = api.get('settings');
  return {
    type: LOAD_PROJECT_SETTINGS,
    promise,
  };
};
