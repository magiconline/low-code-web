import { useRouter } from "next/router";

// 
export function View() {
    const router = useRouter()
    const { pageID } = router.query

    return (
        <div></div>
    )
}