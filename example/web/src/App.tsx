import React from 'react';

interface components {
    type: string,
    attrs: { [key: string]: any },
    items: components[] | string,
}

const tree: components = {
    type: 'div',
    attrs: [],
    items: [
        {
            type: 'div',
            attrs: [],
            items: [
                {
                    type: 'p',
                    attrs: [],
                    items: 'p1'
                },
                {
                    type: 'p',
                    attrs: [],
                    items: 'p2'
                },
                {
                    type: 'p',
                    attrs: [],
                    items: 'p3'
                }
            ]
        },
        {
            type: 'p',
            attrs: [],
            items: 'p标签',
        },
        {
            type: 'textarea',
            attrs: [],
            items: '',
        },
        {
            type: 'button',
            attrs: [],
            items: '按钮',
        }
    ]
};

function Canvas({ tree }: any) {
    if (tree === []) {
        return <></>;
    } else {
        return (
            <>
                {React.createElement(tree.type, tree.attrs, typeof tree.items === 'string' ? tree.items : tree.items.map((t: components) => <Canvas tree={t}></Canvas>))}
            </>
        );

    }

}


export const App = () => {
    return <Canvas tree={tree}></Canvas>;
};