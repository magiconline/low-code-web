//此文件为画布渲染的依据，同文件夹下的另外三个类型component是负责左侧组件布局，不涉及画布渲染和右侧属性栏。

export default [
    {
        type: 'p',
        props: {
            name: '<p>',
            style: {
                width: '',
                height: '',
                backgroundColor: '',
                color: 'black',
                fontSize: '16px',
                fontWeight: 'light',
                textAlign: 'left',
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
                width: '',
                height: '',
                backgroundColor: '',
                color: 'black',
                fontSize: '16px',
                fontWeight: 'light',
                textAlign: 'left',
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
                width: '100px',
                height: '30px',
                borderWidth: '1px',
                backgroundColor: '#3b91fa',
                borderColor: 'blue',
                borderRadius: '5px',
                fontWeight: 'bold',
                textAlign: 'center',
            },
            onClick: `(e) => {alert('button clicked')}`,
            onDoubleClick: `(e) => {alert('button double clicked')}`
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
                width: '',
                height: '',
                borderColor: 'grey',
                borderWidth: '1px',
                borderRadius: '4px',
            },
            onChange: `(e) => {console.log(e)}`
        },
        children: [

        ]
    },
    {
        type: 'textarea',

        props: {
            name: '<textarea>',
            value: '请输入段落',
            style: {
                width: '200px',
                height: '100px',
                borderColor: 'grey',
                borderWidth: '1px',
                borderRadius: '4px',

            },
            onChange: `(e) => {console.log(e)}`
        },
        children: [

        ]
    },
    {
        type: 'div',

        props: {
            name: '<div>',
            style: {
                boxSizing: 'border-box',
                margin: '0px',
                padding: '0px',
                position: 'relative',
                width: '',
                height: '',
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                alignSelf: '',
                zIndex: '',
                backgroundColor: ''

            }
        },
        children: [
            'div'

        ]
    },
    {
        type: 'h1',

        props: {
            name: '<h1>',
            style: {
                backgroundColor: '',
                color: 'black',
                backgroundColor: 'white',
                fontWeight: 'light',
                textAlign: 'left',


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
                textDecoration: 'none',
                color: 'blue',
                url: ''


            }
        },
        children: [
            '链接',

        ]
    },
    {
        type: 'img',
        props: {
            name: '<img>',
            label: '图片',
            alt: '',
            src: '/img/logo.png',
            style: {
                width: '200px',
                height: ''

            }
        },
        children: [

        ]
    },

    {
        type: 'video',

        props: {
            name: '<video>',
            label: '视频',
            controls: 'controls',
            src: 'https://pic.oh4k.com/spdiy/wp-content/uploads/2022/08/20220809-mGFGRn.mp4',
            style: {
                width: '200px',
                height: ''
            }

        },
        children: [
        ]
    },


]