import React from 'react'
import DashBoardHeader from '../Components/DashBoardHeader'
import DashboardSidebar from "../Components/DashboardSidebar.jsx"
import ShopCreateProduct from './ShopCreateProduct'
const ShopProfilePage = () => {
    return (
        <>
            <DashBoardHeader />
            <div className='flex items-center justify-between w-full'>
                <div className='w-[80px] 800px:w-[330px]'>
                    <DashboardSidebar active={1} />
                </div>
                {/* <div className='w-full justify-center flex'><ShopCreateProduct /></div> */}
            </div>

        </>
    )
}

export default ShopProfilePage