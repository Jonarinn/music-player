import React, { useContext, useState } from "react";
import "./header.scss";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AlertType,
  NotificationType,
  SearchTracks,
  TrackObject,
} from "../../types";
import { signOut, User } from "firebase/auth";
import { auth } from "../../../firebase.config";
import { AiOutlineSearch } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { APIController } from "../../data/functions";
import { TokenContext } from "../../context";
import { BiBell, BiUser } from "react-icons/bi";
import { DropdownMenu, DropdownMenuItem } from "../Dropdown";

interface HeaderProps {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  setSearch: React.Dispatch<React.SetStateAction<SearchTracks>>;
  user: User | null;
  setAlert: React.Dispatch<React.SetStateAction<AlertType | null>>;
}

const Header: React.FC<HeaderProps> = ({
  searchInput,
  setSearch,
  user,
  setSearchInput,
  setAlert,
}) => {
  const sampleNotifications: NotificationType[] = [
    {
      type: "info",
      read: false,
      message: "Jon followed you",
      title: "New follower",
    },
    {
      type: "success",
      read: false,
      message: "Jon liked your track",
      title: "New like",
    },
  ];

  const location = useLocation();
  const navigate = useNavigate();
  const [notifications, setNotifications] =
    useState<NotificationType[]>(sampleNotifications);
  const [newNotifications, setNewNotifications] = useState<number>(
    notifications.map((n) => n.read).filter((n) => !n).length
  );

  const accessToken = useContext(TokenContext);

  const handleBack = () => {
    navigate(-1);
  };

  const handleForward = () => {
    navigate(1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchInput || !accessToken) return;
    APIController.getSearch(accessToken, searchInput, ["artist", "track"]).then(
      (res: Omit<SearchTracks, "search">) => {
        setSearch({ ...res, search: searchInput });
      }
    );
  };

  const handleSignOut = () => {
    if (!user) return;
    signOut(auth)
      .then(() => {
        setAlert({
          type: "Success",
          message: "Signed out successfully",
        });
        navigate("/login");
        setTimeout(() => {
          setAlert(null);
        }, 3000);
      })
      .catch((err: Error) => {
        setAlert({
          type: "Error",
          message: err.message,
        });
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleClear = () => {
    setSearchInput("");
    setSearch({} as SearchTracks);
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
            <button onClick={handleClear}>
              <RxCross2 />
            </button>
          ) : (
            <></>
          )}
        </form>
      </nav>

      <nav>
        {user ? (
          <div className="header__actions">
            <ul>
              <li>
                <button
                  data-notifications={newNotifications}
                  className={`${newNotifications === 0 ? "" : "notifications"}`}
                >
                  <BiBell />
                </button>
              </li>
              <li>
                <div>
                  <DropdownMenu buttonIcon={<BiUser />}>
                    <DropdownMenuItem>Jon</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                  </DropdownMenu>
                </div>
              </li>
            </ul>
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
