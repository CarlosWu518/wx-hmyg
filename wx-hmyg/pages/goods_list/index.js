// pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
     {
        id:0,
        value:"综合",
        isActive:true
     },
     {
      id:1,
      value:"销量",
      isActive:false
    },
    {
      id:2,
      value:"价格",
      isActive:false
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options);
  },
  //标题点击事件
  tabsItemChange(e){
   //1.获取被点击的标题索引
   const {index} = e.detail;
   //2.修改原数组
   let {tabs} = this.data;
   tabs.forEach((v,i)=>i === index ? v.isActive=true : v.isActive=false);
   //3.赋值到data中
   this.setData({
     tabs
   })
  }
})