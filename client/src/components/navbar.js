import "./navbar.css";

const NavBar = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          <img src="/images/logo.svg" alt="Felt teacher logo" />
          <p className="title">FELT TEACHERS</p>
        </div>
        <ul className="menu">
          <li>
            <a href="/" className="button">
              Sign in as a Teacher
            </a>
          </li>
          <li>
            <a href="/" className="button">
              Sign in as a School Owner
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
