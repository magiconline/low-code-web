import React from "react";

function findComponentByID(page, id) {

}

export function Editor({ selectComponent, pageInfo, setPageInfo }) {
    if (selectComponent) {
        let componentInfo = findComponentByID(pageInfo.page, selectComponent)
        let variables = pageInfo.variables
        return (
            <div className="editor-right">
                right
                <div className="setter-tabs-list">

                </div>

                {/* 2.渲染activeTab对应的View */}
                <div className="setter-content">

                </div>
            </div>
        )
    } else {
        return null
    }
}