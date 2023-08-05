/*
 * @Descripttion:
 * @version:
 * @Author: sueRimn
 * @Date: 2023-07-30 12:33:58
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-08-02 17:10:58
 */
import { ConsultType, IllnessTime, OrderType } from '@/enums'
// 关注的目标类型：topic百科话题,knowledge百科文章,doc医生,disease疾病
export type FollowType = 'topic' | 'knowledge' | 'doc' | 'disease'

// props类型 recommend推荐，fatReduction减脂，food健康饮食，like关注医生页面文章
export type KnowledgeType = 'like' | 'recommend' | 'fatReduction' | 'food'

export type Consult = {
  /** 问诊记录 */
  id: string
  /** 问诊类型 */
  type: ConsultType
  /** 快速问诊类型, 0 普通 1 三甲 */
  illnessType: 0 | 1
  /** 科室ID */
  depId: string
  /** 疫病描述 */
  illnessDesc: string
  /** 疾病持续时间 */
  illnessTime: IllnessTime
  /** 是否就诊过, 0 未就诊过 1 就诊过 */
  consultFlag: 0 | 1
  /** 图片数组 */
  pictures: Image[]
  /** 患者ID */
  patientId: string
  /** 优惠卷ID */
  couponId: string
}

export type Patient = {
  /* 年龄 */
  age?: number
  /* 患者ID */
  id: string
  /* 患者名称 */
  name: string
  /* 身份证号 */
  idCard: string
  /* 0 不默认 1 默认 */
  defaultFlag: 0 | 1
  /* 0 女  1 男 */
  gender: 0 | 1
  /* 性别文字 */
  genderValue?: string
}

// Partial<T> 把一个对象的属性转换成为可选
export type ParialConsult = Partial<Consult>

// 病情描述对象
type ConsultIllness = Pick<
  ParialConsult,
  'illnessDesc' | 'illnessTime' | 'consultFlag' | 'pictures'
>

// 图片列表
export type Image = {
  /** 图片ID */
  id: string
  /** 图片地址 */
  url: string
}
// 医生卡片对象
export type Doctor = {
  /** 医生ID */
  id: string
  /** 医生名称 */
  name: string
  /** 头像 */
  avatar: string
  /** 医院名称 */
  hospitalName: string
  /** 医院等级 */
  gradeName: string
  /** 科室 */
  depName: string
  /** 职称 */
  positionalTitles: string
  /** 是否关注，0 未关注 1 已关注 */
  likeFlag: 0 | 1
  /** 接诊服务费 */
  serviceFee: number
  /** 接诊人数 */
  consultationNum: number
  /** 评分 */
  score: number
  /** 主攻方向 */
  major: string
}

export type Knowledge = {
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
  // id: string
  // /** 标题 */
  // title: string
  // /** 封面[] */
  // coverUrl: string[]
  // /** 标签[] */
  // topic: string[]
  // /** 收藏数 */
  // collectionNumber: number
  // /** 评论数 */
  // commentNumber: number
  // /** 医生名称 */
  // creatorName: string
  // /** 医生头像 */
  // creatorAvatar: string
  // /** 医生医院 */
  // creatorHospatalName: string
  // /** 关注文章 */
  // likeFlag: 0 | 1
  // /** 内容 */
  // content: string
  // /** 医生科室 */
  // creatorDep: string
  // /** 医生职称 */
  // creatorTitles: string
  // /** 医生ID */
  // creatorId: string
}

// 问诊订单单项信息
export type ConsultOrderItem = Consult & {
  /** 创建时间 */
  createTime: string
  /** 医生信息 */
  docInfo?: Doctor
  /** 患者信息 */
  patientInfo: Patient
  /** 订单编号 */
  orderNo: string
  /** 订单状态 */
  status: OrderType
  /** 状态文字 */
  statusValue: string
  /** 类型问诊文字 */
  typeValue: string
  /** 倒计时时间 */
  countdown: number
  /** 处方ID */
  prescriptionId?: string
  /** 评价ID */
  evaluateId: number
  /** 应付款 */
  payment: number
  /** 优惠券抵扣 */
  couponDeduction: number
  /** 积分抵扣 */
  pointDeduction: number
  /** 实付款 */
  actualPayment: number
}

export type getPatientPreData = {
  payment: number
  couponDeduction: number
  couponId?: any
  pointDeduction: number
  actualPayment: number
}
