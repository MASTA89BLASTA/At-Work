import React, { useState } from "react";
import { IUser } from "models/IUser";
import "./styles/UserCard.scss";
import haroldImage from "./img//harold.png";
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

  const handleArchive = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (onArchive) {
      onArchive(user.id);
    }
    setCurrentUser(null);
  };

  const handleActivate = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (onActivate) {
      onActivate(user.id);
      setCurrentUser(null);
    }
  };

  const handleHide = (event: React.MouseEvent) => {
    event.stopPropagation();
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
      <div className="userCard-wrapper">
        <img className="userImg" src={haroldImage} alt="" />
        <div className="userCard-info_wrapper">
          <div className="userCard-information">
            <div className="userCard-usersettings">
              <span className="userCard-username">{user.name}</span>
              <div className={`userCard-icon ${showDropdown ? "open" : ""}`} onClick={toggleDropdown}>
                <i className="material-icons material-icons_color">more_vert</i>
              </div>
            </div>
            <span className="userCard-company">{companyName}</span>
          </div>
          <span className="userCard-city">{city}</span>
        </div>
        <div className={`dropdown-container ${showDropdown ? "open" : ""}`}>
          <ul className="dropdown-menu">
            {!isInArchive ? (
              <>
                <li className="dropdown-item">
                  <Link className="dropdown-link" to={`/profile/${user.id}`}>
                    Редактировать
                  </Link>
                </li>
                <li className="dropdown-item" onClick={handleArchive}>
                  Архивировать
                </li>
                <li className="dropdown-item" onClick={handleHide}>
                  Скрыть
                </li>
              </>
            ) : (
              <li className="dropdown-item" onClick={handleActivate}>
                Активировать
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
