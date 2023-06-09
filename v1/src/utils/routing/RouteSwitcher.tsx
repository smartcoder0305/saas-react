import React from "react";
import { Navigate } from "react-router-dom";
import {
  selectProviderInfo,
  selectCurrentRole,
  selectIsAuthenticated,
  useAppSelector,
  selectIsVerified,
  useAppDispatch,
  setRole,
} from "../../appStore";
import { ADMIN, PROVIDER } from "../../types";

const RouteSwitcher = ({
  component: Component,
  requireLogin = false,
  verifying = false,
}: {
  component: React.FC;
  requireLogin?: boolean;
  verifying?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isVerified = useAppSelector(selectIsVerified);
  const currentRole = useAppSelector(selectCurrentRole);
  const providerInfo = useAppSelector(selectProviderInfo);
  if (!verifying && isAuthenticated === requireLogin) {
    return <Component />;
  }

  if (isAuthenticated) {
    if (!isVerified) {
      if (verifying) {
        console.log("gets here in isAuthenticated->!isVerified->verifying");
        return <Component />;
      }
      console.log("gets here in isAuthenticated->isVerified");
      return <Navigate to="/verify-code" />;
    }
    if (providerInfo === null) {
      return <Navigate to={`/dashboard`} />;
    } else {
      let subRoute = currentRole.persona;
      if (subRoute === ADMIN) {
        subRoute = PROVIDER;
        dispatch(setRole(PROVIDER));
      }
      return <Navigate to={`/${subRoute.toLowerCase()}/dashboard`} />;
    }
  } else {
    return <Navigate to="/signin" />;
  }
};

export default RouteSwitcher;
