import { connect } from 'react-redux';
import AppRouter from './router';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
});

export default connect(
  mapStateToProps
)(AppRouter);
