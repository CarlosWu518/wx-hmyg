// pages/cart/index.js
Page({
    data: {
        address: {

        },
        cart: [],
        allChecked: false,
        totalPrice: 0,
        totalNum: 0
    },
    onShow() {
        //获取缓存中的收获地址
        const address = wx.getStorageSync("address");
        //获取缓存中的购物车数据
        const cart = wx.getStorageSync("cart") || [];
        //计算全选
        // const allChecked = cart.length ? cart.every(v => v.checked) : false;
        this.setData({ address })
        this.setCart(cart);
    },
    // 点击 收货地址
    handleChooseAddress() {
        //获取权限状态
        wx.getSetting({
            success: (result) => {
                const scopeAddress = result.authSetting["scope.address"];
                if (scopeAddress === true || scopeAddress === undefined) {
                    //获取收哦地址
                    wx.chooseAddress({
                        success: (result1) => {
                            console.log(result1);
                            wx.setStorageSync("address", result1);
                        },
                    });
                } else {
                    wx.openSetting({
                        success: (result2) => {
                            wx.chooseAddress({
                                success: (result3) => {
                                    console.log(result3);
                                    wx.setStorageSync("address", result3);
                                },
                            });
                        },
                    });
                }
            },
            fail: () => {},
            complete: () => {}
        });
    },
    //  // 点击 收货地址
    //  async handleChooseAddress() {
    //     //获取权限状态
    //    const res1 = await getSetting();
    //    const scopeAddress = res1.authSetting["scope.address"];
    //     //判断权限状态
    //     if (scopeAddress === true || scopeAddress=== undefined) {
    //         //调用获取收货地址
    //         const res2 = await chooseAddress();
    //         console.log(res2);

    //     }else{
    //         await openSetting();
    //         const res2 = await chooseAddress();
    //         console.log(res2);
    //     }
    // }
    //商品的选中
    handleItemChange(e) {
        //获取被修改的商品id
        const goods_id = e.currentTarget.dataset.id;
        //获取购物车数组
        let { cart } = this.data;
        //找到被修改的商品对象
        let index = cart.findIndex(v => v.goods_id === goods_id);
        //选中状态取反
        cart[index].checked = !cart[index].checked;
        console.log(cart[index]);

        this.setCart(cart);

    },
    //设置购物车状态同时 重新计算 底部工具栏的数据 全选 总价格 购买的数量
    setCart(cart) {
        //把购物车数据重新设置回data中缓存中
        let allChecked = true;
        //总价格总数量
        let totalPrice = 0;
        let totalNum = 0;
        cart.forEach(v => {
                if (v.checked) {
                    totalPrice += v.num * v.goods_price;
                    totalNum += v.num;
                } else {
                    allChecked = false;
                }
            })
            //判断数组是否为空
        allChecked = cart.length != 0 ? allChecked : false;
        this.setData({
            cart,
            totalPrice,
            totalNum,
            allChecked
        })
        wx.setStorageSync("cart", cart);
    },
    //商品的全选功能
    handleItemAllCheck() {
        //获取data中的数据
        let { cart, allChecked } = this.data;
        //修改值
        allChecked = !allChecked;
        //循环修改cart数组中商品选择状态
        cart.forEach(v => v.checked = allChecked);
        //修改后的值填充回data或缓存中
        this.setCart(cart)
    },
    //商品数量的编辑功能
    handleItemNumEdit(e) {
        //获取传递过来的参数
        const { operation, id } = e.currentTarget.dataset;
        //获取购物车数组
        let { cart } = this.data;
        //找到需要修改的商品的索引
        const index = cart.findIndex(v => v.goods_id === id);
        //判断是否要执行删除
        if (cart[index].num === 1 && operation == -1) {
            //弹出提示
            wx.showModal({
                title: '提示',
                content: '您是否要删除?',
                showCancel: true,
                cancelText: '取消',
                cancelColor: '#000000',
                confirmText: '删除',
                confirmColor: '#3CC51F',
                success: (result) => {
                    if (result.confirm) {
                        cart.splice(index, 1);
                        this.setCart(cart)
                    } else if (result.cancel) {

                    }
                },
                fail: (error) => {
                    reject(error)
                }
            });

        } else {
            //进行修改数量
            cart[index].num = cart[index].num + parseInt(operation);
            //设置回缓存和data中
            this.setCart(cart);
        }

    }
})