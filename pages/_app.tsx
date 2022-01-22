import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Header from '../components/Header'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>SportsTV🏀</title>
        <meta name="description" content="SportsTV,体育" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto">
        <Header />
        <main className="py-2">
          <Component {...pageProps} />
        </main>
      </div>
    </>
  )
}

export default MyApp
