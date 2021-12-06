import { useContext, createContext } from "react";
import { useUserService } from ".";

const User = createContext();

/**
 * wrap this component around the children to provide them with the user service functionalities
 * functionalities: login signup social login isAuthenticated user...
 * @param {React.Component} children
 * @returns {React.Component}
 */
export const UserProvider = ({ children }) => {
  const store = useUserService();
  return <User.Provider value={store}>{children}</User.Provider>;
};

/**
 * a hook to retrieve the values provided by the userProvider
 * to be used inside a child component of userProvider
 * @returns
 */
export const useUser = () => {
  const userContext = useContext(User);
  if (userContext === undefined) {
    throw new Error("useUser must be used inside UserProvider");
  }
  return userContext;
};
