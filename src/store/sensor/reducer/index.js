import { handle } from 'redux-pack';
import { LOAD_SENSOR } from '../../actionTypes';

export default (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_SENSOR:
      if (!payload || payload.length === 0) return state;
      return handle(state, action, {
        success: prevState => payload,
        failure: prevState => prevState,
      });
    default:
      return state;
  }
};
