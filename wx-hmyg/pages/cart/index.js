// pages/cart/index.js
Page({
    data() {
        address: {

        }
    },
    onShow() {
        //获取缓存中的收获地址
        const address = wx.getStorageSync("address");
        this.setData({
            address
        })
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
    }
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
})