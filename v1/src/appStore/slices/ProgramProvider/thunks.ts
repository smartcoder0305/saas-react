import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ProgramProviderSignupType } from "../../../types";
import { USER_CLIENT } from "../../axiosInstance";
import { refreshAccessToken } from "../Auth/thunks";

export const programProviderLogin = createAsyncThunk(
  "programProvider/login",
  (formData: { email: string; password: string }) => {
    try {
      const res = USER_CLIENT.post(`auth/token`, formData).then((res) => {
        return res.data;
      });
    } catch (err: any) {
      let error: AxiosError<any> = err;
      if (!error.response) {
        console.log(err);
      }
    }
  }
);

export const programProviderSignup = createAsyncThunk(
  "programProvider/signup",
  async (data: ProgramProviderSignupType, { rejectWithValue }) => {
    try {
      await USER_CLIENT.post(`providers/signup`, data);
      return "success";
    } catch (err: any) {
      let error: AxiosError<any> = err;
      if (!error.response) {
        console.error("providers signup error", err);
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const getProgramProvider = createAsyncThunk(
  "programProvider/getAll",
  async () => {
    try {
      let response = await USER_CLIENT.get(`ProgramProvider`, {
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

export const getProgramProviderByID = createAsyncThunk(
  "programProvider/getOne",
  async ({ id }: { id: string | number }) => {
    try {
      let response = await USER_CLIENT.get(`ProgramProvider/${id}`, {
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

export const verifyProviderInviteCode = createAsyncThunk(
  "programProvider/verifyInvite",
  async (
    formData: {
      email: string;
      invitationCode: string;
      providerId: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await USER_CLIENT.post("/providers/verifyinvite", formData);
      console.log("verify provider invite code success", res.data);
      return res.data;
    } catch (err: any) {
      console.error("verify invite error", err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const inviteProviderCoworker = createAsyncThunk(
  "programProvider/inviteCoworker",
  async (
    formData: { email: string; role: string; programId: string },
    { rejectWithValue }
  ) => {
    try {
      console.log(USER_CLIENT.defaults.headers);
      const res = await USER_CLIENT.post("/providers/invite", formData);
      return res.data;
    } catch (err: any) {
      console.error("invite provider coworker error", err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const getProgramProviderProfile = createAsyncThunk(
  "programProvider/getProfile",
  async (
    data: { providerId: string; persona: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await USER_CLIENT.post("/providers/profile", data);
      return res.data;
    } catch (err: any) {
      console.error("get provider profile error", err);
      rejectWithValue(err.response.data);
    }
  }
);

export const providerGetMemberAccounts = createAsyncThunk(
  "provider/getMemberAccounts",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const res = await USER_CLIENT.get("providers/accounts");
      return res.data;
    } catch (err: any) {
      console.error("provider get member in account error", err);
      // if (err.response.status === 401) {
      //   dispatch(refreshAccessToken());
      // }
      return rejectWithValue(err.response.data);
    }
  }
);
