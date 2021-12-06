import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUser } from "../services/user/provider";
import Loader from "../../../common/components/Loader";

const AuthenticationWrapper = ({ children }) => {
  const { isAuthenticated, isLoading } = useUser();
  const router = useRouter();
  const pagesWithNoAuthentication = ['/login', '/signup', '/landing'];

  useEffect(async () => {
    if (isAuthenticated === false && isLoading === false) {
      if (
        pagesWithNoAuthentication.includes(router.pathname) === false
      ) {
        router.replace('/landing');
      }
    }
  }, [isAuthenticated, isLoading, router.pathname]);

  if (
    isAuthenticated === true ||
    pagesWithNoAuthentication.includes(router.pathname)
  ) {
    return children;
  } else {
    return (
      <div className="page-loader-container">
        <Loader />
      </div>
    );
  }
};

export default AuthenticationWrapper;
