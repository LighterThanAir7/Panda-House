import {createContext, useEffect, useState} from 'react';

const PORT = import.meta.env.VITE_PORT;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${BASE_URL}:${PORT}/api/users/profile`, {
        method: 'GET',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          // console.log('Profile fetch response:', response);
          return response.json();
        })
        .then(data => {
         //  console.log('Profile fetch data:', data);
          if (data.user) {
            setUser(data.user);
          }
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};