import React from "react";
import "./styles/Profile.scss";
import haroldImage from "./img/harold.png";

function ProfileSettings(): JSX.Element {
  return (
    <div className="profile-settings">
      <div className="profile-settings_wrapper">
        <img className="profile-userImg" src={haroldImage} alt="" />
        <div className="profile-settings-categories">
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;
