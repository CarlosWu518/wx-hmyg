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
                        success: (result1) => {
                            console.log(result1);
                        },
                    });
                } else {
                    wx.openSetting({
                        success: (result2) => {
                            wx.chooseAddress({
                                success: (result3) => {
                                    console.log(result3);
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
})