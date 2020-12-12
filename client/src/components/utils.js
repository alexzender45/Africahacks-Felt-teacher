import { createContext } from 'react';
import { Redirect } from 'react-router-dom';

export const UserContext = createContext(false);

export const withAuth = (Component) => {
    const AuthRoute = () => {
      const isAuth = !!sessionStorage.getItem("token");
      if (isAuth) {
        return <Component />;
      } else {
        return <Redirect to="/" />;
      }
    };
  
    return AuthRoute;
  };