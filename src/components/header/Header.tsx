import React, { useEffect } from "react";
import "./header.scss";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getSearch } from "../../data/functions";
import { SearchTracks, Track } from "../../../types";

interface HeaderProps {
  searchRef: React.RefObject<HTMLInputElement>;
  setSearch: React.Dispatch<React.SetStateAction<SearchTracks>>;
}

const Header: React.FC<HeaderProps> = ({ searchRef, setSearch }) => {
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
    </header>
  );
};

export default Header;
