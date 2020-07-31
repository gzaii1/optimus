import axios from 'axios'
import store from 'storejs'

axios.defaults.withCredentials = true

const baseUrl = process.env.NODE_ENV === "development"?
  "api/v1/":
  'http://100.98.97.86:80/api/v1/'

const MethodType = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH:'PATCH'
}
 
/**
 * 模块说明:有api_token的请求
 */
const request = (method = MethodType.GET, identity = false) => { 
  // identity = true
  const apiToken = store.get('token')
  method = method.toUpperCase();
  let headers = 
  identity?
  {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiToken}`,
  }:{
    'Content-Type': 'application/json',
  }

  return function(api, params = {}, config = {}){
    if (config.headers) {
        headers = {
          ...headers,
          ...config.headers
        }
    }

    return new Promise((resolve, reject) => {
        axios({
          url: baseUrl + api,
          method, 
          ...params,
          headers,
        }).then(resolve)
          .catch(error => {
            console.dir(error)
            // Message.error(typeof error.response.data === 'string' ? error.response.data : JSON.stringify(error.response.data))
            reject(error)
          })
      })
  }
  
}

export {
  baseUrl, 
  MethodType,
  request
}