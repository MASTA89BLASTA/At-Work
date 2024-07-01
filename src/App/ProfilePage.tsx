import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { IUser } from "../models/IUser";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateUser } from "store/reducers/UserSlice";
import ProfileData from "features/components/ProfileData";
import ProfileSettings from "features/components/ProfileSettings";
import Workspace from "features/components/Workspace";
import Privacy from "features/components/Privacy";
import Security from "features/components/Security";
import MyButton from "features/components/UI/button/MyButton";

function ProfilePage(): JSX.Element {
  const { profileId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.userReducer.users);
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("profileData");

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
  const renderContent = () => {
    switch (selectedCategory) {
      case "profileData":
        return user ? (
          <ProfileData user={user} onSave={handleSave} />
        ) : (
          <p>Загрузка данных пользователя...</p>
        );
      case "workspace":
        return <Workspace />;
      case "privacy":
        return <Privacy />;
      case "security":
        return <Security />;
      default:
        return null;
    }
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
        <ProfileSettings
          onCategoryChange={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
        {renderContent()}
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <MyButton
              className="modal-button material-icons myInput-clear-icon"
              onClick={handleCloseModal}
            >
              close
            </MyButton>
            <div className="modal-icon">
              <span className="modal-icon_check material-icons">done</span>
            </div>
            <p className="modal-text">Изменения сохранены!</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
