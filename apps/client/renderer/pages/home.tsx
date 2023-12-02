import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

function Home() {

  const router = useRouter();

  useEffect(() => {
    router.push('signup');
  });

  
  const [password, setPassword] = useState('');
  
  function onPasswordChange(v: string) {
    setPassword(v);
  }

  async function onClick() {
    await window.electronAPI.setPassword(password);
    router.push('/main');
  }

  return (
    <React.Fragment>
      <Head>
        <title>登录</title>
      </Head>
      <div>
        <input onChange={(e) => onPasswordChange(e.target.value)} />
        <button onClick={onClick}>登录</button>
      </div>
    </React.Fragment>
  )
}

export default Home
