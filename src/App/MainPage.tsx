import Active from "features/components/Active";
import Archive from "features/components/Archive";
import { useAppDispatch, useAppSelector, useHandleActive, useHandleArchive } from "hooks/redux";
import React, { useEffect } from "react";
import { fetchUsers } from "store/reducers/ActionCreators";

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


  return (
    <main className="main">
      <Active 
        onArchive={handleArchive}
        onActivate={handleActive} 
        />
      <Archive
        archivedUsers={archivedUsers}
        onActivate={handleActive}
      />
    </main>
  );
}

export default MainPage;
