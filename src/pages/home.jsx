import React from "react";
import { useRouter } from "next/router";

export default function () {
    const router = useRouter()
    const { userID } = router.query

    return (
        <div>home</div>
    )
}