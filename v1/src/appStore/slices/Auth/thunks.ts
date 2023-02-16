import { createAsyncThunk } from "@reduxjs/toolkit";
import { ADMIN_ROUTE } from "../../../types";
import { USER_CLIENT } from "../../axiosInstance";
import { RootState } from "../../store";

export const authLogin = createAsyncThunk(
  "auth/login",
  async (
    formData: {
      email: string;
      password: string;
      providerId: string | null;
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await USER_CLIENT.post(`auth/token`, formData);
      const expiresUtc = res.data.expiresUtc;
      const timeDelta = new Date(expiresUtc).getTime() - Date.now();
      setTimeout(() => {
        dispatch(refreshAccessToken());
      }, timeDelta);
      return res.data;
    } catch (err: any) {
      console.error("user login error", err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const getFullProviderInfo = createAsyncThunk(
  "auth/getFullProviderInfo",
  async (providerAlias: string, { rejectWithValue }) => {
    try {
      if (providerAlias === ADMIN_ROUTE) return null;
      const res = await USER_CLIENT.get(`/providers/${providerAlias}`);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const authLogout = createAsyncThunk("auth/logout", () => {
  return "logout";
});

export const refreshAccessToken = createAsyncThunk(
  "auth/refreshAccessToken",
  async (_, { getState, rejectWithValue, dispatch }) => {
    try {
      const state = getState() as RootState;
      const res = await USER_CLIENT.post(`auth/refresh`, {
        accessToken: state.auth.accessToken,
        refreshToken: state.auth.refreshToken,
        providerId: state.auth.account.provider?.providerId,
      });
      const expiresUtc = res.data.expiresUtc;
      const timeDelta = new Date(expiresUtc).getTime() - Date.now();
      setTimeout(() => {
        dispatch(refreshAccessToken());
      }, timeDelta);
      return res.data;
    } catch (err: any) {
      console.error("auth refresh access token", err);
      dispatch(authLogout());
      return rejectWithValue(err.response.data);
    }
  }
);

export const setCurrentRoleIndexTo = createAsyncThunk(
  "auth/switchRole",
  (index: number) => index
);

export const sendResetPasswordRequest = createAsyncThunk(
  "auth/sendResetPasswordRequest",
  async ({ email }: { email: string }, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const res = await USER_CLIENT.post("/account/resetpassword", {
        email,
        providerId: state.auth.account.provider?.providerId ?? null,
      });
      return res.data;
    } catch (err: any) {
      console.error("auth send reset password request", err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (
    formData: { email: string; resetCode: string; newPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await USER_CLIENT.post("/account/changepassword", formData);
      return res.data;
    } catch (err: any) {
      console.error("auth reset password error", err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (formData: { verificationCode: string }, { rejectWithValue }) => {
    try {
      const res = await USER_CLIENT.post("/account/verifyEmail", formData);
      return "success";
    } catch (err: any) {
      console.error("auth email verify error", err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const sendEmailVerifyCode = createAsyncThunk(
  "auth/sendEmailVerifyCode",
  async (_, { rejectWithValue }) => {
    try {
      const res = await USER_CLIENT.post("/account/sendemailverifycode");
      return "success";
    } catch (err: any) {
      console.error("auth email verify error", err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const setRole = createAsyncThunk("auth/setRole", (role: string) => {
  return role;
});
