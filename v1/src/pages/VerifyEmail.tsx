import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FormControl,
  Input,
  Typography,
  Stack,
  Button,
  Link,
} from "@mui/material";
import { AuthPageLayout } from "../components";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  selectCurrentEmail,
  useAppDispatch,
  useAppSelector,
  verifyEmail as verify,
  sendEmailVerifyCode as resend,
  authLogout,
} from "../appStore";
import { addNewAlert } from "../utils/functions/addNewAlert";

/**
 * VerifyEmail component for program providers
 */

const VerifyEmail = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentEmail = useAppSelector(selectCurrentEmail);
  const { verificationCode, email } = useParams();

  const [formData, setFormData] = useState({
    email: email ?? "",
    verificationCode: verificationCode ?? "",
  });
  const [editEmail, setEditEmail] = useState(false);
  useEffect(() => {
    setFormData({ ...formData, email: currentEmail });
  }, [currentEmail]);
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setFormData({ ...formData, [name]: value });
  };
  const verifyEmail = async () => {
    const action = await dispatch(
      verify({ verificationCode: formData.verificationCode })
    );
    if (action.meta.requestStatus === "fulfilled") {
      addNewAlert(dispatch, {
        type: "success",
        title: "Verify Email",
        msg: "Successfully verified",
      });
    } else if (action.meta.requestStatus === "rejected") {
      console.log(action.payload);
      addNewAlert(dispatch, {
        type: "error",
        title: "Verify Email",
        msg:
          typeof action.payload === "string"
            ? action.payload
            : "Error occured verifying your email",
      });
    }
  };

  const resendCode = async () => {
    setEditEmail(false);
    const action = await dispatch(resend());
    if (action.meta.requestStatus === "fulfilled") {
      addNewAlert(dispatch, {
        type: "success",
        title: "Send verify email",
        msg: "Successfly sent",
      });
    } else if (action.meta.requestStatus === "rejected") {
      addNewAlert(dispatch, {
        type: "error",
        title: "Send verify email",
        msg: "Error occured sending verify email",
      });
    }
  };
  return (
    <AuthPageLayout title="Verify Email" logo>
      <Typography variant="h1" component="h1" sx={{ mb: 3 }}>
        Verify your email <br /> address
      </Typography>
      <Stack flexDirection={"row"} alignItems={"center"}>
        <FormControl variant="standard" fullWidth sx={{ my: 3, flexGrow: 1 }}>
          {editEmail ? (
            <Input
              onChange={handleChange}
              type="email"
              name="email"
              value={formData.email}
            />
          ) : (
            <Typography>{formData.email}</Typography>
          )}
        </FormControl>
        {editEmail ? (
          <Button type="submit" onClick={resendCode}>
            Resend the code
          </Button>
        ) : (
          <Link
            onClick={() => {
              // setEditEmail(true);
            }}
            sx={{ cursor: "pointer" }}
          >
            Edit
          </Link>
        )}
      </Stack>

      <FormControl variant="standard" fullWidth sx={{ mt: 3, mb: 1 }}>
        <label>Verification Code</label>
        <Input
          onChange={handleChange}
          type="text"
          name="verificationCode"
          value={formData.verificationCode}
        />
      </FormControl>

      <Button
        variant="contained"
        size="large"
        fullWidth
        sx={{ mt: 3, py: 3 }}
        onClick={verifyEmail}
      >
        Verify
        <ArrowForwardIosIcon sx={{ ml: 1 }} />
      </Button>
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 3 }}
      >
        <Typography>Didn't receive the email?</Typography>
        <Button onClick={resendCode}>Resend 0.50 sec</Button>
      </Stack>
      <Button onClick={() => dispatch(authLogout())}>Logout</Button>
    </AuthPageLayout>
  );
};

export default VerifyEmail;
