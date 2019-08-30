import http from './config';

// 注册
export function register(params, success, fail) {
  return http.post("/user/register", params).then(success, fail);
}

// 登陆
export function login(params, success, fail) {
  return http.post("/user/login", params).then(success, fail);
}

// 更新密码
export function updatePwd(params, success, fail) {
  return http.post("/user/updatePassword", params).then(success, fail);
}

// 患者列表
export function getPatientList (params, success, fail) {
  return http.post("/patient/findPatient", params).then(success, fail);
}

// 删除患者
export function deletePatient(params, success, fail) {
  return http.post("/patient/deletePatient", params).then(success, fail);
}

// 新增患者
export function addPatient(params, success, fail) {
  return http.post("/patient/addPatient", params).then(success, fail);
}

// 获取预约列表
export function getBookingList(params, success, fail){
  return http.post("/booking/findBooking", params).then(success, fail);
}

// 取消预约
export function deleteBooking(params, success, fail){
  return http.post("/booking/deleteBooking", params).then(success, fail);
}

// 根据doctorId查询医生详情
export function findDoctorById(params, success, fail){
  return http.post("/doctor/findDoctorByDoctorId", params).then(success, fail);
}

// 获取所有科室列表
export function findAllSubject(params, success, fail) {
  return http.post("/subject/findAllSubject", params).then(success, fail);
}

// 获取科室详情
export function findSubjectById(params, success, fail) {
  return http.post("/subject/findSubjectById", params).then(success, fail);
}

// 根据科室id获取医生列表
export function findDoctorsBySubject(params, success, fail) {
  return http.post("/doctor/findDoctorsBySubject", params).then(success, fail);
}

// 根据关键词获取科室列表
// todo: 需要更换请求地址
export function getSubjectListByWords(params, success, fail) {
  return http.post("/subject/findSubjectByName", params).then(success, fail);
}

// 根据关键词获取医生列表
export function getDoctorListByWords(params, success, fail) {
  return http.post("/doctor/findDoctorsByDoctorNameLike", params).then(success, fail);
}
