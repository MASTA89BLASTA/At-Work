import React from "react";
import "./Header.scss";
import { useAppSelector } from "hooks/redux";

function Header(): JSX.Element {
  const { currentUser } = useAppSelector(state => state.userReducer);
  return (
    <header className="header">
      <div className="header-wrapper">
        <div className="logo">
          <span className="img-logo"></span>
        </div>
        <div className="register-menu">
          <div className="icon-wrapper">
            <i className="material-icons icon-heart">favorite_border</i>
            <i className="material-icons icon-bell">notifications_none</i>
          </div>
          <div className="user-wrapper">
            <img src="" alt="#" />
            <span className="user-name">{currentUser ? currentUser.name : "Пользователь"}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
