import React from "react";
import { Component } from '../../components/render';
import { GetServerSideProps } from "next";
import { getCollection } from "../../utilts/database";
import { ObjectId } from "mongodb";

interface Props {
    page: {},
    code: number
}

export default function ViewPage({ page, code }: Props) {

    // 读取pageID
    // const router = useRouter()
    // const { pageID } = router.query

    // // 读取pageInfo
    // const { data, isLoading, isError } = usePageInfo(pageID)

    // if (isLoading) {
    //     return <div>{`加载中`}</div>
    // }

    // if (isError || data.code !== 0) {
    //     return <div>{`错误: ${isError} ${data.msg}`}</div>
    // }

    // const pageInfo = new Page(data.page)

    switch (code) {
        case 0: {
            return (
                <Component {...page}></Component>
            )
        }

        case 1: {
            return (
                <div>pageID不存在</div>
            )
        }

        case -1:
        default: {
            return (
                <Component {...page}></Component>
            )
        }
    }

}

export const getServerSideProps: GetServerSideProps = async (context) => {
    // url = /view/pageID
    const pageID = context.req.url!.substring(6)

    try {
        const pageCollection = await getCollection('page')


        const result = await pageCollection.findOne({
            _id: new ObjectId(pageID),
        })

        if (result) {
            return {
                props: {
                    page: result.page
                }
            }

        } else {
            return {
                props: {
                    code: 1 // pageID不存在
                }
            }
        }


    } catch (e) {
        const message = (e as Error).message
        return {
            props: {
                page: {
                    type: 'p',
                    children: [
                        `出错了, message: ${message}`
                    ]
                },
                code: -1
            }
        }
    }

}