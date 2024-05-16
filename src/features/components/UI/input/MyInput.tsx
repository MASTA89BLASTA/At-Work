import React from "react";

import "../input/MyInput.scss"

const MyInput = React.forwardRef<HTMLInputElement>((props, ref) => {
  return (
    <input ref={ref} className="myInput" {...props} />
  ); 
});

export default MyInput;