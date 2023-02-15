import { useState } from "react";
import { FormControl, Input, Typography, Button } from "@mui/material";
import { AuthPageLayout } from "../components";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword, useAppDispatch } from "../appStore";
import { addNewAlert } from "../utils/functions/addNewAlert";

/**
 * ResetPassword component for program providers
 */

type ResetPaswordType = {
  email: string;
  resetCode: string;
  newPassword: string;
  confirmPassword?: string;
};

const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [formData, setFormData] = useState<ResetPaswordType>({
    email: searchParams.get("email") ?? "",
    resetCode: searchParams.get("resetCode") ?? "",
    newPassword: "",
    confirmPassword: "",
  });
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (ev: React.SyntheticEvent) => {
    ev.preventDefault();
    const data = { ...formData };
    delete data.confirmPassword;
    const action = await dispatch(resetPassword(data));
    if (action.meta.requestStatus === "fulfilled") {
      navigate("/signin");
      addNewAlert(dispatch, {
        type: "success",
        title: "Reset passowrd",
        msg: "Successfully reset",
      });
    } else if (action.meta.requestStatus === "rejected") {
      addNewAlert(dispatch, {
        type: "error",
        title: "Reset password",
        msg:
          typeof action.payload === "string"
            ? action.payload
            : "Error occured while resetting password",
      });
    }
  };
  const { newPassword, confirmPassword } = formData;
  return (
    <AuthPageLayout title="Reset Password" logo>
      <Typography variant="h1" component="h1">
        Reset your password
      </Typography>
      <Typography sx={{ mb: 3 }}>
        No worries, we will email you the instruction
      </Typography>

      <form action="" onSubmit={handleSubmit}>
        <FormControl variant="standard" fullWidth sx={{ mt: 3, mb: 1 }}>
          <label>Password</label>
          <Input
            onChange={handleChange}
            type="password"
            name="newPassword"
            value={newPassword}
          />
        </FormControl>
        <FormControl variant="standard" fullWidth sx={{ mt: 3, mb: 1 }}>
          <label>Re-enter</label>
          <Input
            onChange={handleChange}
            type="password"
            name="confirmPassword"
            value={confirmPassword}
          />
        </FormControl>

        <Button
          variant="contained"
          size="large"
          fullWidth
          sx={{ mt: 3, py: 3 }}
          type="submit"
        >
          Confirm & login
          <ArrowForwardIosIcon sx={{ ml: 1 }} />
        </Button>
      </form>
    </AuthPageLayout>
  );
};

export default ResetPassword;
