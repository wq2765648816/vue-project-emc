import type { KnowledgeType } from '@/types/consult'

// 用户账号密码
interface UserFrom {
  password: string | number
  mobile: string | number
}

// 登录返回值
interface Data {
  token: string
  id: string
  account: string
  mobile: string
  avatar: string
  refreshToken: string
}

interface RootObject {
  code: number
  message: string
  data: Data
}

// 获取关注的医生列表
interface HomePageDocParams {
  type?: string
  current: number
  pageSize: number
}

interface Row {
  likeFlag: 0 | 1
  id: string
  name: string
  avatar: string
  major: string
  score: string
  consultationNum: string
  serviceFee: string
  positionalTitles: string
  hospitalName: string
  gradeName: string
  depName: string
}
interface HomePageDocList {
  list: Row[]
}

interface HomePageDocData {
  rows: Row[]
  total: number
  pageTotal: number
}

interface HomePageDocRootObject {
  code: number
  message: string
  data: HomePageDocData
}

interface HomePageDocdata {
  id: string
  type: string
}

interface followOrUnfollowData {
  id: string
}

interface followOrUnfollowRootObject {
  code: number
  message: string
  data: followOrUnfollowData
}

// 首页列表
interface pageDataList {
  type: KnowledgeType
  current: number
  pageSize: number
}

interface pageDataListRow {
  commentNumber: number
  likeFlag: number
  creatorName: string
  creatorAvatar: string
  creatorTitles: string
  creatorHospatalName: string
  creatorDep: string
  hospatalGrade: string
  id: string
  content: string
  coverUrl: string[]
  creatorId: string
  title: string
  topic: string
  collectionNumber: string
}

interface pageDataListData {
  rows: pageDataListRow[]
  total: number
  pageTotal: number
}

interface pageDataListRootObject {
  code: number
  message: string
  data: pageDataListData
}

type pageDataListRowList = pageDataListRow[]

// 获取我的页面数据
export interface ConsultationInfo {
  orderId: string
  id: string
  likeFlag: number
  name: string
  avatar: string
  major: string
  score: string
  consultationNum: string
  serviceFee: string
  positionalTitles: string
  hospitalName: string
  gradeName: string
  depName: string
}

interface OrderInfo {
  paidNumber: number
  receivedNumber: number
  shippedNumber: number
  finishedNumber: number
}

interface getPatientmyUserData {
  couponNumber: number
  score: number
  likeNumber: number
  collectionNumber: number
  account: string
  avatar: string
  id: string
  mobile: string
  consultationInfo: ConsultationInfo[]
  orderInfo: OrderInfo
}

interface UserData {
  userData: getPatientmyUserData
}

interface getPatientmyUserRootObject {
  code: number
  message: string
  data: getPatientmyUserData
}

// 获取家庭档案数据列表
interface patientData {
  name: string
  idCard: string
  gender: number
  id?: string
  defaultFlag: boolean | number
  age?: number
  /** 性别文字 */
  genderValue?: string
}

interface getPatientMylistDataList {
  list: patientData[]
}

interface getPatientMylistData {
  code: number
  message: string
  data: patientData[]
}

// 家庭档案

interface patientDatares {
  id: string | undefined
}

interface patientDataresdata {
  code: number
  success?: boolean
  message: string
  data?: patientDatares
}

// 问诊记录
interface getConsultListPatientInfo {
  name: string
  idCard: string
  gender: number
  genderValue: string
  age: number
  id: string
}

interface getConsultListDocInfo {
  name: string
}

interface getConsultListRow {
  id: string
  orderNo: string
  type: string
  typeValue: string
  createTime: string
  patientInfo: getConsultListPatientInfo
  illnessDesc: string
  docInfo: getConsultListDocInfo
  status: number
  statusValue: string
  cancelReason: string
  cancelReasonValue: string
  cancelProcess: string
  payment: number
  evaluateId?: any
  illnessTime: number
  consultFlag: number
  prescriptionId?: string
}

interface getConsultListlist {
  list: getConsultListRow[]
}

interface getConsultListData {
  total: number
  pageTotal: number
  rows: getConsultListRow[]
}

interface getConsultListRootObject {
  code: number
  message: string
  data: getConsultListData
}

// 获取选择科室数据
interface depChild {
  id: string
  name: string
  avatar: string
}

interface depData {
  id: string
  name: string
  child: depChild[]
}

interface depDataList {
  lists: depData[]
}

interface depRootObject {
  code: number
  message: string
  data: depData[]
}

export type {
  depDataList,
  depData,
  depRootObject,
  getConsultListRow,
  getConsultListRootObject,
  getConsultListlist,
  patientDatares,
  patientDataresdata,
  patientData,
  getPatientMylistDataList,
  getPatientmyUserData,
  pageDataListRow,
  pageDataListRowList,
  pageDataListRootObject,
  followOrUnfollowRootObject,
  pageDataList,
  Row,
  HomePageDocRootObject,
  UserFrom,
  RootObject,
  HomePageDocParams,
  HomePageDocList,
  HomePageDocdata,
  getPatientmyUserRootObject,
  UserData,
  getPatientMylistData
}
