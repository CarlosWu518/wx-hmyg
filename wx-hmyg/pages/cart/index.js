// pages/cart/index.js
Page({
    // 点击 收货地址
    handleChooseAddress() {
        //获取权限状态
        wx.getSetting({
            success: (result) => {
                const scopeAddress = result.authSetting["scope.address"];
                if (scopeAddress === true || scopeAddress === undefined) {
                    //获取收哦地址
                    wx.chooseAddress({
                        success: (address) => {
                            wx.setStorageSync("address",address)
                        },
                    });
                } else {
                    wx.openSetting({
                        success: (result2) => {
                            wx.chooseAddress({
                                success: (address) => {
                                    wx.setStorageSync("address",address)
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