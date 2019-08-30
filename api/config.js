import axios from 'axios';

const axiosConfig = {
  withCreditial: true,
};

// 链条的接口地址是多少
const domain = process.env.NODE_ENV === 'production' ? '' : 'http://192.168.43.81:8080';

const json2formdata = params => {
  if(typeof params !== "object" || params === null) {
    throw new Error("expect params to be an Object, but failed");
  }
  let form = new FormData();
  Object.keys(params).forEach(key => form.append(key, params[key]));
  return form;
};

const param2url = params => {
  let keys = Object.keys(params);
  return '?' + keys.map(key => `${key}=${params[key] || ''}`).join("&")
}

// todo: 这里需要判断code为未登录的情况，把全局的store给置为未登陆的状态

/**
 * 这里也可以使用axios的中间件进行异常处理
 * @param {请求地址} url 
 * @param {请求参数} params 
 * @param {是否忽略异常？（响应statusCode不做处理）} ignore 
 */
let get = (url, params, ignore = false) => {
  params = Object.keys(params).map(key => `${key}=${params[key]}`).join("&");
  if(params){
    if(url.includes("?")){
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
    if(ignore) {
      return Promise.resolve(res);
    }
    code = parseInt(code);
    if(code !== 200) {
      return Promise.reject(message);
    }
    return Promise.resolve(data);
  };
  let fail = (e) => {
    return Promise.reject(typeof e === "string" ? e : "发生异常");
  };
  return axios.get(domain + url, axiosConfig).then(success).catch(fail);
};

let post = (url, params, ignore = false) => {
  let success = (res) => {
    if(parseInt(res.status) !== 200) {
      return Promise.reject("发生异常");
    }
    // if(ignore) {
    //   return Promise.resolve(res);
    // }
    // code = parseInt(code);
    // if(code !== 200) {
    //   return Promise.reject(message);
    // }
    return Promise.resolve(res.data);
  };
  let fail = (err) => {
    return Promise.reject(typeof err === "string" ? err : "发生异常");
  };
  // 如果需要将请求参数设置为FormData 的话
  // return axios.post(domain + url + param2url(params), {}, axiosConfig).then(success).catch(fail);
  // return axios.post(domain + url, params, axiosConfig).then(success, fail).catch(fail);
  return axios.post(domain + url, json2formdata(params), axiosConfig).then(success, fail).catch(fail);
  // return axios.post(domain + url, params, axiosConfig).then(success, fail).catch(fail);
};

export default {
  get,
  post,
};