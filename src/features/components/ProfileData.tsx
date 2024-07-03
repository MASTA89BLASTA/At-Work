import React, { useEffect, useState } from "react";
import "./styles/Profile.scss";
import MyInput from "./UI/input/MyInput";
import { IUser } from "models/IUser";
import MyButton from "./UI/button/MyButton";
import {
  setFormData,
  handleFormChange,
  handleNestedFormChange,
  setFormError,
} from "../../store/reducers/UserSlice";
import { cleanPhoneNumber } from "features/utils/utils";
import { useAppDispatch, useAppSelector } from "hooks/redux";

interface ProfileDataProps {
  user: IUser | undefined;
  onSave: (updatedUser: IUser) => void;
}

function ProfileData({ user, onSave }: ProfileDataProps): JSX.Element {
  const dispatch = useAppDispatch();
  const formData = useAppSelector(state => state.userReducer.formData);
  const formError = useAppSelector(state => state.userReducer.formError);

  useEffect(() => {
    dispatch(setFormData(user || null));
  }, [user, dispatch]);

  // useEffect(() => {
  //   setFormError();
  // }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const { value } = e.target;
    dispatch(handleFormChange({ id, value }));
    setFormError();
  };

  const handleNestedChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const { value } = e.target;
    const [parentKey, childKey] = id.split(".") as [keyof IUser, string];
    dispatch(handleNestedFormChange({ parentKey, childKey, value }));
    setFormError();
  };

  const handleSave = () => {
    if (!formError) {
      dispatch(setFormError());
      onSave(formData);
      return;
    }
  };

  const handleClear = (id: string) => {
    dispatch(handleFormChange({ id, value: "" }));
    setFormError();
  };
  const handleNestedClear = (id: string) => {
    const [parentKey, childKey] = id.split(".") as [keyof IUser, string];
    dispatch(handleNestedFormChange({ parentKey, childKey, value: "" }));
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
            <MyInput
              id="name"
              value={formData?.name || ""}
              onChange={e => handleChange(e, "name")}
              onClear={() => handleClear("name")}
            />
          </div>
          <div className="profile-data_form-group">
            <label className="profile-data_label" htmlFor="username">
              Никнейм
            </label>
            <MyInput
              id="username"
              value={formData?.username || ""}
              onChange={e => handleChange(e, "username")}
              onClear={() => handleClear("username")}
            />
          </div>
          <div className="profile-data_form-group">
            <label className="profile-data_label" htmlFor="email">
              Почта
            </label>
            <MyInput
              id="email"
              value={formData?.email || ""}
              onChange={e => handleChange(e, "email")}
              onClear={() => handleClear("email")}
            />
          </div>
          <div className="profile-data_form-group">
            <label className="profile-data_label" htmlFor="address.city">
              Город
            </label>
            <MyInput
              id="address.city"
              value={formData?.address.city || ""}
              onChange={e => handleNestedChange(e, "address.city")}
              onClear={() => handleNestedClear("address.city")}
            />
          </div>
          <div className="profile-data_form-group">
            <label className="profile-data_label" htmlFor="phone">
              Телефон
            </label>
            <MyInput
              id="phone"
              value={cleanPhoneNumber(formData?.phone || "")}
              onChange={e => handleChange(e, "phone")}
              onClear={() => handleClear("phone")}
            />
          </div>
          <div className="profile-data_form-group">
            <label className="profile-data_label" htmlFor="company.name">
              Название компании
            </label>
            <MyInput
              id="company.name"
              value={formData?.company.name || ""}
              onChange={e => handleNestedChange(e, "company.name")}
              onClear={() => handleNestedClear("company.name")}
            />
          </div>
          {formError && <p className="profile-data_error">{formError}</p>}
          <MyButton className="profile-data_button" onClick={handleSave}>
            Сохранить
          </MyButton>
        </form>
      </div>
    </div>
  );
}

export default ProfileData;
