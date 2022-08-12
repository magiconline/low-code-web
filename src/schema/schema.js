// 页面信息存储结构

class Component {
    constructor(page) {
        this.id = page.id // 组件id
        this.name = page.name // 组件自定义名称，可编辑
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
        this.version = res.version // 版本，不同的版本对应不同的渲染和解析方法
        // 不需要记录url，使用pageID或数据库主键即可
        // this.url = res.url 
        this.name = res.name // 页面名称，供管理页面中显示
        this.maxID = res.maxID // 记录最大组件id，新组件id自动+1
        // 暂时不需要全局变量和函数
        // this.variables = res.variables.map((v) => new Variable(v))
        // this.functions = res.functions.map((f) => new MyFunction(f))
        this.page = new Component(res.page) // 根组件
    }
}

// 模板页面信息
const defaultPage = new Page({
    version: 1,
    name: '测试页面',
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
        id: 1,
        name: '根组件',
        type: 'div',
        props: {
            style: {
                backgroundColor: "grey"
            }
        },
        children: [
            'hello world',
            {
                id: 2,
                name: 'p组件',
                type: 'p',
                props: {
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