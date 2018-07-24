import { LOAD_USER, LOGOUT } from '../../actionTypes';
import api from '../../../utils/api';

export const loadUser = userId => {
  const promise = api('getUser', { userId });
  return {
    type: LOAD_USER,
    promise,
  };
};

export const logout = () => ({
  type: LOGOUT,
});
