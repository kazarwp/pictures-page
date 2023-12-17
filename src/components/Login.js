import { useRef } from 'react';
import { useNavigate } from 'react-router-dom'

function Login( {setLoggined, login} ) {
  const navigate = useNavigate()
  const inputEmail = useRef(null);
  const inputPassword = useRef(null);

  function handleLogin(e) {
    e.preventDefault();
    const email = inputEmail.current.value
    const password = inputPassword.current.value
    login(email, password)
  }

  return(
    <div className="authorization">
      <h1 className="authorization__header">Вход</h1>
      <form className="authorization__form" onSubmit={handleLogin}>
        <input className="authorization__input" ref={inputEmail} type="text" placeholder="Email"/>
        <input className="authorization__input" ref={inputPassword} type="password" placeholder="Пароль"/> 
        <button className="authorization__button">Войти</button>
      </form>

    </div>
  )
}

export default Login