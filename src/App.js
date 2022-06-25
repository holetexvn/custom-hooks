import { useEffect, useState } from 'react';
import { useReducer } from './hooks/useReducer';

function fetchReducer(state, action) {
  switch (action.type) {
    case 'fetchAPI/request':
      return { ...state, isLoading: action.isLoading };
    case 'fetchAPI/success':
    case 'fetchAPI/error':
      return {
        ...state,
        isLoading: action.isLoading,
        error: action.error,
        data: action.data,
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(fetchReducer, {
    data: [],
    isLoading: false,
    error: null,
  });

  const { data: users, isLoading, error } = state;
  const fetchUsers = async () => {
    dispatch({
      type: 'fetchAPI/request',
    });
    try {
      const res = await fetch('https://reqres.in/api/users');
      const { data } = await res.json();

      dispatch({
        type: 'fetchAPI/success',
        isLoading: false,
        error: null,
        data,
      });
    } catch (err) {
      dispatch({
        type: 'fetchAPI/error',
        isLoading: false,
        error: err,
        data: [],
      });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (error) {
    return 'Something wrong!!!';
  }

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    users.map((user) => (
      <p>
        {user.first_name} {user.last_name}
      </p>
    ))
  );
}

export default App;
