import { combineReducers } from "redux";
import SessionReducer from './session_reducer';
import EventsReducer from './events_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  events: EventsReducer
});

export default RootReducer;
