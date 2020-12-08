import HomeIntro from "./verify-password";

const RecoverPassword = () => {
  return (
    <>
      <div className="topbar"></div>
      <div className="container">
        <div className="top">
          <img src="/images/logo.svg" alt="felt teachers logo" />
          RECOVER PASSWORD
        </div>

        <form>
          <label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input"
            />
          </label>
          <input type="submit" value="Reset" className="submit button" />
        </form>
      </div>
    </>
  );
};

export default RecoverPassword;
