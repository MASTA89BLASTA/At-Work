import React, { useState } from "react";
import { IUser } from "models/IUser";
import "./styles/UserCard.scss";
import haroldImage from "./img/harold.png";
import { useAppDispatch } from "hooks/redux";
import { removeFromActive } from "store/reducers/UserSlice";

interface UserCardProps {
  user: IUser;
  onArchive?: (userId: number) => void;
  onActivate?: (userId: number) => void;
  isInArchive?: boolean;
}

function UserCard({
  user,
  onArchive,
  onActivate,
  isInArchive,
}: UserCardProps): JSX.Element {
  const [showDropdown, setShowDropdown] = useState(false);
  const city = user.address?.city ?? "";
  const companyName = user.company?.name ?? "";
  const dispatch = useAppDispatch();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleEdit = () => {
    console.log("Редактировать");
  };
  const handleArchive = () => {
    if (onArchive) {
      onArchive(user.id);
    }
  };

  const handleActivate = () => {
    if (onActivate) {
      onActivate(user.id);
    }
  };

  const handleHide = () => {
    dispatch(removeFromActive(user.id));
  };

  return (
    <div className="userCard">
      <img className="userImg" src={haroldImage} alt="" />
      <div className="userCard-info_wrapper">
        <span className="userCard-username">{user.name}</span>
        <span className="userCard-city">{city}</span>
        <span className="userCard-company">{companyName}</span>
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
                <li onClick={handleEdit}>Редактировать</li>
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
