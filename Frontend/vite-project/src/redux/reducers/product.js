import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isLoading: true,
};

export const productReducer = createReducer(initialState, {
    productCreateRequest: (state) => {
        state.isLoading = true;
    },
    productCreateSuccess: (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
        state.success = true;
    },
    productCreateFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
    },
    getAllProductShopRequest: (state) => {
        state.isLoading = true;
    },
    getAllProductShopSuccess: (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
    },
    getAllProductShopFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },
    deleteProductShopRequest: (state) => {
        state.isLoading = true;
    },
    deleteProductShopSuccess: (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
    },
    deleteProductShopFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },
    getAllProductRequest: (state) => {
        state.isLoading = true;
    },
    getAllProductSuccess: (state, action) => {
        state.isLoading = false;
        state.allProducts = action.payload;
    },
    getAllProductFailed: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    },
});