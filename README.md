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

###### 缓存处理：

​		在打开页面的时候，先进行一个判断，判断本地存储中是否有旧的数据，如果没有就直接发送新的请求来获取数据，如果有旧的数据，而且没有过期，就是用本地存贮中的旧数据。

 1. 获取本地存储中的数据

    ```javascript
    const Cates = wx.getStorageSync('cates');
    ```

 2. 判断

    ```javascript
     if (!Cates) {
                this.getCates();
            }else{
                //有旧的数据 定义过期时间 10是改成5分钟
                if (Date.now()-Cates.time>1000*10) {
                    //重新发送请求
                    this.getCates();
                }else{
                    //可以使用旧的数据
                    this.Cates = Cates.data;
                    //构造左侧的大数据
                    let leftMenuList = this.Cates.map(v => v.cat_name);
                    //构造右侧的商品数据
                    let rightContent = this.Cates[0].children;
                    this.setData({
                        leftMenuList,
                        rightContent
                    })
                }
            }
    ```

 3. 存储

    ```javascript
    //把接口的数据接口存储到本地存储中
                wx.setStorageSync('cates', {time:Date.now(),data:this.Cates})
    ```

优化1：点击左侧菜单，右侧列表无法置顶

​		通过标签 *scroll-top*

接口代码的优化：在request中修改

```javascript
export const request = (params) => {
    //定义公共的url
    const baseUrl="https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url:baseUrl+params.url,
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

##### 商品列表页面搜索

###### 后台接口：https://api-hmugo-web.itheima.net/api/public/v1/goods/search

###### 触底加载下一页	

 1. 用户上滑页面，滚动条触底，开始加载下一页数据

    1. 找到滚动条触底事件

    2. 判断还是否有下一页数据

       1. 获取到总页数、

          总页数 = Math.ceil(总条数 / 页容量 )   

       2. 获取当前页码

       3. 判断一下 当前的页码是否大于等于总页数

    3. 若没有下一页数据 弹出提示

    4. 若有下一页数据，则加载下一页数据

       1. 当前的页码 ++
       2. 重新发送请求
       3. 数据请求回来 要对data中数组进行拼接而不是全部替换

###### 下拉刷新功能

	1. 触发下拉刷新事件
	2. 重置数据数组
	3. 重置页码为1、
	4. 重新发送请求
	5. 数据请求回来 需要手动的关闭 等待效果

###### 添加全局的正在加载图表效果

##### 商品详情页面

###### 后台接口：https://api-hmugo-web.itheima.net/api/public/v1/goods/detail

###### 放大预览图片：

	1. 绑定点击事件
	2. 调用小程序api previewImage

  		1. 先构造要预览的图片数组
  		2. 需要接受传递过来图片的url

###### 加入购物车

	1. 绑定点击事件
 	2. 获取缓存中的购物车数据，数组格式
 	3. 先判断当前商品是否已经存在于购物车
 	4. 已经存在的话修改商品数据，执行购物车数量++，重新把购物车数组重新填充回缓存中
 	5. 不存在购物车数组中，直接给购物车数组添加一个新元素（带上购买数量的属性）
 	6. 弹出相对应提示

