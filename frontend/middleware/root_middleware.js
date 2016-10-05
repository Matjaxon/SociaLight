import { applyMiddleware } from 'redux';
import SessionMiddleware from './session_middleware';
import EventsMiddleware from './events_middleware';
import TicketsMiddleware from './tickets_middleware';
import SearchMiddleware from './search_middleware';
// import createLogger from 'redux-logger';
// const loggerMiddleware = createLogger();

// Move "loggerMiddleware" into the RootMiddleware object to show state changes
// loggerMiddleware,

const RootMiddleware = applyMiddleware(
  SessionMiddleware,
  EventsMiddleware,
  TicketsMiddleware,
  SearchMiddleware
);

export default RootMiddleware;
