import { Page } from "../schema/schema"

export async function getPageInfo(userID, pageID, fake = false) {
    if (fake === true) {
        return Page()
    } else {
        return await fetch('http://lowcode.fly.dev/api/getPage', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pageID, userID
            })
        }
        ).then((response) => {
            if (response.ok)
                return response.json()
            else
                throw response.statusText
        }).then((result) => {
            if (result.code === 0) {
                return Page(result.page)
            } else {
                throw result.msg
            }
        })
    }

}