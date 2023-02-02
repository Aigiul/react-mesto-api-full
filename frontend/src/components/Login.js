import React from "react";

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleChangePath = (newPath) => {
    props.onChangePath(newPath);
  }

  React.useEffect(()=> {
    handleChangePath('/sign-in');
  }, []);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSignin(email, password);
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="form__title">Вход</h1>
        <input
          type="email"
          onChange={handleChangeEmail}
          className="form__item"
          value={email}
          id="signin-email"
          placeholder="Email"
          required
        />
        <input
          type="password"
          onChange={handleChangePassword}
          className="form__item"
          value={password}
          id="signin-password"
          placeholder="Пароль"
          required
        />
        <button type="submit" className="form__button">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
