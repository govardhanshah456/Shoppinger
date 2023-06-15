import React from 'react'
import DashBoardHeader from '../Components/DashBoardHeader'
import DashboardSidebar from '../Components/DashboardSidebar'
import AllOrders from '../Components/AllOrders'

const ShopAllOrders = () => {
    return (
        <div>
            <DashBoardHeader />
            <div className='flex justify-between w-full'>
                <div className='w-[80px] 800px:w-[330px]'>
                    <DashboardSidebar active={2} />
                </div>
                <div className='w-full justify-center flex'>
                    <AllOrders />
                </div>
            </div>
        </div>
    )
}

export default ShopAllOrders