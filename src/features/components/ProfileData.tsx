import React, { useEffect, useState } from "react";
import "./styles/Profile.scss";
import MyInput from "./UI/input/MyInput";
import { IUser } from "models/IUser";
import MyButton from "./UI/button/MyButton";
import { setFormData, handleFormChange, handleNestedFormChange } from "../../store/reducers/UserSlice";
import { useAppDispatch, useAppSelector } from "hooks/redux";

interface ProfileDataProps {
  user: IUser | undefined;
  onSave: (updatedUser: IUser) => void;
}

function ProfileData({ user, onSave }: ProfileDataProps): JSX.Element {
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.userReducer.formData);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    dispatch(setFormData(user || null));
  }, [user, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    dispatch(handleFormChange({ id, value }));
  };

  const handleNestedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const [parentKey, childKey] = id.split('.') as [keyof IUser, string];
    dispatch(handleNestedFormChange({ parentKey, childKey, value }));
  };

  const handleSave = () => {
    if (!formData || Object.values(formData).some((value) => typeof value === "string" && value === "")) {
      setError("Заполните все поля");
      return;
    }
    setError("");
    onSave(formData);
  };

  const cleanPhoneNumber = (phone: string) => {
    const clean = phone.indexOf("x");
    return clean !== -1 ? phone.substring(0, clean).trim() : phone;
  };

  return (
    <div className="profile-data">
      <div className="profile-data_wrapper">
        <h1 className="profile-data_h1">Данные профиля</h1>
        {error && <p className="profile-data_error">{error}</p>}
        <form action="">
          <div className="profile-data_form-group">
            <label className="profile-data_label" htmlFor="name">
              Имя
            </label>
            <MyInput
              id="name"
              value={formData?.name || ''}
              onChange={handleChange}
            />
          </div>
          <div className="profile-data_form-group">
            <label className="profile-data_label" htmlFor="username">
              Никнейм
            </label>
            <MyInput
              id="username"
              value={formData?.username || ''}
              onChange={handleChange}
            />
          </div>
          <div className="profile-data_form-group">
            <label className="profile-data_label" htmlFor="email">
              Почта
            </label>
            <MyInput
              id="email"
              value={formData?.email || ''}
              onChange={handleChange}
            />
          </div>
          <div className="profile-data_form-group">
            <label className="profile-data_label" htmlFor="address.city">
              Город
            </label>
            <MyInput
              id="address.city"
              value={formData?.address.city || ''}
              onChange={handleNestedChange}
            />
          </div>
          <div className="profile-data_form-group">
            <label className="profile-data_label" htmlFor="phone">
              Телефон
            </label>
            <MyInput
              id="phone"
              value={cleanPhoneNumber(formData?.phone || '')}
              onChange={handleChange}
            />
          </div>
          <div className="profile-data_form-group">
            <label className="profile-data_label" htmlFor="company.name">
              Название компании
            </label>
            <MyInput
              id="company.name"
              value={formData?.company.name || ''}
              onChange={handleNestedChange}
            />
          </div>
          <MyButton className="profile-data_button" onClick={handleSave}>
            Сохранить
          </MyButton>
        </form>
      </div>
    </div>
  );
}

export default ProfileData;
