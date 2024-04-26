import Active from "features/components/Active";
import Arhive from "features/components/Arhive";
import React from "react";

function MainPage(): JSX.Element {
  return (
    <main className="main">
      <Active />
      <Arhive />
    </main>
  );
}

export default MainPage;
