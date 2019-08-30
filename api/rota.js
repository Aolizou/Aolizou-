import axios from 'axios';

const axiosConfig = {
  withCreditial: true,
};

const domain = process.env.NODE_ENV === 'production' ? '' : 'http://192.168.43.81:8080';
// const domain = ''

// todo: 这里需要判断code为未登录的情况，把全局的store给置为未登陆的状态

/**
 * 这里也可以使用axios的中间件进行异常处理
 * @param {请求地址} url
 * @param {请求参数} params
 * @param {是否忽略异常？（响应statusCode不做处理）} ignore
 */
let get = (url, params, ignore = false) => {
  params = Object.keys(params).map(key => `${ key }=${ params[key] }`).join("&");
  if (params) {
    if (url.includes("?")) {
      url = url + "&" + params;
    } else {
      url = url + "?" + params;
    }
  }
  let success = (res) => {
    let {
      code,
      message,
      data,
    } = res.data;
    if (ignore) {
      return Promise.resolve(res);
    }
    code = parseInt(code);
    if (code !== 200) {
      return Promise.reject(message);
    }
    return Promise.resolve(data);
  };
  let fail = (e) => {
    return Promise.reject(typeof e === "string" ? e : "发生异常");
  };
  return axios.get(domain + url, axiosConfig).then(success).catch(fail);
};

let post = (url, params) => {
  let success = (res) => {
    // let {
    //   code,
    //   message,
    //   data,
    // } = res.data;
    // if (ignore) {
    //   return Promise.resolve(res);
    // }
    // code = parseInt(code);
    // if (code !== 200) {
    //   return Promise.reject(message);
    // }
    return Promise.resolve(res);
  };
  let fail = (err) => {
    return Promise.reject(typeof err === "string" ? err : "发生异常");
  };
  return axios.post(domain + url, params, axiosConfig).then(success).catch(fail);
};

export default {
  get,
  post,
};