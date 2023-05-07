import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { server } from "../server";
const ActivationPage = () => {

    const { activation_token } = useParams();
    // const history = useNavigate()
    console.log(activation_token)
    const [error, setError] = useState(false);
    useEffect(() => {
        if (activation_token) {
            const sendRequest = async () => {
                await axios
                    .post(`${server}/user/activation`, {
                        activation_token,
                    })
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        setError(true);
                    });
            };
            sendRequest();
        }
    }, []);

    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {
                error ? (
                    <p>Token has expired.</p>
                ) : (
                    <>
                        <p>Account Verified Successfully</p>
                        <Navigate to="login" />
                    </>
                )
            }
        </div>
    );
};

export default ActivationPage;