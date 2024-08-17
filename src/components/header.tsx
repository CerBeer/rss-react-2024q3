import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="title" data-testid="title">
      <h1>React Forms</h1>
      <NavLink to="/regular" className="link">
        Regular Forms
      </NavLink>
      <NavLink to="/controlled" className="link">
        Controlled Forms
      </NavLink>
      <NavLink to="/" className="link">
        Home
      </NavLink>
    </div>
  );
}

export default Header;
