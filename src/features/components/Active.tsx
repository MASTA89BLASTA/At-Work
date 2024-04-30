import React, { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
  useHandleActive,
  useHandleArchive,
} from "hooks/redux";
import { fetchUsers } from "store/reducers/ActionCreators";
import UserList from "./UserList";
import "./styles/Active.scss";
import { archiveUser } from "store/reducers/UserSlice";

interface ActiveProps {
  onArchive: (userId: number) => void;
  onActivate: (userId: number) => void;
}

function Active({ onArchive, onActivate }: ActiveProps): JSX.Element {
  const dispatch = useAppDispatch();

  const { users, isLoading, error } = useAppSelector(
    state => state.userReducer
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

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
