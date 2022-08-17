/* eslint-disable import/no-anonymous-default-export */
// const createEditorConfig = () => {
//     /* componentList: 存储了一个个物料组件的集合，用于渲染编辑器左侧物料的数据源；
//     componentMap: 是一个 map 映射关系，根据 type 字段进行映射，
//     有了它，就可以在画布中通过 Schema 数据去匹配物料组件来渲染画布视图。 */

//     const componentList = []; // 自定义组件（物料）
//     const componentMap = {}; // 组件和画布中元素的渲染映射

//     return {
//         componentList,
//         componentMap,
//         register: (component) => {
//             componentList.push(component);
//             componentMap[component.type] = component;
//         }
//     }
// }

// const registerConfig = createEditorConfig();

// registerConfig.register({
//     label: '文本',
//     preview: () => '预览文本',
//     render: ({ text }) => <div style={{ width: '100%', height: '100%', }}>{text}</div>,
//     type: 'text',
//     props: {
//         text: '渲染文本',
//     },
//     style: {
//         width: 100,
//         height: 34,
//         color: 'black',
//         backgroundColor: 'white'
//     },
// });

// registerConfig.register({
//     label: '按钮',
//     preview: () => <button>预览按钮</button>,
//     render: ({ text }) => <button style={{
//         width: '100%', height: '100%', color: '',
//         backgroundColor: ''
//     }}>{text}</button>,
//     type: 'button',
//     props: {
//         text: '渲染按钮',
//     },
//     style: {
//         width: 100,
//         height: 34,
//         color: 'black',
//         backgroundColor: 'white'
//     },
// });

// registerConfig.register({
//     label: '输入框',
//     type: 'input',
//     props: {
//         text: '请输入文本',
//     },
//     style: {
//         width: 200,
//         height: 20,
//     },
//     preview: () => <input placeholder="预览输入框" />,
//     render: ({ text }) => <input
//         style={{
//             width: '100%',
//             height: '100%',
//             color: '',
//             backgroundColor: ''
//         }}
//         value={text} />
// });

// export default registerConfig;


export default [
    {
        type: 'p',
        props: {
            id: '1',
            name: '<p>',
            style: {
                backgroundColor: 'white'
            },
        },
        children: [
            '文本',
        ]
    },
    {
        type: 'span',
        props: {
            id: '1',
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
            id: '2',
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
                fontWeight: 'bold'


            },
        },
        children: [
            '预览按钮',
        ]
    },
    {
        type: 'input',
        props: {
            id: '3',
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
            id: '4',
            name: '<textarea>',
            value: 'nihao',
            style: {

            }
        },
        children: [

        ]
    },
    {
        type: 'div',

        props: {
            id: '4',
            name: '<div>',
            style: {

            }
        },
        children: [
            'div'

        ]
    },
    {
        type: 'h1',

        props: {
            id: '4',
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
            id: '5',
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
    {
        type: 'img',
        props: {
            id: '6',
            name: '<img>',
            label: '图片',
            width: '100px',
            height: '100px',
            alt: '',
            src: 'https://www.baidu.com/img/PCpad_012830ebaa7e4379ce9a9ed1b71f7507.png',
            style: {

            }
        },
        children: [

        ]
    },

    {
        type: 'Video',

        props: {
            id: '7',
            name: '<video>',
            src: 'https://vd4.bdstatic.com/mda-nh87vrwi4z3hgrgk/sc/cae_h264/1660024254019108091/mda-nh87vrwi4z3hgrgk.mp4?v_from_s=hkapp-haokan-suzhou&auth_key=1660196534-0-0-3cf340a1f8cb766209cedc9885fa7066&bcevod_channel=searchbox_feed&cd=0&pd=1&pt=3&logid=0734308748&vid=18439501752691043225&abtest=103742_3-103890_2-103579_2&klogid=0734308748',
            label: '视频',
            alt: '',
            style: {
                width: '140px',
                height: '30px'

            }
        },
        children: [
            '视频',

        ]
    },


]