import { Navigate, Route, Routes } from "react-router-dom";
import RouteSwitcher from "../utils/routing/RouteSwitcher";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import ProgramProvider from "./programProvider";
import Candidates from "./candidates";
import NotFound from "./NotFound";
import {
  selectFullProviderInfo,
  selectIsAuthenticated,
  useAppSelector,
} from "../appStore";
import { ADMIN_ROUTE } from "../types";
import VerifyEmail from "./VerifyEmail";

type ProviderProps = {
  adjustBasename: (arg: string) => void;
};

const Provider = ({ adjustBasename }: ProviderProps) => {
  const fullProviderInfo = useAppSelector(selectFullProviderInfo);
  const isLoggedIn = useAppSelector(selectIsAuthenticated);
  if (isLoggedIn && fullProviderInfo === null) {
    adjustBasename(ADMIN_ROUTE);
  }
  return (
    <Routes>
      {/** Public routes */}
      <Route index element={<Navigate to="signin" />} />
      {/** Only unauthorized users */}
      <Route path="/signin" element={<RouteSwitcher component={Login} />} />
      <Route
        path="/forgot-password"
        element={<RouteSwitcher component={ForgotPassword} />}
      />
      <Route
        path="/reset-password"
        element={<RouteSwitcher component={ResetPassword} />}
      />
      <Route
        path="/verify-code"
        element={<RouteSwitcher verifying={true} component={VerifyEmail} />}
      />
      {/** Only authorized routes */}
      <Route path="/provider/*" element={<ProgramProvider />} />
      <Route path="/candidate/*" element={<Candidates />} />
      {/** 404 page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Provider;
