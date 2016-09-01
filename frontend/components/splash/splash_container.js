import { connect } from "react-redux";
import Splash from './splash';

const mapStateToProps = state => {
  return ({
    eventsList: state.events.eventsList
  });
};

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Splash);
