import React from "react";
import "./sidebar.scss";
import { Link } from "react-router-dom";
import { BsHouse } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { IoLibraryOutline } from "react-icons/io5";

interface SidebarProps {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ expanded, setExpanded }) => {
  return (
    <section className="sidebar">
      <div className="logo">
        <Link to="/">
          <h1>{expanded ? "Jónify" : "J"}</h1>
        </Link>
      </div>
      <nav>
        <ul>
          <li className={`active`}>
            <Link to="/">
              <BsHouse />
              {expanded && <h2>Home</h2>}
            </Link>
          </li>
          <li>
            <Link to="/search">
              <AiOutlineSearch />
              {expanded && <h2>Search</h2>}
            </Link>
          </li>
          <li>
            <Link to="/library">
              <IoLibraryOutline />
              {expanded && <h2>Library</h2>}
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Sidebar;
