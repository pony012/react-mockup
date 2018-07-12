import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { bindActionCreators } from 'redux';
import Routes from './config/Routes';
import { validateToken } from './redux/actions/sessionActions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    this.handleRedirect = this.handleRedirect.bind(this);
  }
  componentDidMount() {
    this.handleRedirect();
    const { history } = this.props;
    this.props.validateToken(history);
  }
  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    const notNullErrorAuthorization = (nextProps.session.error !== this.props.session.error
        && nextProps.session.error !== null);
    if (notNullErrorAuthorization) {
      // const { history } = this.props;
      window.location.redirect('/login');
    } else {
      this.setState({ loading: false });
    }
  }
  render() {
    if (this.state.loading) {
      return null;
    }
    return (
      <Routes />
    );
  }
}
App.propTypes = {
  validateToken: PropTypes.func.isRequired,
  session: PropTypes.shape({
    user: PropTypes.any,
    status: PropTypes.string,
    error: PropTypes.string,
    loading: PropTypes.bool,
    token: PropTypes.string
  }).isRequired,
  history: ReactRouterPropTypes.history.isRequired
};
function mapStateToProps(state) {
  return {
    session: state.session
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ validateToken }, dispatch);
}
export default hot(module)(withRouter(connect(mapStateToProps, mapDispatchToProps)(App)));
