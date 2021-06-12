// pages/goods_list/index.js
import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [{
                id: 0,
                value: "综合",
                isActive: true
            },
            {
                id: 1,
                value: "销量",
                isActive: false
            },
            {
                id: 2,
                value: "价格",
                isActive: false
            }
        ],
        goodList: []
    },
    //接口要的参数
    QueryParams: {
        query: "",
        cid: "",
        pagenum: 1,
        pagesize: 10
    },
    totalPages:1,
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.QueryParams.cid = options.cid;
        this.getGoodList();
    },
    //获取商品列表数据
    async getGoodList() {
        const res = await request({ url: "/goods/search", data: this.QueryParams });
        const total = res.total;
        this.totalPages = Math.ceil(total / this.QueryParams.pagesize)
        this.setData({
            // 要对data中数组进行拼接而不是全部替换
            goodList: [...this.data.goodList,...res.goods]
        })
        wx.stopPullDownRefresh();
    },
    //标题点击事件
    tabsItemChange(e) {
        //1.获取被点击的标题索引
        const { index } = e.detail;
        //2.修改原数组
        let { tabs } = this.data;
        tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
        //3.赋值到data中
        this.setData({
            tabs
        })
    },
    //页面上滑触底事件
    onReachBottom(){
        //判断是否还有下一页
        if(this.QueryParams.pagenum >= this.totalPages){
            //没有下一页
            wx.showToast({
                title: '已经到底了哦',
              })             
        }else{
            //有下一页
            this.QueryParams.pagenum++;
            this.getGoodList();
        }
    },
    //页面下拉刷新事件
    onPullDownRefresh(){
            this.setData({
                goodList:[]
            });
            this.QueryParams.pagenum = 1;
            this.getGoodList();
    }
})