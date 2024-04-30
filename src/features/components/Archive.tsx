import React from "react";
import UserList from "./UserList";

import { IUser } from "models/IUser";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { archiveUser, activateUser } from "store/reducers/UserSlice";

interface ArchiveProps {
  archivedUsers: IUser[];
  onArchive: (userId: number) => void;
  onActivate: (userId: number) => void;
}

function Archive({
  archivedUsers,
}: ArchiveProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(state => state.userReducer);

  const handleArchive = (userId: number) => {
    dispatch(archiveUser(userId));
  };

  const handleActivate = (userId: number) => {
    dispatch(activateUser(userId)); 
  };

  return (
    <div className="arhive-Users_wrapper">
      <div className="arhive-Users">
        <h1 className="arhive-h1">Архив</h1>
        {isLoading && <h1>Идет загрузка....</h1>}
        {archivedUsers.length > 0 ? (
          <UserList
            users={archivedUsers}
            onArchive={handleArchive}
            onActivate={handleActivate}
            isInArchive={true}
          />
        ) : (
          <p>Архив пустой</p>
        )}
      </div>
    </div>
  );
}

export default Archive;
