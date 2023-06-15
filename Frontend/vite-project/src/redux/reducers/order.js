import { createReducer } from "@reduxjs/toolkit"

const initialState = {
    Order: [],
}

export const OrderReducer = createReducer(initialState, {
    addToOrder: (state, action) => {
        const item = action.payload;
        return {
            ...state,
            Order: [...state.Order, item],
        };
    },
    resetOrder: (state, action) => {
        return {
            ...state,
            Order: []
        }
    }
})