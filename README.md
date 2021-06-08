# wx-hmyg
黑马优购小程序

#### 项目搭建

##### 	新建目录结构

​	styles	存放公共样式

​	components	存放组件

​	lib	存放第三方库

​	utils	自己的帮助库

​	request	自己的接口帮助库

##### 	项目页面

​	首页	index

​	分类页面	category

​	商品列表页面	goods_list

​	商品详情页面	goods_detail

​	购物车页面	cart

​	收藏页面	collect

​	订单页面	order

​	搜索页面	search

​	个人中心页面	user

​	意见反馈页面	feedback

​	登录页面	login

​	授权页面	auth

​	结算页面	pay

#### tabbar结构

 1. 页面搭建

    color	字体颜色

    selectedColor	选中之后的字体颜色

    pagePath	页面的路径

    text	名称

    iconPath	未选中时的图标

    selectedIconPath	选中时的图标

    ```
     "tabBar": {
            "color": "#999",
            "selectedColor": "#ff2d4a",
            "backgroundColor": "#fafafa",
            "position": "bottom",
            "borderStyle": "black",
            "list": [{
                    "pagePath": "pages/index/index",
                    "text": "首页",
                    "iconPath": "icons/home.png",
                    "selectedIconPath": "icons/home-o.png" 
                }, {
                    "pagePath": "pages/category/index",
                    "text": "分类",
                    "iconPath": "icons/category.png",
                    "selectedIconPath": "icons/category-o.png"
                },
                {
                    "pagePath": "pages/cart/index",
                    "text": "购物车",
                    "iconPath": "icons/cart_20190818_110336.png",
                    "selectedIconPath": "icons/cart-o.png"
                },
                {
                    "pagePath": "pages/user/index",
                    "text": "我的",
                    "iconPath": "icons/my.png",
                    "selectedIconPath": "icons/my-o.png"
                }
            ]
        },
    ```

    

#### 主题颜色

​	app.wxss  通过var(--themeColor)实现

```
page {
    /* 定义主题颜色 */
    --themeColor: #eb4450;
}
```

#### 搜索框效果

​	应多处页面需要使用，所以使用自定义组件

​	引入组件

 	   1.新增组件

​		2.声明引用；哪个页面要用组件，就在哪个页面的json文件中进行声明"usingComponents": {}，采用键值对形式 "名"："相对路径"； "SearchInput": "../../components/SearchInput/SearchInput"

​		3.再页面中添加 标签

#### 轮播图模块

###### 		后台接口：https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata

###### 		轮播图大小设计：

​				 1.swiper标签存在默认的宽度和高度 100% * 150px

   			  2.image标签也存在默认的宽高 320px * 240px

​    			 3.设计图片和轮播图

​      				1）原图高度 750 * 340

​     				 2)  让图片高度自适应；宽度=100%‘

​					  3) 让swiper标签的高度变成和图片一样高即可

​				 4.图片标签 mode属性 widthFix （让图片的标签宽高 和 图片标签的内容的宽高都等比例发			生变化）

##### 通过promise来解决地狱回调

1. 在request文件夹中新建index.js

```javascript
export const request = (params) => {
    return new Promise((resolve, reject) => { //（成功，失败）
        wx.request({
            ...params,
            success: (result) => {
                resolve(result)
            },
            fail: (error) => {
                reject(error);
            }
        });
    })
}
```

2. 引入用来发送请求的方法

   ```javascript
   import { request } from "../../request/index.js"
   ```

3. 运用

   ```js
   request({ url: "。。。。。。。。。。" }).then(result => {
               this.setData({
                   swiperList: result.data.message
               })
           })
   ```

#### 分类导航模块

###### 后台接口：https://api-hmugo-web.itheima.net/api/public/v1/home/catitems

#### 楼层模块

###### 后台接口：https://api-hmugo-web.itheima.net/api/public/v1/home/floordata

#### 分类页面

###### 后台接口：https://api-hmugo-web.itheima.net/api/public/v1/categories
