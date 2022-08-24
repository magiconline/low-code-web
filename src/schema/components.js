//此文件为画布渲染的依据，同文件夹下的另外三个类型component是负责左侧组件布局，不涉及画布渲染和右侧属性栏。

export default [
    {
        type: 'p',
        props: {
            name: '<p>',
            style: {

                width: '',
                height: '',
                color: '#000000',
                fontSize: '16px',
                fontWeight: 'light',
                fontStyle: 'normal',
                textAlign: 'left',
                textDecoration: 'none',
                flexWrap: 'wrap',
                zIndex: ''


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
                color: '#000000',
                fontSize: '16px',
                fontWeight: 'light',
                fontStyle: 'normal',
                textAlign: 'left',
                textDecoration: 'none',
                zIndex: ''

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
            style: {

                cursor: 'pointer',
                color: '#ffffff',
                width: '100px',
                height: '30px',
                borderWidth: '0px',
                borderStyle: 'solid',
                backgroundColor: '#000000',
                borderColor: '#000000',
                borderRadius: '6px',
                fontWeight: 'bold',
                textAlign: 'center',
                zIndex: ''
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
                backgroundColor: 'white',
                zIndex: ''

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
                backgroundColor: '',
                zIndex: ''

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
                alignSelf: 'center',
                zIndex: '1',
                backgroundColor: '#ffffff',
                zIndex: ''


            }
        },
        children: [
            'div'
        ]
    },
    {
        type: 'h1',

        props: {
            name: '<h>',
            style: {
                color: 'black',
                textAlign: 'left',
                fontSize: '32px',
                fontStyle: 'normal',
                zIndex: ''
            }
        },
        children: [
            '标题'

        ]
    },

    {
        type: 'a',
        props: {
            name: '<a>',
            label: '链接',
            href: 'https://www.bilibili.com/',
            style: {
                cursor: 'pointer',
                textDecoration: 'none',
                fontStyle: 'normal',
                color: 'blue',
                zIndex: '',
                pointerEvents: 'auto',
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
            src: 'https://images.pexels.com/photos/9287901/pexels-photo-9287901.jpeg',
            // src: '/img/logo.png',
            style: {
                width: '200px',
                height: '',
                zIndex: ''
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
                height: '',
                zIndex: ''
            }

        },
        children: [
        ]
    },


]