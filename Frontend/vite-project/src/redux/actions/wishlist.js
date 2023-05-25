export const addTowishlist = (item) => async (dispatch, getState) => {
    dispatch({
        type: "addTowishlist",
        payload: item,
    })

    localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlist));
    return item
}
export const removeFromwishlist = (item) => async (dispatch, getState) => {
    dispatch({
        type: "removeFromwishlist",
        payload: item._id,
    })

    localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlist));
    return item
}