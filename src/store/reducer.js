import { combineReducers } from 'redux';
import { LOGOUT } from './actionTypes';
import settings from './settings/reducer';

const appReducer = combineReducers({
  settings,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
