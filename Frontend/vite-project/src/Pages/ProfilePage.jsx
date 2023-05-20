import React, { useState } from 'react'
import Header from '../Components/Header'
import styles from '../Styles/styles'
import ProfileSidebar from "../Components/ProfileSidebar.jsx"
import ProfileContent from "../Components/ProfileContent.jsx"
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
const ProfilePage = () => {
    const [active, setActive] = useState(1)
    const { isAuthenticated } = useSelector((state) => state.user)
    if (isAuthenticated == false) {
        return <Navigate to="/login" />
    }
    return (
        <>
            <Header />
            <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
                <div className='w-[335px]'>
                    <ProfileSidebar active={active} setActive={setActive} />
                </div>
                <ProfileContent active={active} />
            </div>

        </>
    )
}

export default ProfilePage