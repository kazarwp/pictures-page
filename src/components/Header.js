import logo from "../images/logo.svg";
import {useLocation, useNavigate } from "react-router-dom";

function Header({ user, isLoggedIn, exitUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Лого" />
      {location.pathname === "/sign-up" && <button className="header__auth" onClick={() => navigate("/sign-in")}>Войти</button>}
      {location.pathname === "/sign-in" && <button className="header__auth" onClick={() => navigate("/sign-up")}>Регистрация</button>}
      {isLoggedIn && <div className="header__profile">
        {location.pathname === "/" && <span className="header__email">{user}</span>}
        {location.pathname === "/" && <button className="header__auth" onClick={() => exitUser()}>Выйти</button>}
      </div>}
    </header>
  );
}

export default Header;
