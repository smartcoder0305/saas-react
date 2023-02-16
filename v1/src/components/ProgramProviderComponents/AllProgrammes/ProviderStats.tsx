import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Paper,
  Typography,
  Stack,
  Button,
  ButtonGroup,
  Menu,
  MenuItem,
  Box,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import { ProgramType, summaryProgramType } from "../../../types";
import { useRef, useState } from "react";
import FormDialog from "../shared/FormDialog";
import { publishProgram, useAppDispatch } from "../../../appStore";
import { useNavigate } from "react-router";

/**
 * @TODO type the @param data object after schema is gotten from API
 * and change the property names on ProviderStatsBase component
 * Provider Stats shows all starts for each program
 */
const ProviderStats = ({ data }: { data: Partial<summaryProgramType> }) => {
  const [open, setOpen] = useState(false);
  const shortScreen = useMediaQuery("(max-height: 800px)");

  const [showUnPublish, setShowUnpublish] = useState(false);
  const anchorEl = useRef<HTMLAnchorElement | null>(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleConfirm = () => {
    setOpen(false);
    handlePublish("Closed");
  };
  const dispatch = useAppDispatch();
  const handlePublish = async (ev: string) => {
    const programId = data.programId as string;
    dispatch(
      publishProgram({
        data: {
          id: programId,
          type: "program",
          attributes: { status: ev },
        },
      })
    );
  };
  const navigate = useNavigate();
  const handleOnClick = (stageId: string, programId: any) => {
    localStorage.setItem("stageId", stageId);
    localStorage.setItem("programId", programId);
    navigate(`/provider/dashboard/program/${programId}`, { replace: true });
  };

  return (
    <Paper
      className="content-wrapper"
      sx={{
        boxShadow: "var(--shadow-3)",
        p: { xs: "20px", lg: "20px 27px 15px 40px" },
        border: "1px solid white",
        width: "100%",

        ":hover": {
          border: "1px solid var(--primary)",
          bgcolor: "var(--active-text-button)",
        },
      }}
    >
      <Stack
        direction={{ lg: "row" }}
        justifyContent="space-between"
        alignItems="start"
      >
        {/* Title and Location */}
        <Box
          sx={{
            marginBottom: shortScreen ? 2 : 3,
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: 1,
            alignItems: "center",
            width: "550px",
            maxWidth: "90vw",
          }}
        >
          <Typography variant="h2" component="h5">
            {data.title}
          </Typography>

          <Typography
            variant="h3"
            component="p"
            fontWeight={500}
            color="var(--grey)"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <LocationOnIcon
              htmlColor="black"
              fontSize="inherit"
              sx={{ mr: 1 }}
            />{" "}
            {data.location}
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Stack direction={{ lg: "row" }} gap={1.5}>
          <Button
            variant="outlined"
            sx={{
              color: "var(--grey)",
              borderColor: "var(--grey)",
              px: 3,
            }}
          >
            Edit
          </Button>
          <ButtonGroup variant="contained" color="success">
            <Button value="Open" onClick={() => handlePublish("Open")}>
              Publish
            </Button>
            {/* @ts-ignore */}
            <Button
              sx={{ px: 0.5 }}
              onClick={(e) => {
                setShowUnpublish((state) => !state);
              }}
              ref={anchorEl}
            >
              <KeyboardArrowDownIcon fontSize="small" />
              <Menu
                open={showUnPublish}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                anchorEl={anchorEl.current}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                  sx: {
                    width:
                      anchorEl && anchorEl.current?.parentElement?.offsetWidth,
                  },
                }}
              >
                <MenuItem
                  sx={{ py: 2, fontSize: 14 }}
                  onClick={handleClickOpen}
                >
                  Unpublish
                </MenuItem>
                <MenuItem sx={{ py: 2, fontSize: 14 }}>View Program </MenuItem>
              </Menu>
            </Button>
          </ButtonGroup>
        </Stack>
        {/* End of action buttons */}
      </Stack>

      {/* StatisticsBase */}
      <ButtonGroup
        variant="text"
        sx={{
          my: 3,
          display: "grid",
          gridTemplateColumns: "repeat(8, 1fr)",
          "> button": {
            borderColor: "var(--light-grey) !important",
            color: "var(--grey)",
            height: "71px",
            display: "grid",
            gridTemplateRows: "2fr 1fr",
          },

          "> button:hover": {
            backgroundColor: "transparent",
          },

          " .stat-info": {
            fontSize: shortScreen ? 22.5 : 30,
            lineHeight: shortScreen ? "23px" : "30px",
          },
          " .stat-title": {
            fontSize: 12,
            lineHeight: "12px",
            fontWeight: 400,
          },
        }}
      >
        {/* <Button>
					<span className="stat-info">{data?.applied}</span>
					<span className="stat-title">Applied</span>
				</Button> */}

        {data?.workflowStages?.map((stage, index) => (
          <Button
            key={stage.stageId}
            onClick={(e) => handleOnClick(stage.stageId, data?.programId)}
          >
            <span className="stat-info">{stage.count}</span>
            <span className="stat-title">{stage.name}</span>
          </Button>
        ))}
      </ButtonGroup>

      <Stack
        justifyContent="flex-end"
        direction="row"
        gap={2}
        alignItems="center"
      >
        <Typography fontFamily="Inter" fontSize="9px" fontWeight={600}>
          TEAM
        </Typography>
        <Stack direction="row" spacing={0.5}>
          {data?.teamMembers?.map((url, index) => (
            <Avatar
              key={index}
              sx={{ width: "25px", height: "25px" }}
              src={url.displayPicture}
            ></Avatar>
          ))}
        </Stack>
        <Button
          sx={{
            display: "grid",
            px: 0,
            minWidth: "fit-content",
          }}
          onClick={() => {
            navigate(`/provider/invite-coworker/${data.programId ?? ""}`);
          }}
        >
          <AddCircleOutlineIcon htmlColor="black" fontSize="small" />
          <Typography fontSize={7} color="black">
            Invite
          </Typography>
        </Button>
      </Stack>
      <FormDialog
        open={open}
        content={
          <Typography fontSize={32} fontWeight={"bold"} textAlign={"center"}>
            Are you sure
            <br />
            want to unpublish?
          </Typography>
        }
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      />
    </Paper>
  );
};

export default ProviderStats;
