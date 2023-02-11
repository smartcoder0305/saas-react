import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Navigate } from "react-router-dom";
import Admin from "./pages/admin";
import NotFound from "./pages/NotFound";
//
import "./styles/root.css";
import Alert from "./pages/Alert";
import {
  getAccessToken,
  getProviderInfo,
  useAppDispatch,
  useAppSelector,
} from "./appStore";
import Loading from "./utils/routing/Loading";
import { USER_CLIENT } from "./appStore/axiosInstance";
import {
  ADMIN_ROUTE,
  FULFILLED,
  LOADING,
  NOT_FOUND,
  REJECTED,
  VALID_BASENAME,
} from "./types";
import Provider from "./pages/Provider";
import DefaultRoute from "./utils/routing/DefaultRoute";

function App() {
  /** Set authToken to Axois Defaults Header */
  const accessToken = useAppSelector(getAccessToken);
  useEffect(() => {
    if (accessToken) {
      USER_CLIENT.defaults.headers.common["Authorization"] = accessToken;
    } else {
      delete USER_CLIENT.defaults.headers.common["Authorization"];
    }
  }, [accessToken]);
  /***************************************** */

  /** Analyze identifier in the URL */
  const dispatch = useAppDispatch();
  const [providerStatus, setProviderStatus] = useState<string>(LOADING);
  const [basename, setBasename] = useState<string>(
    window.location.pathname.split("/")[1].trim()
  );

  useEffect(() => {
    if (basename) {
      dispatch(getProviderInfo(basename)).then((action) => {
        if (action.meta.requestStatus === FULFILLED) {
          setProviderStatus(VALID_BASENAME);
        } else if (action.meta.requestStatus === REJECTED) {
          setProviderStatus(NOT_FOUND);
        }
      });
    } else {
      setProviderStatus(VALID_BASENAME);
    }
  }, []);

  const adjustBasename = (newBasename: string) => {
    setBasename(newBasename);
  };

  /************************************* */

  if (providerStatus === LOADING) {
    return <Loading />;
  } else if (providerStatus === NOT_FOUND) {
    return <NotFound />;
  }
  return (
    <Router basename={"/" + basename}>
      <Alert />
      {basename === ADMIN_ROUTE ? (
        <Admin adjustBasename={adjustBasename} />
      ) : basename ? (
        <Provider adjustBasename={adjustBasename} />
      ) : (
        <DefaultRoute adjustBasename={adjustBasename} />
      )}
    </Router>
  );
}

export default App;
