import { NavLink } from "react-router-dom";
import Container from "./Container";
import logo from "../assets/react.svg";
const Navbar = () => {
  return (
    <nav className="bg-sky-700 text-white">
      <Container
        styleCssOverride=" p-4"
        containerCssAdd="flex items-center justify-between"
      >
        <NavLink to="/">
          <img src={logo} />
        </NavLink>

        <ul className="uppercase font-bold">
          <li>
            <NavLink to="/profile">Profile Settings</NavLink>
          </li>
        </ul>
      </Container>
    </nav>
  );
};

export default Navbar;
