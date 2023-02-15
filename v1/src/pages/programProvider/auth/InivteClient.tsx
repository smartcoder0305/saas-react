import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  Input,
  Typography,
  Stack,
  Button,
  Grid,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import { Country } from "country-state-city";
import { FileUpload, SidebarLayout } from "../../../components";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  useAppDispatch,
  createProviderAccount as createAccount,
} from "../../../appStore";
import { ProviderSignupType } from "../../../types";
import { addNewAlert } from "../../../utils/functions/addNewAlert";

/**
 * InviteClient component for program providers
 */

const InviteClient = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ProviderSignupType>({
    firstName: "",
    lastName: "",
    email: "",
    jobTitle: "",
    phoneNumber: "",
    country: "",
    companyName: "",
  });
  const {
    firstName,
    lastName,
    email,
    jobTitle,
    phoneNumber,
    country,
    companyName,
  } = formData;
  const [countries, setCountries] = useState(Country.getAllCountries());
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleUpload = (acceptedFiles: any) => {
    console.log(acceptedFiles);
  };

  const handleSubmit = async (ev: React.SyntheticEvent) => {
    ev.preventDefault();
    const action = await dispatch(createAccount(formData));
    if (action.meta.requestStatus === "fulfilled") {
      addNewAlert(dispatch, {
        type: "success",
        title: "Sign up",
        msg: "Successfully signed up",
      });
    } else if (action.meta.requestStatus === "rejected") {
      addNewAlert(dispatch, {
        type: "error",
        title: "Sign up",
        msg: "Sorry, but you are not invited to this provider",
      });
    }
  };
  return (
    <SidebarLayout title="Invite your client" logo>
      <Box marginX={"auto"} maxWidth={"600px"}>
        <Box padding={5} marginBottom={2} borderRadius={2} boxShadow={3}>
          <Stack flexDirection="row" alignItems="center" sx={{ width: "100%" }}>
            <Typography
              variant="h1"
              component="h1"
              sx={{ mb: 3, whiteSpace: "nowrap", flexGrow: 1 }}
            >
              Create Master
              <br />
              Client Account
            </Typography>
            <FileUpload
              onUpload={handleUpload}
              title=""
              desc="Click here to upload company logo"
              logo={false}
              customStyle={{ width: "150px", height: "100px" }}
            />
          </Stack>

          <form action="" onSubmit={handleSubmit}>
            {/*  */}
            <Grid container columnSpacing={4}>
              <Grid item md={6}>
                <FormControl variant="standard" sx={{ my: 3 }}>
                  <label>First Name*</label>
                  <Input
                    onChange={handleChange}
                    value={firstName}
                    name="firstName"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item md={6}>
                <FormControl variant="standard" sx={{ my: 3 }}>
                  <label>Last Name*</label>
                  <Input
                    onChange={handleChange}
                    value={lastName}
                    name="lastName"
                    required
                  />
                </FormControl>
              </Grid>
            </Grid>

            <FormControl variant="standard" fullWidth sx={{ mt: 3, mb: 1 }}>
              <label>Email*</label>
              <Input
                onChange={handleChange}
                value={email}
                name="email"
                required
              />
            </FormControl>

            <Grid container columnSpacing={4}>
              <Grid item md={6}>
                <FormControl variant="standard" sx={{ my: 3 }}>
                  <label>Job Title</label>
                  <Input
                    name="jobTitle"
                    value={jobTitle}
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
              <Grid item md={6}>
                <FormControl variant="standard" sx={{ my: 3 }}>
                  <label>Company Name*</label>
                  <Input
                    name="companyName"
                    value={companyName}
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Grid container columnSpacing={4} alignItems={"center"}>
              <Grid item md={6}>
                <FormControl fullWidth>
                  <label>{"Nationality"}</label>
                  <Select
                    variant="standard"
                    value={country}
                    onChange={handleChange}
                  >
                    {countries.map((country: any) => (
                      <MenuItem value={country.name}>{country.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={6}>
                <FormControl variant="standard" sx={{ my: 3 }} fullWidth>
                  <label>Contact Number</label>
                  <Input
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              size="large"
              fullWidth
              sx={{ my: 3, py: 3 }}
              type="submit"
            >
              Invite to join
              <ArrowForwardIosIcon sx={{ ml: 1 }} />
            </Button>
          </form>
        </Box>
      </Box>
    </SidebarLayout>
  );
};

export default InviteClient;
