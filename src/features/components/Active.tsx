import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { fetchUsers } from 'store/reducers/ActionCreators';
function Active (): JSX.Element {

  const dispatch = useAppDispatch();
  const {users, isLoading, error} = useAppSelector(state => state.userReducer)
  
  useEffect(() => {
    dispatch(fetchUsers())
  }, []);

  return (
    <div className='Active'>
      {isLoading && <h1>Идет загрузка....</h1>}
      {JSON.stringify(users, null, 2)}
    </div>
  );
};

export default Active;