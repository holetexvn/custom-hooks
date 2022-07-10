import { useFetch } from './hooks/useFetch';

function App() {
  const {
    data: users,
    isLoading,
    error,
  } = useFetch('https://reqres.in/api/users');

  if (error) {
    return 'Something wrong!!!';
  }

  console.log({isLoading})

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
