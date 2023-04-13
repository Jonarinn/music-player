import React, { useEffect } from "react";
import "./header.scss";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getSearch } from "../../data/functions";
import { SearchTracks, Track } from "../../../types";
import { signOut, User } from "firebase/auth";
import { auth } from "../../../firebase.config";

interface HeaderProps {
  searchRef: React.RefObject<HTMLInputElement>;
  setSearch: React.Dispatch<React.SetStateAction<SearchTracks>>;
  user: User | null;
}

const Header: React.FC<HeaderProps> = ({ searchRef, setSearch, user }) => {
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
    const search = searchRef.current?.value;
    getSearch(searchRef.current?.value as string)
      .then((res) => setSearch({ search: search as string, tracks: res }))
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
          <input ref={searchRef} type="text" />
          <button type="submit">Search</button>
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
