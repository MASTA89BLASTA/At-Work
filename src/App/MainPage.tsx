import Active from "features/components/Active";
import Archive from "features/components/Archive";
import { useAppDispatch, useAppSelector, useHandleActive, useHandleArchive } from "hooks/redux";
import { IUser } from "models/IUser";
import React, { useEffect } from "react";
import { fetchUsers } from "store/reducers/ActionCreators";
import { setCurrentUser } from "store/reducers/UserSlice";

function MainPage(): JSX.Element {
  const archivedUsers = useAppSelector(
    state => state.userReducer.archivedUsers
  );
  const users = useAppSelector(
    state => state.userReducer.users
  );

  const handleArchive = useHandleArchive();
  const handleActive = useHandleActive();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (users.length === 0 && archivedUsers.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users.length, archivedUsers.length]);

  console.log("Users in MainPage: ", users);

  const handleSetCurrentUser = (user: IUser) => {
    dispatch(setCurrentUser(user)); 
  };

 
  return (
    <main className="main">
      <Active 
        onArchive={handleArchive}
        onActivate={handleActive} 
        setCurrentUser={handleSetCurrentUser}
        />
      <Archive
        archivedUsers={archivedUsers}
        onActivate={handleActive}
        setCurrentUser={handleSetCurrentUser}
      />
    </main>
  );
}

export default MainPage;
