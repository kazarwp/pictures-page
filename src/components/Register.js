import { useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react';

function Register({ setIsSucces, handleInfoTooltip, register }) {
  const navigate = useNavigate()
  const inputEmail = useRef(null);
  const inputPassword = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    const email = inputEmail.current.value
    const password = inputPassword.current.value
    register(email, password)
  }
  
  return(
    <div className="authorization">
      <h1 className="authorization__header">Регистрация</h1>
      <form className="authorization__form" onSubmit={handleSubmit}>
        <input className="authorization__input" ref={inputEmail} type="text" placeholder="Email"/>
        <input className="authorization__input" ref={inputPassword} type="password" placeholder="Пароль"/> 
        <button type='submit' className="authorization__button">Зарегистрироваться</button>
      </form>
      <button className="authorization__info" onClick={() => navigate("/sign-in")}>Уже зарегистрированы? Войти</button>
    </div>
  )
}

export default Register