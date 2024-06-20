import React from "react";
import "./styles/Profile.scss";
import haroldImage from "./img/harold.png";

interface ProfileSettingsProps {
  onCategoryChange: (category: string) => void;
  selectedCategory: string;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  onCategoryChange, selectedCategory
}) => {
  return (
    <div className="profile-settings">
      <div className="profile-settings_wrapper">
        <img className="profile-userImg" src={haroldImage} alt="" />
        <div className="profile-settings_categories">
          <ul className="profile-settings_items">
            <li
              onClick={() => onCategoryChange("profileData")}
              className={selectedCategory === "profileData" ? "selected" : ""}
            >
              Данные профиля
            </li>
            <li
              onClick={() => onCategoryChange("workspace")}
              className={selectedCategory === "workspace" ? "selected" : ""}
            >
              Рабочее пространство
            </li>
            <li
              onClick={() => onCategoryChange("privacy")}
              className={selectedCategory === "privacy" ? "selected" : ""}
            >
              Приватнось
            </li>
            <li
              onClick={() => onCategoryChange("security")}
              className={selectedCategory === "security" ? "selected" : ""}
            >
              Безопасность
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
