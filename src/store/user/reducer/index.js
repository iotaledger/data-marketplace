import { handle } from 'redux-pack';
import { LOAD_USER, LOGOUT } from '../../actionTypes';

export default (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_USER:
      if (!payload || payload.length === 0) return state;
      return handle(state, action, {
        success: prevState => payload,
        failure: prevState => prevState,
      });
    case LOGOUT:
      return {};
    default:
      return state;
  }
};
