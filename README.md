# CQ-gacha
酷Q机器人插件，公主连接模拟抽卡，尽量地模拟了真正的抽卡概率
6次天井(300连)共1800次抽卡结果如下
![](https://pic.downk.cc/item/5f0856c714195aa594df81c6.png)
## 1、酷Q
本插件依赖<a href="https://cqp.cc/" target="_blank">酷Q机器人</a>运作使用前请先安装酷q
## 2、coolq-http-api
本插件依赖[coolq-http-api](https://github.com/richardchien/coolq-http-api)运作,前往下载最新的[coolqhttpapi.cpk](https://github.com/richardchien/coolq-http-api/releases)并安装

配置cqhttp请参考[插件使用文档](https://cqhttp.cc/docs/4.13/#/)

或者参考以下配置方式
```ps1
打开酷Q目录里的data\app\io.github.richardchien.coolqhttpapi\${对应Q号}.ini
```
![配置1](https://pic.downk.cc/item/5e0c1a8476085c32892e3524.jpg)
```ps1
然后打开项目目录里的api.js配置以下内容
```
![配置2](https://pic.downk.cc/item/5f08517f14195aa594dde280.png)

## 3、Node.js
需要[nodejs](https://nodejs.org/en/)作为运行环境

## 4、具体操作
①确保准备好以上内容

②安装
```ps1
git clone https://github.com/SayaSS/CQ-gacha.git
cd CQ-gacha
npm install canvas --canvas_binary_host_mirror=https://npm.taobao.org/mirrors/node-canvas-prebuilt/
npm install
```

③请打开gacha.js按照注释来配置聊天插件
<font color=red>一定要配置好资源文件夹(gacha文件夹)</font>
配置示例:
![配置2](https://pic.downk.cc/item/5f084e8814195aa594dd0551.png)

④运行
```ps1
node index
```
## 5、拓展
池子的内容和概率都可自行修改，在gacha.js里修改即可
①修改概率
fes池子(其他fes角色的概率请务必放在最后一位):
![fes](https://pic.downk.cc/item/5f084cd914195aa594dc7642.png)
普通池子![普池](https://pic.downk.cc/item/5f084ccd14195aa594dc71b0.png)
②修改角色
准备好角色头像图片，尺寸要求175x175，命名格式为星级-角色名字，并把图片放进gacha/pcr里
例子：3-Neneka.png![nnk](https://pic.downk.cc/item/5f084de514195aa594dcd505.png)
然后修改gacha.js里对应的数组内容
