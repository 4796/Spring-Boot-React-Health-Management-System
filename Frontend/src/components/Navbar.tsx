import { NavLink } from "react-router-dom";
import Container from "./reusable/Container";

import { FaGear } from "react-icons/fa6";
const Navbar = () => {
  return (
    <nav className="border-b-[1px] text-primary border-dark border-opacity-20">
      <Container
        styleCssOverride=" p-4"
        containerCssAdd="flex items-center justify-between"
      >
        <NavLink
          to="/"
          className="hover:opacity-80 active:scale-95 transition-all"
        >
          <span className="text-xl font-extrabold ">Medical House</span>
        </NavLink>

        <ul className="uppercase font-bold text-2xl active:rotate-90 hover:opacity-80 active:scale-95 transition-all">
          <li>
            <NavLink to="/profile">
              <FaGear className="" />
            </NavLink>
          </li>
        </ul>
      </Container>
    </nav>
  );
};

export default Navbar;
