import React from "react";
import "./styles/Profile.scss";
import MyInput from "./UI/input/MyInput";

function ProfileData(): JSX.Element {
  return (
    <div className="profile-data">
      <div className="profile-data_wrapper">
        <h1 className="profile-data_h1">Данные профиля</h1>
        <MyInput />
      </div>
    </div>
  );
}

export default ProfileData;
