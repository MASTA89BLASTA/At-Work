import ProfileData from "features/components/ProfileData";
import ProfileSettings from "features/components/ProfileSettings";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { IUser } from "../models/IUser";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateUser } from "store/reducers/UserSlice";
import { useEffect, useState } from "react";
import MyButton from "features/components/UI/button/MyButton";

function ProfilePage(): JSX.Element {
  const { profileId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.userReducer.users);
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    if (profileId) {
      const foundUser = users.find(user => user.id === +profileId);
      setUser(foundUser);
    }
  }, [profileId, users]);
  
  useEffect(() => {
    console.log("Location changed:", location);
  }, [location]);

  const handleSave = (updatedUser: IUser) => {
    dispatch(updateUser(updatedUser));
    setIsModalOpen(true);
    console.log("Updated User: ", updatedUser);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleClick = (): void => {
    navigate(-1);
  };


  return (
    <div className="profile-page">
      <div className="profile-page_back">
        <span
          className="material-icons profile-page_btn-back"
          onClick={handleClick}
        >
          arrow_back
        </span>
        <span className="profile-page_back-text" onClick={handleClick}>
          Назад
        </span>
      </div>
      <div className="profile-page_wrapper">
        <ProfileSettings />
        {user ? (
          <ProfileData user={user} onSave={handleSave} />
        ) : (
          <p>Загрузка данных пользователя...</p>
        )}
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal_content">
            <p>Изменения сохранены!</p>
            <MyButton onClick={handleCloseModal}>Закрыть</MyButton>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
