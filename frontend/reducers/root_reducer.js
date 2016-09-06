import { combineReducers } from "redux";
import SessionReducer from './session_reducer';
import EventsReducer from './events_reducer';
import TicketsReducer from './tickets_reducer';
import SearchReducer from './search_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  events: EventsReducer,
  tickets: TicketsReducer,
  search: SearchReducer
});

export default RootReducer;
