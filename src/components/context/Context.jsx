
import React, {createContext, useContext, useReducer, useState} from 'react';
 
//create a conetext
export const UserContext = createContext({ name: '', auth: false });
// This also works: const UserContext = createContext();

//This function will be the parent of every other component in our app. 
export const UserProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  const [user, setUser] = useState({ name: '', auth: true });

  // Login updates the user data with a name parameter
  const login = (firstName, lastName, profileImgUrl,isLibrarian) => {
    setUser((user) => ({
      firstName,
      lastName,
      profileImgUrl,
      isLibrarian,
      auth: true,
    }));
  };

  const editProfile = (firstName, lastName, profileImgUrl) => {
    setUser((user) => ({
      firstName,
      lastName,
      profileImgUrl,
      auth: true,
    }));
  }

  // Logout updates the user data to default
  const logout = () => {
    setUser((user) => ({
      name: '',
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, login, logout, editProfile }}>
      {children}
    </UserContext.Provider>
  );
}