import axios from "axios";

export const baseUserURL: string =
	"https://cp-services-development.azurewebsites.net/api/1.0";
export const baseProgramURL: string =
	// "https://stoplight.io/mocks/surija/cp/134330842/api/1.0";
	"https://cp-services-development.azurewebsites.net/api/1.0/";
export const baseWorkflowURL: string =
	"https://cpworkflowmicroservice.azurewebsites.net/api/";

export const USER_CLIENT = axios.create({
	baseURL: baseUserURL,
	headers: {
		"Content-Type": "application/json",
	},
});
export const PROGRAM_CLIENT = axios.create({
	baseURL: baseProgramURL,
});
export const WORKFLOW_CLIENT = axios.create({
	baseURL: baseWorkflowURL,
});

// USER_CLIENT.interceptors.response.use(() => {

// });
