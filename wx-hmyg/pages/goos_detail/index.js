import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime";// pages/goos_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      const {goods_id} = options
     this.getGoodDetail(goods_id)
  },

  //获取商品详情数据
  async getGoodDetail(goods_id){
      const goodsObj = await request({
        url:"/goods/detail",data:{goods_id}
      })
      this.setData({
        goodsObj:{
          goods_name:goodsObj.goods_name,
          goods_price:goodsObj.goods_price,
          goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g,".jpg"),
          pics:goodsObj.pics
        }
      })
  }
})