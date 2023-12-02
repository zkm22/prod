import React from 'react'
import Head from 'next/head'
import './index.css';
 
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>client</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
 
export default MyApp