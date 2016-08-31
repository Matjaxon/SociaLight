import { applyMiddleware } from 'redux';
import SessionMiddleware from './session_middleware';
import EventsMiddleware from './events_middleware';

const RootMiddleware = applyMiddleware(
  SessionMiddleware,
  EventsMiddleware
);

export default RootMiddleware;
