import { useState } from 'react';
import style from './signup.module.css';

export default function Signup() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function onSignupClick() {
    window.electronAPI.signup({
      username,
      password,
    });
  }

  return (
    <div className={style.signup}>
      <div className={style.main}>
        <h3>注册</h3>
        <div className={style.usernameRow}>
          <label>
            用户名: 
            <input onChange={(e) => setUsername(e.target.value)} />
          </label>
        </div>
        <div className={style.passwordRow}>
          <label>
            密码: 
            <input onChange={(e) => setPassword(e.target.value)} type="password" />
          </label>
        </div>
        <div className={style.buttonRow}>
          <button onClick={onSignupClick}>注册</button>
        </div>
      </div>
    </div>
  );
}