export const addToCart = (data) => async (dispatch, getState) => {
    dispatch({
        type: "addToCart",
        payload: data,
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
    return data
}
export const removeFromCart = (data) => async (dispatch, getState) => {
    dispatch({
        type: "removeFromCart",
        payload: data._id,
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
    return data
}
export const resetCart = () => async (dispatch, getState) => {
    dispatch({
        type: "resetCart",
    })

    localStorage.removeItem("cartItems");
}

export const initializeCart = (cart) => async (dispatch) => {
    console.log(cart)
    dispatch({
        type: "initializeCart",
        payload: cart,
    })
    localStorage.setItem("cartItems", JSON.stringify(cart))
}