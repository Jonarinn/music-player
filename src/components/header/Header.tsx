import React, { useEffect } from "react";
import "./header.scss";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getSearch } from "../../data/functions";
import { SearchTracks, Track } from "../../../types";
import { signOut, User } from "firebase/auth";
import { auth } from "../../../firebase.config";
import { AiOutlineSearch } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";

interface HeaderProps {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  setSearch: React.Dispatch<React.SetStateAction<SearchTracks>>;
  user: User | null;
}

const Header: React.FC<HeaderProps> = ({
  searchInput,
  setSearch,
  user,
  setSearchInput,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const handleForward = () => {
    navigate(1);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getSearch(searchInput)
      .then((res) => setSearch({ search: searchInput as string, tracks: res }))
      .catch((err) => console.log(err));
  };

  const handleSignOut = () => {
    if (!user) return;
    signOut(auth)
      .then(() => {
        console.log("Signed out");
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/login");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <header>
      <nav>
        <button onClick={handleBack}>
          <BsChevronLeft />
        </button>
        <button onClick={handleForward}>
          <BsChevronRight />
        </button>

        <form
          onSubmit={handleSubmit}
          className={`${location.pathname === "/search" ? "" : "hidden"}`}
        >
          <button type="submit">
            <AiOutlineSearch />
          </button>
          <input
            value={searchInput}
            onChange={handleChange}
            type="text"
            placeholder="Search"
          />
          {searchInput ? (
            <button onClick={() => setSearchInput("")}>
              <RxCross2 />
            </button>
          ) : (
            <></>
          )}
        </form>
      </nav>

      <nav>
        {user ? (
          <div>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        ) : (
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
