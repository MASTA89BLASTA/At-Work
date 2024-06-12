import React, { useEffect } from "react";
import { useAppSelector } from "hooks/redux";
import UserList from "./UserList";
import "./styles/Active.scss";

interface ActiveProps {
  onArchive: (userId: number) => void;
  onActivate: (userId: number) => void;
}

function Active({ onArchive, onActivate }: ActiveProps): JSX.Element {
  const { users, isLoading } = useAppSelector(state => state.userReducer);

  return (
    <div className="active-Users_wrapper">
      <div className="active-Users">
        <h1 className="active-h1">Активные</h1>
        {isLoading && <h1>Идет загрузка....</h1>}
        {users.length > 0 ? (
          <UserList
            users={users}
            onArchive={onArchive}
            onActivate={onActivate}
          />
        ) : (
          <p>Нет пользователей</p>
        )}
      </div>
    </div>
  );
}

export default Active;
