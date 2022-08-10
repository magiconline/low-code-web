import React from "react";

export function Editor({ setterTabs, setSetter, activeSetter, currentBlockIndex, schema, StyleSetter, PropsSetter }) {
    return (
        <div className="editor-right">
            <div className="setter-tabs-list">
                {/* 1.渲染Tab */}
                {setterTabs.map(tab => (
                    <div onClick={() => setSetter(tab.type)} className={`setter-tabs ${activeSetter === tab.type ? 'setter-tabs-active' : ''}`}>
                        <div
                            key={tab.type}
                            data-type={tab.type}
                            className={`setter-tab ${activeSetter === tab.type ? 'setter-tab-active' : ''}`}
                        >{tab.name}</div>

                    </div>

                ))}

            </div>

            {/* 2.渲染activeTab对应的View */}
            <div className="setter-content">
                {currentBlockIndex.current !== -1 ? (() => {
                    const block = schema.blocks[currentBlockIndex.current];
                    if (!block) return null;
                    switch (activeSetter) {
                        case 'json':
                            // return <PropsSetter block={block} />;
                            return <ReactJson src={schema}></ReactJson>
                        case 'style':
                            return (
                                <div>
                                    <StyleSetter block={block} />
                                    <PropsSetter block={block} />
                                </div>)
                        default:
                            return null;
                    }
                })() : '当前没有选中的组件'}
            </div>
        </div>
    )
}