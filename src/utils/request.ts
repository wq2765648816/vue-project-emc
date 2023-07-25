import axios, {
  type AxiosInstance,
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse
} from 'axios'
import { showDialog } from 'vant'
import router from '@/router/index'
import * as TS from './defind'
// 先导入vuex,因为我们要使用到里面的状态对象
// vuex的路径根据自己的路径去写
import { userStore } from '../stores'
// 数据返回的接口

const URL: string = ''

//配置axios的请求
const config = {
  // 默认地址
  baseURL: URL as string,
  // 设置超时时间
  timeout: TS.RequestEnums.TIMEOUT as number,
  // 跨域时候允许携带凭证
  withCredentials: false
}

/**用类名注释类的对象 */
class RequestHttp {
  // 定义成员变量并指定类型
  service: AxiosInstance
  // 设置公共的类名放置传参
  public constructor(config: AxiosRequestConfig) {
    /**实例化axios */
    this.service = axios.create(config)
    /**
     * 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     * token校验(JWT) : 接受服务器返回的token,存储到vuex本地储存当中
     */
    this.service.interceptors.request.use(
      (config) => {
        // 添加token
        //@ts-ignore
        /**去了公司可以根据接口文档实际更改 */
        //@ts-ignore
        config.headers['Authorization'] = userStore.user.token
        return config
      },
      (error: AxiosError) => {
        // 请求报错
        Promise.reject(error)
      }
    )
    /**
     * 响应拦截器
     * 服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */

    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data, config } = response // 解构
        /**
         * token 过期了,需要我们重新返回登录页面
         * meta.status,根据实际打印出的东西做更改
         */
        if (data.meta.status === TS.RequestEnums.UNAUTHORIZED) {
          // 登录信息失效，应跳转到登录页面，并清空本地的token
          userStore.delUser()
          router.replace('/login')
          return Promise.reject(data)
        } // 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
        return data
      },
      (error: AxiosError) => {
        const { response } = error
        let title: string = ''
        let message: string = ''

        if (error && response) {
          message = response.statusText
          // 401, token失效
          /**
           * status根据公司后台封装进行修改
           */
          if (response.status === TS.RequestEnums.UNAUTHORIZED) {
            router.replace({
              name: 'login'
            })
          }
          switch (
            response.status // 跨域存在获取不到状态码的情况,status根据公司后台封装进行修改
          ) {
            case TS.RequestEnums.BADREQUEST:
              title = '错误请求'
              break
            case TS.RequestEnums.UNAUTHORIZED:
              title = '资源未授权'
              break
            case TS.RequestEnums.NOTFOUND:
              title = '未找到所请求的资源'
              break
            case TS.RequestEnums.ERROR:
              title = '内部服务器错误'
              break
            default:
              title = message
          }
          /**这个提示框,根据当前公司使用的ui框进行更改 */
          return showDialog({
            title: '标题',
            message: title
          }).then(() => {
            // on close
          })
        } else {
          // 跨域获取不到状态码或者其他状态进行的处理
          /**这个提示框,根据当前公司使用的ui框进行更改 */
          return showDialog({
            title: '标题',
            message: '未知错误,请联系管理员'
          }).then(() => {
            // on close
          })
        }
      }
    )
  }

  /**以下封装自定义的方法 */
  public adUrl(url: string) {
    /**
     * process.env.VUE_APP_BASE_API
     * VUE_APP_BASE_API根据公司时间情况做修改
     * 如果你的公司没有封装多环境,这块就不用动了,封装多环境后,修改封装后的
     */
    // return !process.env.VUE_APP_BASE_API
    //   ? url
    //   : process.env.VUE_APP_BASE_API + url
    return url
  }

  // 常用方法封装
  get<T>(url: string, params?: object): Promise<TS.ResultData<T>> {
    return this.service.get(this.adUrl(url), { params })
  }
  post<T>(url: string, params?: object): Promise<TS.ResultData<T>> {
    return this.service.post(this.adUrl(url), params)
  }
  put<T>(url: string, params?: object): Promise<TS.ResultData<T>> {
    return this.service.put(this.adUrl(url), params)
  }
  delete<T>(url: string, params?: object): Promise<TS.ResultData<T>> {
    return this.service.delete(this.adUrl(url), { params })
  }
}
//实例对象
const http = new RequestHttp(config)

export default http
