import type { AppProps } from 'next/app'
import '../styles/edit.scss'
function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}

export default MyApp
