import { server } from "../../server";
import axios from "axios";
export const createEvent = (newForm) => async (dispatch) => {
    try {
        dispatch({
            type: "eventCreateRequest",
        });

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.post(
            `${server}/event/create-event`,
            newForm,
            config
        );
        dispatch({
            type: "eventCreateSuccess",
            payload: data.event,
        });
    } catch (error) {
        dispatch({
            type: "eventCreateFail",
            payload: error.response.data.message,
        });
    }
};
export const getAllEventShop = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "getAllEventShopRequest",
        });

        const { data } = await axios.get(
            `${server}/event/get-all-events-shop/${id}`
        );
        // console.log(data.product)
        dispatch({
            type: "getAllEventShopSuccess",
            payload: data.event,
        });
    } catch (error) {
        dispatch({
            type: "getAllEventShopFailed",
            payload: error.response.data.message,
        });
    }
};
export const DeleteEventById = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "deleteEventShopRequest",
        });

        const { data } = await axios.delete(
            `${server}/event/delete-event/${id}`, {
            withCredentials: true,
        }
        );
        // console.log(data.product)
        dispatch({
            type: "deleteEventShopSuccess",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "deleteEventShopFailed",
            payload: error.response.data.message,
        });
    }
};