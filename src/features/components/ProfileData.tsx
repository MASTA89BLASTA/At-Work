import React from "react";
import "./styles/Profile.scss";
import MyInput from "./UI/input/MyInput";
import { IUser } from "models/IUser";

interface ProfileDataProps {
  user: IUser | undefined;
}

function ProfileData({ user }: ProfileDataProps): JSX.Element {
  if (!user) {
    return <div>User not found</div>;
  }
  const cleanPhoneNumber = (phone: string) => {
    const clean = phone.indexOf("x");
    return clean !== -1 ? phone.substring(0, clean).trim() : phone;
  };
  return (
    <div className="profile-data">
      <div className="profile-data_wrapper">
        <h1 className="profile-data_h1">Данные профиля</h1>
        <form action="">
          <div className="profile-data_form-group">
            <label className="profile-data_label" htmlFor="name">
              Имя
            </label>
            <MyInput id="name" defaultValue={user.name} />
          </div>
          <div className="profile-data_form-group">
            <label className="profile-data_label" htmlFor="username">
              Никнейм
            </label>
            <MyInput id="username" defaultValue={user.username} />
          </div>
          <div className="profile-data_form-group">
            <label className="profile-data_label" htmlFor="email">
              Почта
            </label>
            <MyInput id="email" defaultValue={user.email} />
          </div>
          <div className="profile-data_form-group">
            <label className="profile-data_label" htmlFor="city">
              Город
            </label>
            <MyInput id="city" defaultValue={user.address.city} />
          </div>
          <div className="profile-data_form-group">
            <label className="profile-data_label" htmlFor="phone">
              Телефон
            </label>
            <MyInput id="phone" defaultValue={cleanPhoneNumber(user.phone)} />
          </div>
          <div className="profile-data_form-group">
            <label className="profile-data_label" htmlFor="companyName">
              Название компании
            </label>
            <MyInput id="companyName" defaultValue={user.company.name} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileData;
