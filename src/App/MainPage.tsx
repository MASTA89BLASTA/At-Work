import Active from "features/components/Active";
import Archive from "features/components/Archive";
import { useAppSelector, useHandleActive, useHandleArchive } from "hooks/redux";
import React, { useState } from "react";

function MainPage(): JSX.Element {
  const archivedUsers = useAppSelector(
    state => state.userReducer.archivedUsers
  );

  const handleArchive = useHandleArchive();
  const handleActive = useHandleActive();

  return (
    <main className="main">
      <Active onArchive={handleArchive}
        onActivate={handleActive} 
        />
      <Archive
        archivedUsers={archivedUsers}
        onArchive={handleArchive}
        onActivate={handleActive}
      />
    </main>
  );
}

export default MainPage;
