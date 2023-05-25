export const addToCart = (item) => async (dispatch, getState) => {
    dispatch({
        type: "addToCart",
        payload: item,
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
    return item
}
export const removeFromCart = (item) => async (dispatch, getState) => {
    dispatch({
        type: "removeFromCart",
        payload: item._id,
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
    return item
}