import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Button, Divider, MenuItem, Stack } from "@mui/material";
import { Logo } from "..";
import HomeIconPrimary from "../../assets/icons/home-sidebar-icon-primary.svg";
import BackIconPrimary from "../../assets/icons/back-sidebar-icon-primary.svg";
import {
  authLogout,
  selectCurrentRoleIndex,
  selectRoles,
  selectUserDisplayName,
  setCurrentRoleIndexTo,
  useAppDispatch,
  useAppSelector,
  selectIsAuthenticated,
} from "../../appStore";
import MenuDropdown from "../layout/MenuDropdown";
import { ADMIN, PROVIDER } from "../../types";

type Props = {
  logo?: boolean;
  screen?: any;
};

/**
 *  Base sidebar component
 * @param logo - boolean, optional : detaerines if the logo is shown
 */

const Sidebar = (props: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useState(useAppSelector(selectIsAuthenticated));
  const [currentRoles, setCurrentRoles] = useState(useAppSelector(selectRoles));
  const [currentRoleIndex, setCurrentRoleIndex] = useState(
    useAppSelector(selectCurrentRoleIndex)
  );
  const [displayName, setDisplayName] = useState(
    useAppSelector(selectUserDisplayName).split(" ")
  );
  const currentPersona = currentRoles[currentRoleIndex].persona;

  const switchRoleTo = (index: number) => {
    dispatch(setCurrentRoleIndexTo(index));
  };

  const handleLogout = () => {
    dispatch(authLogout());
  };
  const userLinks = (
    <>
      <Button
        onClick={() =>
          navigate(
            `/${
              currentPersona === ADMIN ? "" : currentPersona.toLowerCase()
            }/dashboard`
          )
        }
      >
        <img src={HomeIconPrimary} width="20" height="20" />
      </Button>
      {currentPersona === PROVIDER && (
        <>
          <Button
            onClick={() => navigate("/provider/invite-coworker")}
            sx={{ fontSize: "12px", padding: "initial", height: "70px" }}
            fullWidth
          >
            Invite Corworker
          </Button>
          <Button
            onClick={() => navigate("/provider/invite-client")}
            sx={{ fontSize: "12px", padding: "initial", height: "70px" }}
            fullWidth
          >
            Invite Client
          </Button>
        </>
      )}
      {currentPersona === ADMIN && (
        <>
          <Button
            onClick={() => navigate("/invite-coworker")}
            sx={{ fontSize: "12px", padding: "initial", height: "70px" }}
            fullWidth
          >
            Invite Corworker
          </Button>
          <Button
            onClick={() => navigate("/invite-client")}
            sx={{ fontSize: "12px", padding: "initial", height: "70px" }}
            fullWidth
          >
            Invite Client
          </Button>
        </>
      )}
      <MenuDropdown
        title={
          <Avatar
            sx={{
              bgcolor: "info.main",
              width: "28px",
              height: "28px",
              fontSize: 14,
            }}
          >
            {(displayName.length === 1
              ? displayName[0].slice(0, 2)
              : `${displayName[0][0]}${displayName[1][0]}`
            ).toUpperCase()}
          </Avatar>
        }
      >
        <>
          {currentRoles.map(
            ({ persona }: { persona: string; role: string }, index) => {
              if (index !== currentRoleIndex) {
                return (
                  <MenuItem key={persona} onClick={() => switchRoleTo(index)}>
                    Go as {persona}
                  </MenuItem>
                );
              }
            }
          )}
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </>
      </MenuDropdown>
    </>
  );
  const guestLinks = (
    <>
      <Button
        onClick={() => navigate("/signin")}
        sx={{ fontSize: "12px", padding: "initial", height: "70px" }}
        fullWidth
      >
        Sign In
      </Button>
    </>
  );
  return (
    <Box
      sx={{
        width: "77px",
        boxShadow: "var(--shadow-2)",
        height: {
          xs: "59px",
          md: "100vh",
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: "50px 0",
        gap: "10px",
        position: "sticky",
        top: 0,
      }}
    >
      {props.logo && (
        <Box sx={{ maxWidth: "50px" }}>
          <Logo />
        </Box>
      )}

      <Stack
        spacing={2}
        direction="column"
        sx={{
          button: {
            filter: "grayscale(1)",
            "&:hover": {
              filter: "grayscale(0)",
              bgcolor: "transparent",
            },
          },
        }}
        divider={<Divider orientation="horizontal" variant="middle" />}
      >
        <Button onClick={() => navigate(-1)}>
          <img src={BackIconPrimary} width="24px" height="24px" />
        </Button>

        {isLoggedIn ? userLinks : guestLinks}
      </Stack>
    </Box>
  );
};

export default Sidebar;
