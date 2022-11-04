
 import {AppUserContext} from './Context';
 
const UserContextProvider = () => (
  <AppUserContext.Provider value="dark-mode">
    <Dashboard />
    <Login />
    <Setting/>
  </AppUserContext.Provider>
);