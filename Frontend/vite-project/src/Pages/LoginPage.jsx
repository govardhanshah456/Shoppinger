import React from 'react'
import Login from '../Components/Login'
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import { useEffect } from 'react'
const LoginPage = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
        if (isAuthenticated === true) {
            navigate("/");
        }
    }, [])
    return (
        <>
            <Login />
        </>
    )
}

export default LoginPage