import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime"; // pages/goos_detail/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsObj: {}
    },
    //商品对象
    GoodsInfo: {},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const { goods_id } = options
        this.getGoodDetail(goods_id)
    },

    //获取商品详情数据
    async getGoodDetail(goods_id) {
        const goodsObj = await request({
            url: "/goods/detail",
            data: { goods_id }
        });
        this.GoodsInfo = goodsObj;
        this.setData({
            goodsObj: {
                goods_name: goodsObj.goods_name,
                goods_price: goodsObj.goods_price,
                goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, ".jpg"),
                pics: goodsObj.pics
            }
        })
    },
    //点击轮播图放大预览
    handlePrevewImage(e) {
        //1.先要构造预览图片数组
        const urls = this.GoodsInfo.pics.map(v => v.pics_mid);
        //2.需要接受春娣过来图片的url
        const current = e.currentTarget.dataset.url;
        wx.previewImage({
            current: current,
            urls: urls,
        });
    },
    //点击加入购物车
    handleCartAdd() {
        //获取缓存中购物车数组
        let cart = wx.getStorageSync("cart") || [];
        //判断商品对象是否存在于购物车数组中
        let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id)
        if (index === -1) {
            //不存在
            this.GoodsInfo.num = 1;
            this.GoodsInfo.checked = true;
            cart.push(this.GoodsInfo);
        } else {
            //存在
            cart[index].num++;
        }

        //将购物车重新添加回缓存中
        wx.setStorageSync("cart", cart);
        //弹窗
        wx.showToast({
            title: '加入成功',
            icon: 'success',
            duration: 1500,
            mask: true,
        });
    }
})