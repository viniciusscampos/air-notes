import R from 'ramda';

const server_url = 'https://sj29y9t4xg.execute-api.us-east-1.amazonaws.com/dev/';

console.log(server_url);


export async function get(route, headers = {}) {
  return await fetchData( server_url + route,'GET', headers);
}

export async function post(route, data, headers = {}) {
  return await fetchData(server_url + route, 'POST', data, headers);
}

export async function put(route, data, headers = {}) {
  return await fetchData(server_url + route, 'PUT', data, headers);
}

export async function del(route, data, headers = {}) {
  return await fetchData(server_url + route, 'DELETE', data, headers);
}

function fetchData(route, method, data = {}, addHeaders = {}) {
  const params = {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...addHeaders
    },
    body: JSON.stringify(data)
  };
  return fetch(route, (method == 'GET' ? R.omit('body', params) : params) );
}


const api = {
  get,
  post,
  put,
  del
};

export default api;
