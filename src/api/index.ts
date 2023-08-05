import http from '@/utils/request'
import * as TS from '@/api/TS'
import type { ParialConsult, Image } from '@/types/consult'

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

// 获取选择科室列表/dep/all
export const getDepAll = () =>
  http.get<TS.depRootObject>('/dep/all').then((res) => res.data)

// 上传图片/upload
export const UploadImage = (params: File) => {
  const fd = new FormData()
  fd.append('file', params)
  return http.post<TS.uploadRootObject>('/upload', fd).then((res) => res.data)
}

// 问诊-支付页面-计算就诊信息和抵扣信息/patient/consult/order/pre
export const getPatientPre = (params: ParialConsult) =>
  http
    .get<TS.getPatientPreRootObject>('/patient/consult/order/pre', params)
    .then((res) => res.data)

// 问诊-查询患者详情/patient/info/
export const getPatientInfo = (params: string) =>
  http.get<TS.LoadRootObject>(`/patient/info/${params}`).then((res) => res.data)

// 问诊-保存修改问诊订单/patient/consult/order
export const getPatientOrder = (params: ParialConsult) =>
  http
    .post<TS.patientDataresdataRes>('/patient/consult/order', params)
    .then((res) => res.data)

// 订单支付接口
export const getConsultOrderPayUrl = (params: {
  paymentMethod: 0 | 1
  orderId: string | undefined
  payCallback: string
}) =>
  http
    .post<TS.UrlRootObject>('/patient/consult/pay', params)
    .then((res) => res.data)

// 问诊-查询订单详情信息/patient/consult/order/detail
export const getConsultOrderDetail = (params: { orderId: string }) =>
  http
    .get<TS.ressDataRootObject>('/patient/consult/order/detail', params)
    .then((res) => res.data)

// 查看处方
export const getPrescriptionPic = (id: string) =>
  http
    .get<{
      code: number
      message: string
      data: {
        url: string
      }
    }>(`patient/consult/prescription/${id}`)
    .then((res) => res.data)

export const evaluateConsultOrder = (data: {
  docId: string
  orderId: string
  score: number
  content: string
  anonymousFlag: 0 | 1
}) => http.post('patient/order/evaluate', data).then((res) => res.data)

export const uploadImage = (file: File) => {
  const fd = new FormData()
  fd.append('file', file)
  return http
    .post<{
      code: number
      message: string
      data: Image
    }>('upload', fd)
    .then((res) => res.data)
}
