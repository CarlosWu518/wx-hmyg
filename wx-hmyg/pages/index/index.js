//引入 用来发送请求的方法
import { request } from "../../request/index.js"
Page({
    data: {
        //轮播图数组
        swiperList: [],
        //导航 数组
        catesList: [],
        //楼层 数组
        floorList: []
    },
    //options(Object)
    onLoad: function(options) {
        //发送异步请求获取轮播图数据 通过promise来解决这个问题
        // wx.request({
        //     url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
        //     success: (result) => {
        //         this.setData({
        //             swiperList: result.data.message
        //         })
        //     }
        // });
        this.getSwiperList();
        this.getCateList();
        this.getFloorList();
    },
    // 获取轮播图数据
    getSwiperList() {
        request({ url: "/home/swiperdata" }).then(result => {
            this.setData({
                swiperList: result
            })
        })
    },
    // 获取导航数据
    getCateList() {
        request({ url: "/home/catitems" }).then(result => {
            this.setData({
                catesList: result
            })
        })
    },
    // 获取楼层数据
    getFloorList() {
        request({ url: "/home/floordata" }).then(result => {
            this.setData({
                floorList: result
            })
        })
    }
});