import http from '@/utils/request'
import * as TS from '@/api/TS'

// 登录接口
export const getLogin = (params: TS.UserFrom) =>
  http.post<TS.RootObject>('/login/password', params).then((res) => res.data)

// 获取关注的医生列表
export const getHomePageDoc = (params: TS.HomePageDocParams) =>
  http
    .get<TS.HomePageDocRootObject>('/home/page/doc', params)
    .then((res) => res.data)

// 点击关注医生按钮
export const followOrUnfollow = (params: TS.HomePageDocdata) =>
  http
    .post<TS.followOrUnfollowRootObject>('/like', params)
    .then((res) => res.data)

// 首页列表数据/patient/home/knowledge
export const patientKnowledge = (params: TS.pageDataList) =>
  http
    .get<TS.pageDataListRootObject>('/patient/home/knowledge', params)
    .then((res) => res.data)

//  获取我的数据/patient/myUser
export const getPatientmyUser = () =>
  http
    .get<TS.getPatientmyUserRootObject>('/patient/myUser')
    .then((res) => res.data)

// 获取家庭档案信息列表/patient/mylist
export const getPatientMylist = () =>
  http.get<TS.getPatientMylistData>('/patient/mylist').then((res) => res.data)

// 添加家庭档案信息/patient/add
export const addPatientAdd = (params: TS.patientData) =>
  http
    .post<TS.patientDataresdata>('/patient/add', params)
    .then((res) => res.data)

// 编辑患者信息/patient/update
export const updataPatientUpdate = (params: TS.patientData) =>
  http
    .put<TS.patientDataresdata>('/patient/update', params)
    .then((res) => res.data)

// 删除患者信息/patient/del
export const delPatientDel = (params: TS.patientDatares) =>
  http
    .delete<TS.getPatientMylistData>(`/patient/del/${params.id}`)
    .then((res) => res.data)

// 问诊记录-订单列表-找医生/patient/consult/order/list
export const getConsultList = (params: TS.HomePageDocParams) =>
  http
    .get<TS.getConsultListRootObject>('/patient/consult/order/list', params)
    .then((res) => res.data)
