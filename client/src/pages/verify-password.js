const VerifyPassword = () => {
  return (
    <>
      <div className="topbar"></div>
      <div className="container">
        <img src="/images/logo.svg" alt="felt teachers logo" />
        <form>
          <label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input"
            />
          </label>
          <label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="input"
            />
          </label>
          <input type="submit" value="Save" className="submit button" />
        </form>
      </div>
    </>
  );
};

export default VerifyPassword;
