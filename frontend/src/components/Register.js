import React from "react";
import { Link } from "react-router-dom";

function Register (props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSignup(email, password);
  };

  const handleChangePath = (newPath) => {
    props.onChangePath(newPath);
  };

  React.useEffect(() => {
    handleChangePath("/sign-up");
  }, []);

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="form__title">Регистрация</h1>
        <input
          type="email"
          onChange={handleChangeEmail}
          value={email}
          className="form__item"
          id="signin-email"
          placeholder="Email"
          required
        />
        <input
          type="password"
          onChange={handleChangePassword}
          className="form__item"
          id="signin-password"
          placeholder="Пароль"
          value={password}
          required
        />
        <button type="submit" className="form__button">
          Зарегистрироваться
        </button>
        <p className="form__caption">
          Уже зарегистрированы? 
          <Link className="form__link" to="/sign-in"> Войти</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
