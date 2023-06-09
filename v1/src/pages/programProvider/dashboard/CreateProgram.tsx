import {
	AdditionalInfoForm,
	CreateProgramForm,
	CreateProgramLayout,
} from "../../../components/ProgramProviderComponents";
import { Typography } from "@mui/material";
import { saveNewProgramDetails, useAppDispatch } from "../../../appStore";
import { useEffect, useState } from "react";
import { ProgramDetailsType } from "../../../types";

const CreateProgram = () => {
	const [data, setData] = useState<ProgramDetailsType>({
		title: "",
		summary: "",
		description: "",
		skills: ["Social Media ", "UI", "UX", "Content Writing"],
		benefits: "",
		applicationCriteria: "",
		programType: "",
		startDate: "",
		applicationOpenDate: "",
		applicationCloseDate: "",
		duration: "",
		location: "",
		minimumQualification: "",
		maxApplication: 0,
		isFullyRemote: false,
		status: "Draft",
		programProviderId: "7c162f93-32e3-499d-b49e-b848d3134f82",
		coverImage: "http://example.com",
	});
	const dispatch = useAppDispatch();

	useEffect(() => {
		setData((data) => ({ ...data, applicationOpenDate: "" }));
	}, []);

	return (
		<CreateProgramLayout
			screen="programDetail"
			data={data}
			nextLink="application-form">
			{/*  */}
			{/* Create program form */}
			<CreateProgramForm
				setData={setData}
				data={data}
			/>

			<Typography
				sx={{
					width: { lg: "967px" },
					p: 5,
					mx: "auto",
					my: 4,
				}}
				component="h4"
				fontSize="25px"
				fontWeight={600}>
				Additional program information
			</Typography>

			{/* Additional Information */}
			<AdditionalInfoForm
				setData={setData}
				data={data}
			/>
		</CreateProgramLayout>
	);
};

export default CreateProgram;
