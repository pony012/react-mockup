import {
  ME_FROM_TOKEN,
  ME_FROM_TOKEN_SUCCESS,
  ME_FROM_TOKEN_FAILURE,
  RESET_TOKEN,
  SIGNIN_USER,
  SIGNIN_USER_SUCCESS,
  SIGNIN_USER_FAILURE,
  LOGOUT_USER,
  TOKEN_STILL_VALID,
  TOKEN_NOT_VALID,
  SET_JWT,
  VALIDATE_TOKEN,
  EMPTY_TOKEN
} from '../actions/sessionActions';

// user = userobj,
// status can be:
// 1. 'storage' ie. localstorage / sessionstorage)
// 2. 'signin' (signing in)
// 3. 'authenticated'(after signin)
// 4. 'logout' (after logout)

const INITIAL_STATE = {
  user: null,
  loading: false,
  token: null,
  error: ''
};

export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {
  case EMPTY_TOKEN:
    return {
      ...state,
      loading: false,
      error: action.payload.error
    };
  case VALIDATE_TOKEN: {
    if (action.error) {
      localStorage.removeItem('token');
      ({ error } = action.payload.response.data);
      return {
        ...state,
        error,
        loading: false
      };
    }
    return {
      ...state,
      token: localStorage.getItem('token'),
      error: null,
      loading: false,
      user: action.payload
    };
  }
  case SET_JWT:
    return {
      ...state,
      error: action.payload.error,
      loading: false
    };
  case TOKEN_STILL_VALID:
    return {
      ...state,
      token: action.payload.token,
      valid: action.payload.valid
    };
  case TOKEN_NOT_VALID:
    return {
      ...state,
      error: action.payload
    };
  case ME_FROM_TOKEN: // loading currentUser("me") from jwttoken in local/session storage storage,
    return {
      ...state,
      user: null,
      status: 'storage',
      error: null,
      loading: true
    };
  case ME_FROM_TOKEN_SUCCESS: // return user, status = authenticated and make loading = false
    return {
      ...state,
      user: action.payload.data.user,
      status: 'authenticated',
      error: null,
      loading: false
    }; // <-- authenticated
  case ME_FROM_TOKEN_FAILURE: // return error and make loading = false
    error = action.payload.data || {
      message: action.payload.message
    }; // 2nd one is network or server down errors
    return {
      ...state,
      user: null,
      status: 'storage',
      error,
      loading: false
    };
  case RESET_TOKEN: // remove token from storage make loading = false
    return {
      ...state,
      user: null,
      status: 'storage',
      error: null,
      loading: false
    };
  case SIGNIN_USER: // sign in user,  set loading = true and status = signin
    return {
      ...state,
      user: null,
      status: 'signin',
      error: null,
      loading: true
    };
  case SIGNIN_USER_SUCCESS:
    // return authenticated user,  make loading = false and status = authenticated
    return {
      ...state,
      user: action.payload.user,
      status: 'authenticated',
      error: null,
      loading: false
    }; // <-- authenticated
  case SIGNIN_USER_FAILURE: // return error and make loading = false
    error = action.payload.data || {
      message: action.payload.message
    }; // 2nd one is network or server down errors
    return {
      ...state,
      user: null,
      status: 'signin',
      error,
      loading: false
    };

  case LOGOUT_USER:
    return {
      ...state,
      error: null,
      loading: false
    };
  default:
    return state;
  }
}
