import Main from '../views/main';
import Home from '../views/home';
import Introduce from '../views/introduce';
import Rota from '../views/rota/rota';
import RotaNotice from '../views/rota/notice'
import RotaSubject from '../views/rota/subject'
import RotaRoster from '../views/rota/roster'
import RotaOrder from '../views/rota/order'
import RotaBooking from '../views/rota/booking'
// import OfficeType from '../views/officetype';
// import OfficeWork from '../views/officework';
import Help from '../views/help';
import UserCenter from '../views/usercenter';
import User from '../views/usercenter/user';
import Pwd from '../views/usercenter/pwd';
import Appointment from '../views/usercenter/appointment';
import Login from '../views/login';
import Register from '../views/register';
import usualHelp from '../views/help/usualHelp';
import orderHelp from '../views/help/orderHelp';
import homePage from '../views/homepage';
import SubjectDetail from '../views/subjectDetail';
import DoctorDetail from '../views/doctorDetail';
import SearchDetail from '../views/searchDetail';


export default [
  { 
    path: '/homepage', 
    component: homePage,
  },
  { 
    path: '/', 
    component: Main,
    children: [
      {
        path: '/',
        redirect: '/homepage',
      },
      {
        path: '/home',
        component: Home,
      },
      {
        path: '/introduce',  // 医院信息介绍
        component: Introduce,
      },
      {
        path: '/rota',
        redirect: '/rota/notice',
        component: Rota, // 预约挂号
        children: [
          {
            path: '/rota/notice',
            component: RotaNotice, // 预约须知
          },
          {
            path: '/rota/subject',
            component: RotaSubject, // 科室列表
          },
          {
            path: '/rota/roster/:id',
            component: RotaRoster, // 医生值班表
          },
          {
            path: '/rota/order/:id',
            component: RotaOrder, // 预约页
            meta: {requireAuth: true,},
          },
          {
            path: '/rota/booking/:id',
            component: RotaBooking, // 预约页
            meta: {requireAuth: true,},
          }
        ]
      },
      {
        path: '/subjectdetail/:id',
        component: SubjectDetail, // 科室详情
      },
      {
        path: '/doctordetail/:id',
        component: DoctorDetail, // 科室详情
      },
      {
        path: '/searchdetail/:text',
        component: SearchDetail, // 查询详情
      },
      // {
      //   path: '/officework',
      //   component: OfficeWork, // 科室排班
      // },
      {
        path: '/help',
        component: Help, // 系统帮助
        children: [
          {
            path: '/help/usualHelp',
            component: usualHelp, //常见问题
          },
          {
            path: '/help/orderHelp',
            component: orderHelp, //预约流程
          }
        ]
      },
      {
        path: '/usercenter',
        component: UserCenter, // 用户中心
        children: [
          {
            path: '/usercenter/user',
            component: User, // 患者管理
            meta: {requireAuth: true,},
          },
          {
            path: '/usercenter/appointment',
            component: Appointment, // 预约管理
            meta: {requireAuth: true,},
          },
          {
            path: '/usercenter/pwd',
            component: Pwd, // 修改密码
            meta: {requireAuth: true,},
          },
        ],
      },
      {
        path: '/login', // 登陆界面
        component: Login,
      },
      {
        path: '/register', // 注册界面
        component: Register,
      },
    ],
  },
  // 全部重定向到首页
  {
    path: '*',
    redirect: '/homepage',
  },
];