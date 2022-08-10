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

export default {
    'text': {
        label: '文本',
        preview: () => '预览文本',
        render: ({ text }) => <div style={{ width: '100%', height: '100%', }}>{text}</div>,
        type: 'text',
        props: {
            text: '渲染文本',
        },
        style: {
            width: 100,
            height: 34,
            color: 'black',
            backgroundColor: 'white'
        },
    },
    'button': {
        label: '按钮',
        preview: () => <button>预览按钮</button>,
        render: ({ text }) => <button style={{
            width: '100%', height: '100%', color: '',
            backgroundColor: ''
        }}>{text}</button>,
        type: 'button',
        props: {
            text: '渲染按钮',
        },
        style: {
            width: 100,
            height: 34,
            color: 'black',
            backgroundColor: 'white'
        },
    },
    'input': {
        label: '输入框',
        type: 'input',
        props: {
            text: '请输入文本',
        },
        style: {
            width: 200,
            height: 20,
        },
        preview: () => <input placeholder="预览输入框" />,
        render: ({ text }) => <input
            style={{
                width: '100%',
                height: '100%',
                color: '',
                backgroundColor: ''
            }}
            value={text} />
    }
}