import { Link, useHistory } from "react-router-dom";

const NavComponent = () => {
  const history = useHistory();

  const logout = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(
        "https://felt-teacher.herokuapp.com/api/logout",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (result.status === "success") {
        sessionStorage.removeItem("token");
        history.push("/");
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <header className="header b-head">
      <nav className="navbar b-nav">
        <div className="logo">
          <img src="/images/logo.svg" alt="Felt teacher logo" />
          <p className="title">FELT TEACHERS</p>
        </div>
        <div className="big-menu">
          <ul className="menu">
            <li>
              <Link to="/teacher/login" className="button">
                Home
              </Link>
            </li>
            <li>
              <button className="button">Logout</button>
            </li>
            <li>
              <img src="/images/p-image.svg" alt="profile" />
            </li>
          </ul>
        </div>
        <div className="mobile-menu">
          <ul className="menu">
            <li>
              <Link to="/" className="button">
                Home
              </Link>
            </li>
            <li>
              <button className="button" onClick={logout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavComponent;
