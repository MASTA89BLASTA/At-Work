import React from "react";
import UserList from "./UserList";
import { IUser } from "models/IUser";
import { useAppSelector } from "hooks/redux";


interface ArchiveProps {
  archivedUsers: IUser[];
  onActivate: (userId: number) => void;
}

function Archive({
  archivedUsers,
  onActivate
}: ArchiveProps): JSX.Element {
  const { isLoading} = useAppSelector(state => state.userReducer);

  return (
    <div className="arhive-Users_wrapper">
      <div className="arhive-Users">
        <h1 className="arhive-h1">Архив</h1>
        {isLoading && <h1>Идет загрузка....</h1>}
        {archivedUsers.length > 0 ? (
          <UserList
            users={archivedUsers}
            onActivate={onActivate}
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
