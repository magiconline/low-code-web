// 页面信息存储结构

import { ObjectId } from "mongodb"

class Component {
    constructor(page) {
        // id与name放在props中
        // this.id = page.id // 组件id
        // this.name = page.name // 组件自定义名称，可编辑
        this.type = page.type // 组件类型
        this.props = page.props // 组件属性

        // 递归创建子节点
        // 没有children要设置为 []， 不能不写(undefined)
        this.children = page.children.map((p) => typeof p === 'string' ? p : new Component(p))
    }
}

class MyFunction {
    constructor(f) {
        this.name = f.name
        this.function = f.function
    }
}

class Variable {
    constructor(variable) {
        this.name = variable.name
        this.type = variable.type
        this.value = variable.value
    }
}

class Page {
    constructor(res) {
        this.pageID = res._id // 数据库主键
        this.userID = res.userID // userID 与 pageName 有唯一联合索引，确保不重名
        this.version = res.version // 版本，不同的版本对应不同的渲染和解析方法
        // 不需要记录url，使用pageID或数据库主键即可
        // this.url = res.url 
        this.pageName = res.pageName // 页面名称，供管理页面中显示
        this.maxID = res.maxID // 记录最大组件id，新组件id自动+1
        // 暂时不需要全局变量和函数
        // this.variables = res.variables.map((v) => new Variable(v))
        // this.functions = res.functions.map((f) => new MyFunction(f))
        this.page = new Component(res.page) // 根组件
    }
}

// 模板页面信息
const defaultPage = new Page({
    _id: new ObjectId(), // 每次import后运行一次，重复使用会有相同的_id！
    userID: 'testUserID',   // 应为12位16进制字符串，可能会有错误
    version: 1,
    pageName: '测试页面',
    maxID: 2,
    // variables: [
    //     {
    //         name: 'testVariable',
    //         type: 'string',
    //         value: 'test text'
    //     }
    // ],
    // functions: [
    //     {
    //         name: 'helloWorld',
    //         function: `()=>{alert('helloworld');}`
    //     }
    // ],
    page: {
        type: 'div',
        props: {
            id: 1,
            name: '根组件',
            style: {
                backgroundColor: "grey"
            }
        },
        children: [
            'hello world',
            {
                type: 'p',
                props: {
                    id: 2,
                    name: 'p组件',
                    style: {
                        color: 'white'
                    }
                },
                children: [
                    '你好'
                ]
            }
        ]
    }
})

export { Page, defaultPage }