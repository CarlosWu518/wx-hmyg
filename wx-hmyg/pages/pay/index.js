// pages/cart/index.js
Page({
    data: {
        address: {

        },
        cart: [],
        totalPrice: 0,
        totalNum: 0
    },
    onShow() {
        //获取缓存中的收获地址
        const address = wx.getStorageSync("address");
        //获取缓存中的购物车数据
        let cart = wx.getStorageSync("cart") || [];
        //过滤后的的购物车数组
        cart = cart.filter(v => v.checked);
        //计算全选
        // const allChecked = cart.length ? cart.every(v => v.checked) : false;
        this.setData({ address });
        //总价格总数量
        let totalPrice = 0;
        let totalNum = 0;
        cart.forEach(v => {
            totalPrice += v.num * v.goods_price;
            totalNum += v.num;
        })
        this.setData({
            cart,
            totalPrice,
            totalNum,
            address
        })
    },

})