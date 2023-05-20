import React from 'react'
import { AiOutlineFolderAdd, AiOutlineGift } from 'react-icons/ai'
import { FiPackage, FiShoppingBag } from 'react-icons/fi'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { RxDashboard } from 'react-icons/rx'
import { Link } from 'react-router-dom'
import { VscNewFile } from "react-icons/vsc"
import { HiOutlineReceiptRefund } from 'react-icons/hi'
import { BiMessageSquareDetail } from 'react-icons/bi'
import { CiMoneyBill, CiSettings } from "react-icons/ci"
const DashboardSidebar = ({ active }) => {
    return (
        <div className='w-full h-[90vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10'>
            <div className='w-full flex items-center p-4'>
                <Link to="/dashboard" className='w-full flex items-center'>
                    <RxDashboard size={30} color={`${active === 1 ? "crimson" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] text-[${active === 1 ? "crimson" : "#555"}]`}>
                        Dashboard
                    </h5>
                </Link>
            </div>
            <div className='w-full flex items-center p-4'>
                <Link to="/dashboard-orders" className='w-full flex items-center'>
                    <FiShoppingBag size={30} color={`${active === 2 ? "crimson" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] text-[${active === 2 ? "crimson" : "#555"}]`}>
                        All Orders
                    </h5>
                </Link>
            </div>
            <div className='w-full flex items-center p-4'>
                <Link to="/dashboard-products" className='w-full flex items-center'>
                    <FiPackage size={30} color={`${active === 3 ? "crimson" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] text-[${active === 3 ? "crimson" : "#555"}]`}>
                        All Products
                    </h5>
                </Link>
            </div>
            <div className='w-full flex items-center p-4'>
                <Link to="/dashboard-create-product" className='w-full flex items-center'>
                    <AiOutlineFolderAdd size={30} color={`${active === 4 ? "crimson" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] text-[${active === 4 ? "crimson" : "#555"}]`}>
                        Create Product
                    </h5>
                </Link>
            </div>
            <div className='w-full flex items-center p-4'>
                <Link to="/dashboard-events" className='w-full flex items-center'>
                    <MdOutlineLocalOffer size={30} color={`${active === 5 ? "crimson" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] text-[${active === 5 ? "crimson" : "#555"}]`}>
                        All Events
                    </h5>
                </Link>
            </div>
            <div className='w-full flex items-center p-4'>
                <Link to="/dashboard-create-event" className='w-full flex items-center'>
                    <VscNewFile size={30} color={`${active === 6 ? "crimson" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] text-[${active === 6 ? "crimson" : "#555"}]`}>
                        Create Event
                    </h5>
                </Link>
            </div>
            <div className='w-full flex items-center p-4'>
                <Link to="/dashboard-withdraw-money" className='w-full flex items-center'>
                    <CiMoneyBill size={30} color={`${active === 7 ? "crimson" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] text-[${active === 7 ? "crimson" : "#555"}]`}>
                        Withdraw Money
                    </h5>
                </Link>
            </div>
            <div className='w-full flex items-center p-4'>
                <Link to="/dashboard-messages" className='w-full flex items-center'>
                    <BiMessageSquareDetail size={30} color={`${active === 8 ? "crimson" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] text-[${active === 8 ? "crimson" : "#555"}]`}>
                        Inbox
                    </h5>
                </Link>
            </div>
            <div className='w-full flex items-center p-4'>
                <Link to="/dashboard-coupons" className='w-full flex items-center'>
                    <AiOutlineGift size={30} color={`${active === 9 ? "crimson" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] text-[${active === 9 ? "crimson" : "#555"}]`}>
                        Discount Codes
                    </h5>
                </Link>
            </div>
            <div className='w-full flex items-center p-4'>
                <Link to="/dashboard-refunds" className='w-full flex items-center'>
                    <HiOutlineReceiptRefund size={30} color={`${active === 10 ? "crimson" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] text-[${active === 10 ? "crimson" : "#555"}]`}>
                        Refunds
                    </h5>
                </Link>
            </div>
            <div className='w-full flex items-center p-4'>
                <Link to="/dashboard-settings" className='w-full flex items-center'>
                    <CiSettings size={30} color={`${active === 11 ? "crimson" : "#555"}`} />
                    <h5 className={`hidden 800px:block pl-2 text-[18px] font-[400] text-[${active === 11 ? "crimson" : "#555"}]`}>
                        Settings
                    </h5>
                </Link>
            </div>
        </div>
    )
}

export default DashboardSidebar