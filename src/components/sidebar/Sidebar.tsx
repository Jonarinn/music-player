import React from "react";
import "./sidebar.scss";
import { Link, useLocation } from "react-router-dom";
import { BsHouse, BsHouseFill } from "react-icons/bs";
import { IoLibraryOutline, IoLibrarySharp } from "react-icons/io5";
import { RiSearch2Fill, RiSearch2Line } from "react-icons/ri";

interface SidebarProps {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ expanded, setExpanded }) => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <section className="sidebar">
      <div className="logo">
        <Link to="/">
          <h1>{expanded ? "Jónify" : "J"}</h1>
        </Link>
      </div>
      <nav>
        <ul>
          <li className={`${path === "/" ? "active" : ""}`}>
            <Link to="/">
              {path === "/" ? <BsHouseFill /> : <BsHouse />}
              {expanded && <h2>Home</h2>}
            </Link>
          </li>
          <li className={`${path === "/search" ? "active" : ""}`}>
            <Link to="/search">
              {path === "/search" ? <RiSearch2Fill /> : <RiSearch2Line />}
              {expanded && <h2>Search</h2>}
            </Link>
          </li>
          <li className={`${path === "/library" ? "active" : ""}`}>
            <Link to="/library">
              {path === "/library" ? <IoLibrarySharp /> : <IoLibraryOutline />}
              {expanded && <h2>Library</h2>}
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Sidebar;
