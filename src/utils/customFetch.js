import isEmpty from 'lodash/isEmpty';
import axios from 'axios';
import ROOT_URL from '../config';

class CustomFetch {
  static formattingRequestOptions(body) {
    let formattedBody = {};
    const newHeaders = {};
    if (!isEmpty(body) && !(body instanceof FormData)) {
      Object.keys(body).forEach((key) => {
        if (typeof body[key] === 'string') {
          formattedBody[key] = body[key].trim();
        } else {
          formattedBody[key] = body[key];
        }
      });
      formattedBody = JSON.stringify(formattedBody);
    } else if (!isEmpty(body) && body instanceof FormData) {
      formattedBody = body;
    }

    if (!(body instanceof FormData)) {
      newHeaders['Content-Type'] = 'application/json';
    }

    return {
      headers: newHeaders,
      body: formattedBody
    };
  }

  constructor() {
    if (!CustomFetch.instance) {
      this._data = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `${localStorage.getItem('token')}`
        }
      };
      CustomFetch.instance = this;
    }
    this.setAccessToken = this.setAccessToken.bind(this);
    this.errorHandler = this.errorHandler.bind(this);
    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.delete = this.delete.bind(this);
    return CustomFetch.instance;
  }

  setAccessToken(accessToken) {
    if (accessToken && accessToken !== null &&
      accessToken !== 'null' && accessToken !== '') {
      this._data.headers.authorization = accessToken;
    }
  }

  errorHandler(response) {
    const authToken = response.headers.authorization;
    if (authToken) {
      localStorage.setItem('token', `Bearer ${authToken}`);
      this.setAccessToken(`Bearer ${authToken}`);
    }

    if (response.status >= 200 && response.status < 300) {
      // if (authToken) {
      //   localStorage.setItem('token', `Bearer ${authToken}`);
      // }
      if (response.status === 204) {
        return new Promise((resolve) => {
          resolve({});
        });
      }
    } else {
      const error = {
        data: response.data,
        statusCode: response.status
      };
      throw error;
    }

    return response.data;
  }

  get(route, headers = this._data.headers) {
    return axios.get(`${ROOT_URL}/${route}`, {
      headers: {
        ...this._data.headers,
        ...headers
      }
    })
      .then(this.errorHandler);
  }

  post(route, body = {}, headers = this._data.headers) {
    const newOptions = CustomFetch.formattingRequestOptions(body);
    return axios.post(
      `${ROOT_URL}/${route}`,
      newOptions.body,
      {
        headers: {
          ...this._data.headers,
          ...headers,
          ...newOptions.headers
        }
      }
    )
      .then(this.errorHandler);
  }

  put(route, body = {}, headers = this._data.headers) {
    const newOptions = CustomFetch.formattingRequestOptions(body);
    return axios.put(
      `${ROOT_URL}/${route}`,
      newOptions.body,
      {
        headers: {
          ...this._data.headers,
          ...headers,
          ...newOptions.headers
        }
      }
    )
      .then(this.errorHandler);
  }

  delete(route, body = {}, headers = this._data.headers) {
    const newOptions = CustomFetch.formattingRequestOptions(body);
    return fetch(`${ROOT_URL}/${route}`, {
      method: 'DELETE',
      headers: {
        ...this._data.headers,
        ...headers,
        ...newOptions.headers
      },
      body: newOptions.body
    })
      .then(this.errorHandler);
  }
}

const instance = new CustomFetch();
Object.freeze(instance);

export default instance;
