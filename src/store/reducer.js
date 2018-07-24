import { combineReducers } from 'redux';
import { LOGOUT } from './actionTypes';
import settings from './settings/reducer';
import user from './user/reducer';

const appReducer = combineReducers({
  settings,
  user,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
