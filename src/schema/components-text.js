export default [
    {
        type: 'p',
        props: {
            name: '<p>',
            style: {
                backgroundColor: 'white',

            },
        },
        children: [
            '文本',
        ]
    },
    {
        type: 'span',
        props: {
            name: '<span>',
            style: {
                backgroundColor: 'white'
            },
        },
        children: [
            '文本',
        ]
    },
    {
        type: 'button',
        props: {
            name: '<button>',
            type: 'button',
            style: {
                cursor: 'point',
                color: 'white',
                backgroundColor: 'white',
                width: '100px',
                height: '30px',
                borderWidth: '1px',
                backgroundColor: '#3b91fa',
                borderColor: 'blue',
                borderRadius: '5px',
                fontWeight: 'bold',


            },
        },
        children: [
            '预览按钮',
        ]
    },
    {
        type: 'input',
        props: {
            name: '<input>',
            value: '请输入文本',
            style: {
            }
        },
        children: [

        ]
    },
    {
        type: 'textarea',

        props: {
            name: '<textarea>',
            value: '请输入文本',
            style: {

            }
        },
        children: [

        ]
    },
   
    {
        type: 'h1',

        props: {
            name: '<h1>',
            style: {

            }
        },
        children: [
            'H1'

        ]
    },

    {
        type: 'a',
        props: {
            name: '<a>',
            label: '链接',
            href: 'https://www.bilibili.com/',
            style: {
                cursor: 'point',
                // textDecoration: 'none',
            }
        },
        children: [
            '链接',

        ]
    },
   
]