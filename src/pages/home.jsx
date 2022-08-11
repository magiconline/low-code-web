import React from "react";
import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter()
    const { userID } = router.query

    return (
        <p>{`/home?userID=${userID}`}</p>
    )
}