import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isLoading: true,
};

export const eventReducer = createReducer(initialState, {
    eventCreateRequest: (state) => {
        state.isLoading = true;
    },
    eventCreateSuccess: (state, action) => {
        state.isLoading = false;
        state.event = action.payload;
        state.success = true;
    },
    eventCreateFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
    },
    getAllEventShopRequest: (state) => {
        state.isLoading = true;
    },
    getAllEventShopSuccess: (state, action) => {
        state.isLoading = false;
        state.event = action.payload;
    },
    getAllEventShopFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },
    deleteEventShopRequest: (state) => {
        state.isLoading = true;
    },
    deleteEventShopSuccess: (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
    },
    deleteEventShopFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },
    getAlleventsRequest: (state) => {
        state.isLoading = true;
    },
    getAlleventsSuccess: (state, action) => {
        state.isLoading = false;
        state.allEvents = action.payload;
    },
    getAlleventsFailed: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    },
});