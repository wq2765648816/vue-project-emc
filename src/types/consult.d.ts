import { ConsultType } from '@/enums'
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
  /** 是否就诊过, 0 未就诊过 1 就诊过 */
  consultFlag: 0 | 1
  /** 图片数组 */
  pictures: Image[]
  /** 患者ID */
  patientId: string
  /** 优惠卷ID */
  couponId: string
}

// Partial<T> 把一个对象的属性转换成为可选
export type ParialConsult = Partial<Consult>

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
