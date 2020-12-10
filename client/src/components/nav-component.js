import { Link } from "react-router-dom";

const NavComponent = () => {
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
              <button className="button">Logout</button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavComponent;
