import { useRouter } from "next/router";


export default function View() {
    const router = useRouter()
    const { pageID } = router.query

    return (
        <div>{`/view/${pageID}`}</div>
    )
}