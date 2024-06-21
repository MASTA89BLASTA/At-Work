import React, { useEffect } from "react";
import UserList from "./UserList";
import { IUser } from "models/IUser";
import { useAppSelector } from "hooks/redux";


interface ArchiveProps {
  archivedUsers: IUser[];
  onActivate: (userId: number) => void;
  setCurrentUser: (user: IUser) => void; 
}

function Archive({
  archivedUsers,
  onActivate,
  setCurrentUser
}: ArchiveProps): JSX.Element {
  const {users, isLoading} = useAppSelector(state => state.userReducer);
  
  useEffect(() => {
    setCurrentUser(null); 
  }, [users]);

  return (
    <div className="arhive-Users_wrapper">
      <div className="arhive-Users">
        <h1 className="arhive-h1">Архив</h1>
        {isLoading && <h1>Идет загрузка....</h1>}
        {archivedUsers.length > 0 ? (
          <UserList
            users={archivedUsers}
            onActivate={onActivate}
            setCurrentUser={setCurrentUser}
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
