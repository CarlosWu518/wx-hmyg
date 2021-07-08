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

##### 购物车页面

1. 获取用户的收货地址
   1. 绑定点击事件
   2. 获取用户对小程序所授予获取地址的权限状态 scope
      1. 假设用户点击获取收获地址的提示框为确定 scope 值为 true 
      2. 假设用户点击获取收货地址的提示框为取消 scope 值为 false
         1. 诱导用户自己打开设置授权页面 当用户重新给与获取地址权限的时候
         2. 获取收货地址
      3. 假设用户从来没有调用过api 值为undefind
   3. 调用小程序内置api进行获取用户的收货地址
   
2. 页面加载完毕

   1. onLoad onshow
   2. 获取本地存储中的地址数据
   3. 把数据设置给data中的一个变量

   4. 把获取到的收货地址存到本地存储中

3. onshow

   1. 回到商品详情页 第一次添加商品的时候 手动添加了属性
      1. num=1；
      2. checked=true；
   2. 获取缓存中购物车的数组
   3. 把购物车数据填充到data中

4. 全选实现 数据的展示

   1. 在onShow中获取到缓存中的购物车数组
   2. 根据购物车中的商品数据进行计算 所有商品都被选中 checked=true 全选就被选中（every方法）

5. 总价格和总数量

   1. 都需要商品被选中，我们才拿来计算
   2. 获取到购物车的数组
   3. 遍历
   4. 判断商品是否被选中
   5. 总价格 += 商品单价 * 商品数量
   6. 总数量 += 商品数量
   7. 把计算后的数量都设置回data中即可

6. 商品的选中

   1. 绑定change事件
   2. 获取到被修改的商品对象
   3. 商品对象的选中状态 取反
   4. 重新填充回data中和缓存中
   5. 重新计算全选、总价格、总数量。。。

7. 全选和反选

   1. 全选复选框绑定事件 change
   2. 获取data中的全选变量 allChecked
   3. 直接取反 allChecked = ！allChecked
   4. 遍历购物车数组让里面商品选中状态跟随 allChecked 改变而改变
   5. 把购物车数组 和 allChecked 重新设置回data 把购物车重新设置回缓存中

8. 商品数量的编辑

   1. “+” “-” 按钮 同时绑定同一个点击事件，区分+-关键在于自定义属性
      1. “+” “+1”
      2. “-” “-1”
   2. 传递被点击的商品id goods_id
   3. 获取到data中的购物车数组，根据goods_id来获取需要被修改的商品对象
   4. 当购物车数量为1时，同时用户点击-时触发弹窗，询问用户是否要删除
      1. 确定：直接执行删除
      2. 取消：什么都不做
   5. 拿到商品对象后直接修改对象的数量num
   6. 再把cart数组重新设置回缓存中和data中，用this.setCart完成

9. 点击结算

   1. 判断有没有收货地址信息
   2. 判断用户有没有选购商品
   3. 经过以上验证跳转到支付页面

   

##### 支付页面

1. 页面加载的时候
   1. 从缓存中获取购物车数据，并将其渲染到页面中
