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
export const resetwishlist = () => async (dispatch, getState) => {
    dispatch({
        type: "resetwishlist",
    })

    localStorage.removeItem("wishlistItems");
}

export const initializewishlist = (wishlist) => async (dispatch) => {
    console.log(wishlist)
    dispatch({
        type: "initializewishlist",
        payload: wishlist,
    })
    localStorage.setItem("wishlistItems", JSON.stringify(wishlist))
}