import React from 'react'
import DashBoardHeader from '../Components/DashBoardHeader'
import DashboardSidebar from '../Components/DashboardSidebar'
import ShopSettings from '../Components/ShopSettings'

const ShopSettingsPage = () => {
    return (
        <div>
            <DashBoardHeader />
            <div className="flex justify-between w-full">
                <div className="w-[80px] 800px:w-[330px]">
                    <DashboardSidebar active={11} />
                </div>
                <div className="w-full justify-center flex">
                    <div className="w-full mx-8 pt-1 mt-10 bg-white">
                        <ShopSettings />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ShopSettingsPage