import { LOAD_USER, LOGOUT } from '../../actionTypes';
import api from '../../../utils/api';

export const loadUser = userId => {
  if (!userId) return;
  const promise = api.get('user', { userId });
  return {
    type: LOAD_USER,
    promise,
  };
};

export const logout = () => ({
  type: LOGOUT,
});
