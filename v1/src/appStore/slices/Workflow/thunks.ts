import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { WorkflowType, workStageType } from "../../../types";
import { PROGRAM_CLIENT, WORKFLOW_CLIENT } from "../../axiosInstance";

export const getAllWorkflows = createAsyncThunk("workflow/getAll", async () => {
	try {
		const response = await WORKFLOW_CLIENT.get(`Workflow/`, {
			headers: {
				accept: "*/*",
			},
		});
		return response.data;
	} catch (err: any) {
		let error: AxiosError<any> = err;
		if (!error.response) {
			console.log(err);
		}
	}
});
export const getSelectedWorkFlow = createAsyncThunk(
	"workflow/getSelectedWorkFlow",
	async (data: { programId: string }) => {
		try {
			const response = await PROGRAM_CLIENT.get(
				`programs/${data.programId}/workflow`,
				{
					headers: {
						"Content-Type": "application/json",
					},
					params: {
						programId: data.programId,
						version: "1.0",
					},
				}
			);
			return response.data;
		} catch (err: any) {
			let error: AxiosError<any> = err;
			if (!error.response) {
				console.log(err);
			}
		}
	}
);

export const createWorkflow = createAsyncThunk(
	"workflow/createWorkflow",
	async ({ data }: { data: WorkflowType }) => {
		try {
			const response = await WORKFLOW_CLIENT.post(`Workflow/`, data, {
				headers: {
					accept: "*/*",
				},
			});
			return response.data;
		} catch (err: any) {
			let error: AxiosError<any> = err;
			if (!error.response) {
				console.log(err);
			}
		}
	}
);

export const saveWorkflow = createAsyncThunk(
	"workflow/saveWorkflow",
	async ({
		data,
	}: {
		data: { id: string; type: string; attributes: { stages: workStageType[] } };
	}) => {
		try {
			const response = await WORKFLOW_CLIENT.put(
				`programs/${data.id}/workflow`,
				{ data },
				{
					headers: {
						accept: "*/*",
					},
				}
			);
			return response.data;
		} catch (err: any) {
			let error: AxiosError<any> = err;
			if (!error.response) {
				console.log(err);
			}
		}
	}
);
