import { Stack, Box, Button } from "@mui/material";
import { SidebarLayout } from "../../../components";
import {
	SingleProgramNav,
	SingleProgramSidebar,
	SingleProgramCandidateInfo,
	InfoCard,
	ActionCard,
	RatingGroup,
} from "../../../components/ProgramProviderComponents";
import Add from "@mui/icons-material/Add";
import {
	candidateLogin,
	candidateSignup,
	getAllCandidates,
	getcandidateByID,
	getProgramProvider,
	getProgramProviderByID,
	programProviderLogin,
	programProviderSignup,
	useAppDispatch,
} from "../../../appStore";

const SingleProgram = () => {
	const dispatch = useAppDispatch();

	return (
		<SidebarLayout>
			<Box className="content-wrapper" sx={{ mx: 0 }}>
				<SingleProgramNav data={data["programDetails"]} />
				<Stack direction="row" gap={2}>
					<SingleProgramSidebar />
					<Box sx={{ width: "100%" }}>
						<SingleProgramCandidateInfo />
						<Button
							onClick={() => {
								dispatch(programProviderLogin({ emailID: "string", token: "string" }));
								dispatch(
									programProviderSignup({
										programProviderID: 0,
										firstName: "string",
										lastName: "string",
										email: "string",
										jobTitle: "string",
										phoneNumber: "string",
										userToken: "string",
									})
								);
								dispatch(getProgramProvider());
								dispatch(getProgramProviderByID({ id: 0 }));
							}}>
							Try APIs
						</Button>
					</Box>
				</Stack>
			</Box>
		</SidebarLayout>
	);
};
export default SingleProgram;

let data = {
	id: "string",
	programID: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
	title: "string",
	description: "string",
	summary: "string",
	keySkills: "string",
	programBenefits: "string",
	applicationCriteria: "string",
	programType: 0,
	minQualification: 0,
	startDate: "2023-01-22T00:20:41.450Z",
	appOpenDate: "2023-01-22T00:20:41.450Z",
	appCloseDate: "2023-01-22T00:20:41.450Z",
	duration: "string",
	location: 0,
	maxAppCount: 0,
	createdOn: "2023-01-22T00:20:41.450Z",
	programDetails: {
		programApplied: 0,
		programShortlisted: 0,
		programInterview: 0,
		programSecondRoundInterview: 0,
		programEmployerScreening: 0,
		programOffer: 0,
		programAgreement: 0,
		programApproved: 0,
	},
};
