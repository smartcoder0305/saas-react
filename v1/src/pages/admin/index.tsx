import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./auth/Signup";
import InviteClient from "./auth/InviteClient";
import InviteCoworker from "./auth/InviteCoworker";
import ClientList from "./dashboard/ClientList";
import ClientProfile from "./dashboard/ClientProfile";
import SetPassword from "./auth/SetPassword";
import Login from "./auth/Login";
import RouteSwitcher from "../../utils/routing/RouteSwitcher";
import {
  selectFullProviderInfo,
  selectIsAuthenticated,
  useAppSelector,
} from "../../appStore";
import ForgotPassword from "../ForgotPassword";
import ResetPassword from "../ResetPassword";
import NotFound from "../NotFound";

type AdminProps = {
  adjustBasename: (arg: string) => void;
};

const Admin = ({ adjustBasename }: AdminProps) => {
  const fullProviderInfo = useAppSelector(selectFullProviderInfo);
  const isLoggedIn = useAppSelector(selectIsAuthenticated);
  if (isLoggedIn && fullProviderInfo !== null) {
    adjustBasename(fullProviderInfo.providerAlias);
  }
  return (
    <Routes>
      <Route index element={<Navigate to="signin" />} />
      <Route path="/signin" element={<RouteSwitcher component={Login} />} />
      <Route
        path="/forgot-password"
        element={<RouteSwitcher component={ForgotPassword} />}
      />
      <Route
        path="/reset-password"
        element={<RouteSwitcher component={ResetPassword} />}
      />
      <Route path="/signup" element={<RouteSwitcher component={Signup} />} />
      <Route
        path="/set-password"
        element={<RouteSwitcher component={SetPassword} />}
      />
      <Route
        path="/invite-client"
        element={<RouteSwitcher requireLogin={true} component={InviteClient} />}
      />
      <Route
        path="/invite-coworker"
        element={
          <RouteSwitcher requireLogin={true} component={InviteCoworker} />
        }
      />
      <Route path="/dashboard">
        <Route
          index
          element={<RouteSwitcher requireLogin={true} component={ClientList} />}
        ></Route>
        <Route
          path="client-profile/:id"
          element={
            <RouteSwitcher requireLogin={true} component={ClientProfile} />
          }
        ></Route>
      </Route>
      {/** 404 page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Admin;
