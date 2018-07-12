import React, { Component } from 'react';
import { Modal } from 'antd';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import NotificationList from '../Notifications/NotificationList';
import { logoutUser } from '../../redux/actions/sessionActions';
import './HorizontalMenu.scss';

const { confirm } = Modal;
const logo = require('../../assets/img/french-logo.png');

class HorizontalMenu extends Component {
  constructor(props) {
    super(props);
    this.handleOnclickMenu = this.handleOnclickMenu.bind(this);
  }
  handleOnclickMenu(e) {
    const { key } = e;
    switch (key) {
    case 'logout': {
      const { history } = this.props;
      confirm({
        title: 'Aviso',
        content: '¿Estas seguro de terminar la sesión?',
        onOk() {
          logoutUser(history);
        },
        onCancel() {
        }
      });
      break;
    }
    default:
      break;
    }
  }
  render() {
    const { user } = this.props.session;
    return (
      <nav className="main-menu">
        <div className="main-menu__wrapper main-menu__wrapper--upper">
          <div className="main-menu__upper">
            <input type="checkbox" id="burger-shower" className="hamburger__input" />
            <div className="main-menu__links main-menu__links--left">
              <div className="main-menu__upper__logo">
                <img alt="French" src={logo} />
              </div>
              <ul>
                <li>
                  <a href="/nosotros">Nosotros</a>
                </li>
                <li>
                  <a href="/como-funciona">Cómo funciona</a>
                </li>
                <li>
                  <a href="/el-curso">El curso</a>
                </li>
              </ul>
            </div>
            <div className="main-menu__links">
              <ul>
                <li>
                  <div className="main-menu__user">
                    {
                      user && user.photo && (
                        <img className="main-menu__user__photo" alt="User" src={user.photo} />
                      )
                    }
                    <div className="main-menu__user__name">{user && user.firstName}</div>
                  </div>
                </li>
                <li>
                  <div className="main-menu__upper__right-links__class">
                    <div className="main-menu__upper__right-links__class__button" />
                    <div className="main-menu__upper__right-links__class__text">Iniciar clase</div>
                  </div>
                </li>
                <li>
                  <a href="/el-curso">El curso</a>
                </li>
              </ul>
            </div>
            <label htmlFor="burger-shower" className="hamburger">
              <hr />
              <hr />
              <hr />
            </label>
          </div>
        </div>
        {
          user && (
            <div className="main-menu__wrapper main-menu__wrapper--lower">
              <div className="main-menu__lower__wrapper">
                <div className={`main-menu__lower main-menu__lower--${user && (user.roleId === 1 ? 'student' : 'professor')}`}>
                  <div className="main-menu__links main-menu__links--left">
                    <ul>
                      <li>
                        <a href="/nosotros">Nosotros</a>
                      </li>
                      <li>
                        <a href="/como-funciona">Cómo funciona</a>
                      </li>
                      <li>
                        <a href="/el-curso">El curso</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </nav>
    );
  }
}
HorizontalMenu.propTypes = {
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
  }).isRequired,
  session: PropTypes.shape().isRequired
};
function mapStateToProps(state) {
  return {
    session: state.session
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logoutUser }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HorizontalMenu));
