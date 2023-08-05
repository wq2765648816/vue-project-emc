// 用户信息
export type User = {
  /** token令牌 */
  token: string
  /** 用户ID */
  id?: string
  /** 用户名称 */
  account?: string
  /** 手机号 */
  mobile?: string
  /** 头像 */
  avatar?: string
}
// 家庭档案-患者信息
export type Patient = {
  /** 患者ID */
  id?: string
  /** 患者名称 */
  name: string
  /** 身份证号 */
  idCard: string
  /** 0不默认  1默认 */
  defaultFlag: 0 | 1
  /** 0 女  1 男 */
  gender: 0 | 1
  /** 性别文字 */
  genderValue?: string
  /** 年龄 */
  age?: number
}
