import axios from 'axios'
// import { BASEURL } from './network'
const BASEURL = 'https://m.gloriahotels.com/app-api/api'
export function request(config) {
  // 1创建axios实例
  const instanse = axios.create({
    baseURL: config.Attributes ? config.url : BASEURL,
    // timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    },
  })
  // 2axios 拦截
  instanse.interceptors.request.use(
    (config) => {
      // console.log('请求拦截')
      // 判断请求的类型
      // 如果是post请求就把默认参数拼到data里面
      // 如果是get请求就拼到params里面
      // if (config.method === 'post') {
      //   let data = qs.parse(config.data)
      //   config.data = qs.stringify({
      //     id: 'zzj',
      //     // hotelid: hotelid,
      //     // empno: empno,
      //     ...data
      //   })
      // } else if (config.method === 'get') {
      //   config.params = {
      //     // session: session,
      //     // hotelid: hotelid,
      //     // empno: empno,
      //     ...config.params
      //   }
      // }
      // 加动画
      return config
    },
    (err) => {
      console.log(err)
    }
  )

  instanse.interceptors.response.use(
    (res) => {
      // console.log('响应拦截')
      return config.Attributes ? res.data : JSON.parse(res.data)
    },
    (err) => {
      console.log(err)
      // Message({
      //   message: "服务器已失去连接",
      //   type: "error"
      // });
      // router.push("/Page");
    }
  )
  // 3发送请求
  return instanse(config)
}
