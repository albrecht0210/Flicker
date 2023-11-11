import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const accessToken = Cookies.get("accessToken") ? Cookies.get("accessToken") : null;
const refreshToken = Cookies.get("refreshToken") ? Cookies.get("refreshToken") : null;

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        accessToken: accessToken,
        refreshToken: refreshToken
    },
    reducers: {
        storeAuth: (state, { payload }) => {
            state.accessToken = payload.accessToken;
            state.refreshToken = payload.refreshToken;
        },
        deStoreAuth: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
        }
    }
})

export const { storeAuth, deStoreAuth } = authSlice.actions;