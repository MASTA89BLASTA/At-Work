import React from "react";
import { IUser } from "models/IUser";
import UserCard from "./UserCard";
import "./styles/UserList.scss";

interface UserListProps {
  users: IUser[];
  onArchive?: (userId: number) => void;
  onActivate?: (userId: number) => void;
  
  isInArchive?: boolean;
}

function UserList({
  users,
  onArchive,
  onActivate,
  isInArchive,

}: UserListProps) {
  console.log("Обработчик активации пользователя в компоненте UserList вызван");
  return (
    <div className="userList">
      {users.length > 0 ? (
        users.map(user => (
          <UserCard
            key={user.id}
            user={user}
            onArchive={onArchive}
            onActivate={onActivate}
            isInArchive={isInArchive}

          />
        ))
      ) : (
        <p>No users to display</p>
      )}
    </div>
  );
}

export default UserList;
