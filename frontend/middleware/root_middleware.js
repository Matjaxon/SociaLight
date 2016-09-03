import { applyMiddleware } from 'redux';
import SessionMiddleware from './session_middleware';
import EventsMiddleware from './events_middleware';
import TicketsMiddleware from './tickets_middleware';

const RootMiddleware = applyMiddleware(
  SessionMiddleware,
  EventsMiddleware,
  TicketsMiddleware
);

export default RootMiddleware;
