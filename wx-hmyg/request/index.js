//统计同时发送异步请求的次数
let ajaxTimeCount = 0;
export const request = (params) => {
    ajaxTimeCount ++;      
    wx.showLoading({
        title: '加载中',
      })
    //定义公共的url
    const baseUrl="https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url:baseUrl+params.url,
            success: (result) => {
                resolve(result.data.message)
            },
            fail: (error) => {
                reject(error);
            },
            complete:()=>{
                ajaxTimeCount--;
                if (ajaxTimeCount === 0) {
                    wx.hideLoading()
                }
            }
        });
    })
}