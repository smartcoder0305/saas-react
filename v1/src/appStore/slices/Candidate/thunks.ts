// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios, { AxiosError } from "axios";
// import { toast } from "react-toastify";
// import { baseURL, AXIOS_CLIENT } from "../../axiosInstance";
// import { store } from "../../store";

// export const login = createAsyncThunk(
// 	"user/login",
// 	async ({ username, password }: { username: string; password: string }, {}) => {
// 		let loader = toast.loading("We are working on it", {
// 			containerId: "toast",
// 		});

<<<<<<< HEAD
// 		try {
// 			let response = await axios.post(`${baseURL}users/signin?username=${username}&password=${password}`, {
// 				headers: {
// 					accept: "*/*",
// 					"Content-Type": "application/json",
// 				},
// 			});
// 			toast.dismiss(loader);
// 			toast.success("Logged in successfully", {
// 				containerId: "toast",
// 			});
// 			return response.data;
// 		} catch (err: any) {
// 			toast.dismiss(loader);
// 			let error: AxiosError<any> = err;
// 			if (!error.response) {
// 				throw err;
// 			}
// 			toast.error(error.response.data.message as string, {
// 				containerId: "toast",
// 			});
// 		}
// 	}
// );

// export const authenticate = createAsyncThunk("user/authenticate", async () => {
// 	try {
// 		let response = await AXIOS_CLIENT.get("users/me");
// 		// toast.info("we are redirecting you", { containerId: "toast" });
// 		return response.data;
// 	} catch (err: any) {
// 		let error: AxiosError<any> = err;
// 		if (!error.response) {
// 			throw err;
// 		}
// 		toast.error(error.response.data.message as string, {
// 			containerId: "toast",
// 		});
// 	}
// });

// export const changePassword = createAsyncThunk(
// 	"user/password_change",
// 	async ({ username, oldPassword, newPassword }: { username: string; oldPassword: string; newPassword: string }) => {
// 		let response = await AXIOS_CLIENT.put(`users/changepassword/${username}`, {
// 			oldPassword,
// 			newPassword,
// 		});
// 		toast.success("Password changed successfully, Logging you in...");
// 		store.dispatch(login({ username, password: newPassword }));
// 		return response.data;
// 	}
// );

export default {};
=======
export const getAllCandidates = createAsyncThunk("candidate/getAll", async () => {
	try {
		let response = await USER_CLIENT.get(`Candidate`, {
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

export const getCandidateByID = createAsyncThunk("candidate/getOne", async ({ id }: { id: string | number }) => {
	try {
		let response = await USER_CLIENT.get(`Candidate/${id}`, {
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
>>>>>>> 6a262b1df297dc43cc9326d7599ee40f3e5cc0bf
