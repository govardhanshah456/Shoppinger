export const addToOrder = (data) => async (dispatch) => {
    dispatch({
        type: "addToOrder",
        payload: data,
    })
    return data
}
export const resetOrder = () => async (dispatch) => {
    dispatch({
        type: "resetOrder",
    })
}