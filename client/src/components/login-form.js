import "./login-form.css";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";

const LoginForm = ({ category }) => {
  const [data, SetData] = useState({});
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://felt-teacher.herokuapp.com/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (result.status === "success") {
        sessionStorage.setItem("token", result.data.token);
        history.push(`/teacher/${result.data.teacher.username}`);
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.log(err, 'error');
    }
  };

  const handleChange = (e) => {
    const names = e.target.name;
    const value = e.target.value;

    SetData((prev) => {
      return { ...prev, [names]: value };
    });
  };

  return (
    <>
      <div className="topbar"></div>
      <div className="container">
        <img src="/images/logo.svg" alt="felt teachers logo" />
        <h1 className="purple">LOGIN</h1>
        <p>SIGN IN WITH YOUR {category.toUpperCase()} ACCOUNT</p>
        <form method="POST" onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              name="username"
              className="input"
              placeholder="Email..."
              onChange={handleChange}
            />
          </label>
          <label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password"
              onChange={handleChange}
            />
          </label>
          <input type="submit" value="LOGIN" className="button submit" />
          <label className="purple">
            <input type="checkbox" name="remember" id="remember" />
            Keep me signed in
          </label>
        </form>
        <p className="button-container">
          <Link to="/recover-password">FORGOT PASSWORD</Link>
        </p>
        <div className="button-container">
          <Link to={`/${category}/register`} className="button">
            Create a {category} account
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
