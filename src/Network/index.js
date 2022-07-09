import { request } from './request'
// 获取轮播图
export function GetWebsite_AdvertByColumnId(data) {
  return request({
    url: '/OfficialWebsite/GetWebsite_AdvertByColumnId',
    method: 'get',
    params: data,
  })
}
// 精选酒店
export function GetSelectedHotel(data) {
  return request({
    url: '/Reservation/GetSelectedHotel',
    method: 'get',
    params: data,
  })
}
// 酒店详情
export function GetHotelModel(data) {
  return request({
    url: '/OfficialWebsite/GetHotelModel',
    method: 'get',
    params: data,
  })
}
// 查询房价
export function GetAllRoomType2(data) {
  return request({
    url: '/Reservation/GetAllRoomType2?leve=',
    method: 'post',
    data: data,
  })
}
