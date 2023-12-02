import React, { useState } from 'react'
// import { testMessage } from '../../messages/message';

function Next() {

  const [url, setUrl] = useState('');
  const [token, setToken] = useState('');
  const [name, setName] = useState('');

  async function onSubmit() {
    const res =  await window.electronAPI.createGit(url, token, name);
    console.log(res);
  }

  async function test() {
    // const res = await window.electronAPI.getGitList();
    // console.log(res);
    await window.electronAPI['test']({'name': 'ab'});
  }

  return (
    <React.Fragment>
      <label>
        url:
        <input onChange={(e) => setUrl(e.target.value)} />
      </label>
      <label>
        token:
        <input onChange={(e) => setToken(e.target.value)} />
      </label>
      <label>
        name:
        <input onChange={(e) => setName(e.target.value)} />
      </label>
      <button onClick={onSubmit}>提交</button>
      <button onClick={test}>test</button>
    </React.Fragment>
  )
}

export default Next
