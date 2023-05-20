import { server } from "../../server";
import axios from "axios";
export const createProduct = (newForm) => async (dispatch) => {
    try {
        dispatch({
            type: "productCreateRequest",
        });

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.post(
            `${server}/product/create-product`,
            newForm,
            config
        );
        dispatch({
            type: "productCreateSuccess",
            payload: data.product,
        });
    } catch (error) {
        dispatch({
            type: "productCreateFail",
            payload: error.response.data.message,
        });
    }
};
export const getAllProductsShop = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "getAllProductShopRequest",
        });

        const { data } = await axios.get(
            `${server}/product/get-all-products-shop/${id}`
        );
        // console.log(data.product)
        dispatch({
            type: "getAllProductShopSuccess",
            payload: data.product,
        });
    } catch (error) {
        dispatch({
            type: "getAllProductShopFailed",
            payload: error.response.data.message,
        });
    }
};
export const DeleteProductById = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "deleteProductShopRequest",
        });

        const { data } = await axios.delete(
            `${server}/product/delete-product/${id}`, {
            withCredentials: true,
        }
        );
        // console.log(data.product)
        dispatch({
            type: "deleteProductShopSuccess",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "deleteProductShopFailed",
            payload: error.response.data.message,
        });
    }
};
export const getAllProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: "getAllProductRequest",
        });

        const { data } = await axios.get(`${server}/product/get-all-product`);
        console.log(data.products)
        dispatch({
            type: "getAllProductSuccess",
            payload: data.products,
        });
    } catch (error) {
        dispatch({
            type: "getAllProductFailed",
            payload: error.response.data.message,
        });
    }
};