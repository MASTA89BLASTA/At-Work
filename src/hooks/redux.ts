import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { activateUser, archiveUser } from "store/reducers/UserSlice";
import { AppDispatch, RootState } from "store/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useHandleArchive = () => {
  const dispatch = useAppDispatch();

  return (userId: number) => {
    dispatch(archiveUser(userId));
  };
};
export const useHandleActive = () => {
  const dispatch = useAppDispatch();

  return (userId: number) => {
    dispatch(activateUser(userId));
  };
};