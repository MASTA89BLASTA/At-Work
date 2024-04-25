import { AppDispatch } from "store/store";
import { IUser } from "models/IUser";
import { userSlice } from "./UserSlice";

export const fetchUsers = () => async(dispatch: AppDispatch) => {

  try {
    dispatch(userSlice.actions.usersFetching());
    const response = await fetch("https://jsonplaceholder.typicode.com/users?_limit=6");
    const data: IUser[] = await response.json();
    dispatch(userSlice.actions.userFetchingSuccess( data ));
    console.log(data)
  } catch(error) {
    dispatch(userSlice.actions.userFetchingError(error.message))
  }

}