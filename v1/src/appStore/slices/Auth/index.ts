import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  authLogin,
  authLogout,
  getFullProviderInfo,
  setRole,
  setCurrentRoleIndexTo,
  verifyEmail,
  refreshAccessToken,
} from "..";
import { ADMIN, OWNER, ProviderType } from "../../../types";

type AuthProps = {
  accessToken: string;
  expiresUtc: string;
  refreshToken: string;
  account: {
    id: string;
    displayName: string;
    email: string;
    provider: null | ProviderType;
    currentRole?: number;
    roles: {
      persona: string;
      role: string;
    }[];
    emailVerified: boolean;
  };
};

const initialState: AuthProps = {
  accessToken: "",
  expiresUtc: "",
  refreshToken: "",
  account: {
    id: "",
    displayName: "",
    email: "",
    provider: null,
    currentRole: 0,
    roles: [],
    emailVerified: false,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authLogout.fulfilled, (state, action) => {
        return initialState;
      })
      .addCase(setRole.fulfilled, (state, action) => {
        const tempState = { ...state.account };
        tempState.currentRole = 0;
        tempState.roles = [{ role: OWNER, persona: action.payload }];
        return { ...state, account: { ...tempState } };
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        return { ...state, account: { ...state.account, emailVerified: true } };
      })
      .addCase(getFullProviderInfo.fulfilled, (state, action) => {
        return {
          ...state,
          account: { ...state.account, provider: action.payload },
        };
      })
      .addCase(getFullProviderInfo.rejected, (state, action) => {
        return {
          ...state,
          account: { ...state.account, provider: null },
        };
      })
      .addCase(setCurrentRoleIndexTo.fulfilled, (state, action) => {
        return {
          ...state,
          account: {
            ...state.account,
            currentRole: action.payload,
          },
        };
      })
      .addMatcher(
        isAnyOf(authLogin.fulfilled, refreshAccessToken.fulfilled),
        (state, action) => {
          const incomingState = action.payload as AuthProps;
          incomingState.account.currentRole = 0;
          return { ...state, ...incomingState };
        }
      );
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
