class Component {
    constructor(page) {
        this.id = page.id
        this.name = page.name
        this.type = page.type
        this.props = page.props
        this.children = page.children.map((p) => new Component(p))
    }
}

class Variable {
    constructor(variable) {
        this.name = variable.name
        this.type = variable.type
        this.value = variable.value
    }
}

export class Page {
    constructor(res) {
        this.version = res.version
        this.url = res.url
        this.name = res.name
        this.maxID = res.maxID
        this.variables = res.variables.map((v) => new Variable(v))
        this.page = new Component(res.page)
    }
}