import ProfileData from "features/components/ProfileData";
import ProfileSettings from "features/components/ProfileSettings";
import MyButton from "features/components/UI/button/MyButton";
import { useAppSelector } from "hooks/redux";
import { IUser } from "../models/IUser";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function ProfilePage(): JSX.Element {
  const { profileId } = useParams();

  const navigate = useNavigate();

  const users = useAppSelector(state => state.userReducer.users);

  let user: IUser | undefined;

  if (profileId) {
    user = users.find(user => user.id === +profileId);
  }
  
  const handleClick = (): void => {
    navigate(-1);
  };

  return (
    <div className="profile-page">
      <span
        className="material-icons profile-page_btn-back"
        onClick={handleClick}
      >
        arrow_back
      </span>
      <span className="back-text" onClick={handleClick}>
        Назад
      </span>
      <div className="profile-page_wrapper">
        <ProfileSettings />
        <ProfileData />
      </div>
    </div>
  );
}

export default ProfilePage;
