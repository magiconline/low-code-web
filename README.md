# 写在前面
感谢队长magiconline主持设计开发。
该项目为第四届字节跳动青训营低代码类别团队项目，获得该类别第一名。项目实现登录注册、仓库管理、设计、预览与发布等基本功能。
作为队员同时上传项目到github分享。

# 项目介绍
基于React实现的低代码平台，拥有设计、预览、发布等功能。  
项目部署在fly.io平台，项目地址：https://lowcode.fly.dev/  

# 技术选型
React, Next.js, MongoDB, antd

# 项目配置
## 安装依赖
`npm install`

## 配置数据库
使用你的MongoDB字符串替换/src/utils/database.ts里的url参数

# 编辑画布界面地址
- http://localhost:3000/admin.html
## 运行
`npm run dev`  
打开 http://localhost:3000


## 接口文档详见
- https://www.apifox.cn/apidoc/shared-4c8f624c-b8dc-42f9-9702-49878430f922/api-33019479


### 修改建议
- Header.js处的index 216行，应该是点击enter后尺寸修改，而不是onchange就立刻响应
# Low-code-web-final
