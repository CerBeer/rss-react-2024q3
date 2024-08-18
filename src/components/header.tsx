import { NavLink } from "react-router-dom";
import "./header.css";

function Header() {
  return (
    <div className="header">
      <div className="title">
        <h1>React Forms</h1>
      </div>
      <nav className="navigation">
        <NavLink to="/regular" className="link">
          Regular Form
        </NavLink>
        <NavLink to="/controlled" className="link">
          Controlled Form
        </NavLink>
        <NavLink to="/" className="link">
          Home
        </NavLink>
      </nav>
    </div>
  );
}

export default Header;
