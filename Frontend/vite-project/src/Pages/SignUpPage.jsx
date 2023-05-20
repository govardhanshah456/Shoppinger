import React from 'react'
import SignUp from '../Components/SignUp'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const SignUpPage = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
        if (isAuthenticated === true) {
            navigate("/");
        }
    }, [])
    return (
        <div><SignUp /></div>
    )
}

export default SignUpPage