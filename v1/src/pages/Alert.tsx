import React, { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import SnackbarContent from "@mui/material/SnackbarContent";
import { getAllAlerts, useAppSelector } from "../appStore";
import { AlertProps } from "../types";

const Alert = () => {
  const allAlerts = useAppSelector(getAllAlerts);
  const colorMap = {
    info: "#42a5f5",
    success: "#2e7d32",
    error: "#ef5350",
  };
  return (
    <Stack sx={{ position: "fixed", top: 10, right: 10 }} rowGap={2}>
      {allAlerts.map((alert: AlertProps & { id: string }) => (
        <SnackbarContent
          key={alert.id}
          action={<small>{alert.title}</small>}
          message={alert.msg}
          sx={{
            backgroundColor: colorMap[alert.type],
            color: "white",
            zIndex: 10,
          }}
        />
      ))}
    </Stack>
  );
};

export default Alert;
