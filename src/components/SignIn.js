import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from '../utils/customFetch';
import { validateToken } from '../redux/actions/sessionActions';
import './SignIn.scss';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      loginLoading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;
    this.props.validateToken(history);
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ loading: false });
    const authorized = (nextProps.session.error !== this.props.session.error
    && nextProps.session.error === null);
    if (authorized) {
      const { history } = this.props;
      history.push('/');
    }
  }
  handleSubmit(e) {
    e.preventDefault();


    this.setState({ loginLoading: true });
    const values = {};
    const { history } = this.props;
    axios.post('login', values)
      .then((response) => {
        this.setState({ loginLoading: false });
        if (response) {
          // Redirect
          history.replace('/');
        }
      })
      .catch((myError) => {
        this.setState({ loginLoading: false });
        if (myError) {
          console.log(myError);
        }
      });
  }
  render() {
    return (
      <div className="container-form">

        <form onSubmit={this.handleSubmit} className="signIn-form" >
          <input type="text" name="username" placeholder="Username" />

          <button type="primary" htmlType="submit" className="signIn-form-button" size="large" loading={this.state.loginLoading}>
                Ingresar
          </button>
        </form>
      </div>
    );
  }
}
SignIn.propTypes = {
  redirectOnLogin: PropTypes.func.isRequired,
  validateToken: PropTypes.func.isRequired,
  session: PropTypes.shape({
    user: PropTypes.any,
    status: PropTypes.string,
    error: PropTypes.string,
    loading: PropTypes.bool,
    token: PropTypes.string
  }).isRequired,
  history: PropTypes.shape({
    action: PropTypes.string.isRequired,
    block: PropTypes.func.isRequired,
    createHref: PropTypes.func.isRequired,
    go: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    goForward: PropTypes.func.isRequired,
    listen: PropTypes.func.isRequired,
    length: PropTypes.number.isRequired,
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired,
      hash: PropTypes.string.isRequired,
      state: PropTypes.object
    }).isRequired
  }).isRequired
};

function mapStateToProps(state) {
  return {
    session: state.session
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ validateToken }, dispatch);
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));
