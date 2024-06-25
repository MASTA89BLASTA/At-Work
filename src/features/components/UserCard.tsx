import React, { useState } from "react";
import { IUser } from "models/IUser";
import "./styles/UserCard.scss";
import haroldImage from "./img/harold.png";
import { useAppDispatch } from "hooks/redux";
import { removeFromActive } from "store/reducers/UserSlice";
import { Link } from "react-router-dom";

interface UserCardProps {
  user: IUser;
  onArchive?: (userId: number) => void;
  onActivate?: (userId: number) => void;
  isInArchive?: boolean;
  setCurrentUser: (user: IUser | null) => void;
}

function UserCard({
  user,
  onArchive,
  onActivate,
  isInArchive,
  setCurrentUser,
}: UserCardProps): JSX.Element {
  const [showDropdown, setShowDropdown] = useState(false);
  const city = user.address?.city ?? "";
  const companyName = user.company?.name ?? "";
  const dispatch = useAppDispatch();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleArchive = () => {
    if (onArchive) {
      onArchive(user.id);
    }
    setCurrentUser(null);
  };

  const handleActivate = () => {
    if (onActivate) {
      onActivate(user.id);
      setCurrentUser(null);
    }
  };

  const handleHide = () => {
    dispatch(removeFromActive(user.id));
    setCurrentUser(null);
  };

  const handleClick = () => {
    if (!isInArchive) {
      setCurrentUser(user);
    }
  };

  return (
    <div
      className={`userCard ${isInArchive ? "userCard-archived" : ""}`}
      onClick={handleClick}
    >
      <img className="userImg" src={haroldImage} alt="" />
      <div className="userCard-info_wrapper">
        <span className="userCard-username">{user.name}</span>
        <span className="userCard-company">{companyName}</span>
        <span className="userCard-city">{city}</span>
      </div>
      <div className="dropdown-container">
        <i
          className="material-icons material-icons_color"
          onClick={toggleDropdown}
        >
          more_vert
        </i>
        {showDropdown && (
          <ul className="dropdown-menu">
            {!isInArchive ? (
              <>
                <li>
                  <Link to={`/profile/${user.id}`}>Редактировать</Link>
                </li>
                <li onClick={handleArchive}>Архивировать</li>
                <li onClick={handleHide}>Скрыть</li>
              </>
            ) : (
              <li onClick={handleActivate}>Активировать</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default UserCard;
