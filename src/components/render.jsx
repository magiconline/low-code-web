import React, { Children } from "react";


export function Component(props) {
    if (props.children) {
        const children = props.children.map((child, index) => {
            return typeof child === 'string' ? child : <Component key={index} {...child}></Component>
        })
        return React.createElement(props.type, props.props, children
        )
    } else {
        return React.createElement(props.type, props.props)
    }

}