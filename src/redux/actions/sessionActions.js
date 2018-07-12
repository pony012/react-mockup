import axios from 'axios';
import axiosCustom from '../../utils/customFetch';
import ROOT_URL from '../../config';

export const ME_FROM_TOKEN = 'ME_FROM_TOKEN';
export const ME_FROM_TOKEN_SUCCESS = 'ME_FROM_TOKEN_SUCCESS';
export const ME_FROM_TOKEN_FAILURE = 'ME_FROM_TOKEN_FAILURE';


export const SIGNIN_USER = 'SIGNIN_USER';
export const SIGNIN_USER_SUCCESS = 'SIGNIN_USER_SUCCESS';
export const SIGNIN_USER_FAILURE = 'SIGNIN_USER_FAILURE';

export const TOKEN_STILL_VALID = 'TOKEN_STILL_VALID';
export const TOKEN_NOT_VALID = 'TOKEN_NOT_VALID';
export const VALIDATE_TOKEN = 'VALIDATE_TOKEN';
export const EMPTY_TOKEN = 'EMPTY_TOKEN';
export const RESET_TOKEN = 'RESET_TOKEN';
export const SET_JWT = 'SET_JWT';
export const LOGOUT_USER = 'LOGOUT_USER';

export function meToken() {
  return localStorage.getItem('token');
}
export function meFromTokenSuccess(currentUser) {
  return {
    type: ME_FROM_TOKEN_SUCCESS,
    payload: currentUser
  };
}

export function meFromTokenFailure(error) {
  return {
    type: ME_FROM_TOKEN_FAILURE,
    payload: error
  };
}

export function signInUser(formValues) {
  const request = axios.post(`${ROOT_URL}/login`, formValues);
  return {
    type: SIGNIN_USER,
    payload: request
  };
}
export function logoutUser(/* history */) {
  localStorage.removeItem('token');
  axiosCustom.post(`${ROOT_URL}/logout`, {});
  window.location.replace('/login');
  return {
    type: LOGOUT_USER
  };
}

export function emptyJWT() {
  return {
    type: EMPTY_TOKEN,
    payload: {
      error: 'Inicia sesión para continuar'
    }
  };
}
export function setToken(token, history) {
  localStorage.setItem('token', `Bearer ${token}`);
  history.push('/');
  return {
    type: SET_JWT,
    payload: {
      error: null
    }
  };
}
export function validateToken(history) {
  const { pathname } = history.location;
  const isSignInPath = (pathname === '/login');
  const token = localStorage.getItem('token');
  const emptyToken = (token === null);
  if (emptyToken && isSignInPath) {
    return emptyJWT();
  } else if (emptyToken && !isSignInPath) {
    window.location.replace('/login');
  }
  const req = axiosCustom.get('me');
  return {
    type: VALIDATE_TOKEN,
    payload: req
  };
}

export function signInUserSuccess(user) {
  return {
    type: SIGNIN_USER_SUCCESS,
    payload: user
  };
}

export function signInUserFailure(error) {
  return {
    type: SIGNIN_USER_FAILURE,
    payload: error
  };
}
