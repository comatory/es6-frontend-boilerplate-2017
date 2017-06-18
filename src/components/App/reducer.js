import AppModel from './model';
import { CHANGE_BACKGROUND, CALL_ASYNC_ACTION_START, CALL_ASYNC_ACTION_END } from './actions';

export default function appReducer(state = new AppModel(), action) {
  switch (action.type) {
    case CHANGE_BACKGROUND:
      return state.set('background', `#${Math.random().toString(16).slice(2, 8).toUpperCase()}`);
    case CALL_ASYNC_ACTION_START:
      return state.set('requestStatus', 'Fake request is running...');
    case CALL_ASYNC_ACTION_END:
      return state.set('requestStatus', 'Fake request finished!');
    default:
      return state;
  }
}
