// import React from 'react'
import DashBoardHeader from '../Components/DashBoardHeader'
import DashboardSidebar from '../Components/DashboardSidebar'
import { Button } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { server } from '../server'
const ShopRefundedOrders = () => {
    return (
        <div>
            <DashBoardHeader />
            <div className='flex justify-between w-full'>
                <div className='w-[80px] 800px:w-[330px]'>
                    <DashboardSidebar active={10} />
                </div>
                <div className='w-full justify-center flex'>
                    <AllOrdersRefunded />
                </div>
            </div>
        </div>
    )
}
const AllOrdersRefunded = () => {
    const [orders, setOrders] = useState(null)
    const { seller } = useSelector((state) => state.seller)
    const id = seller && seller._id
    console.log(id)
    useEffect(() => {
        axios.get(`${server}/order/get-all-order-seller-refunded/${id}`).then((res) => {
            console.log(res)
            setOrders(res.data.orders)
        })
    }, [])


    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

        {
            field: "status",
            headerName: "Status",
            minWidth: 130,
            flex: 0.7,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered"
                    ? "greenColor"
                    : "redColor";
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 130,
            flex: 0.7,
        },

        {
            field: "total",
            headerName: "Total",
            type: "number",
            minWidth: 130,
            flex: 0.8,
        },

        {
            field: " ",
            flex: 1,
            minWidth: 150,
            headerName: "",
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/order/${params.id}`}>
                            <Button>
                                <AiOutlineArrowRight size={20} />
                            </Button>
                        </Link>
                    </>
                );
            },
        },
    ];

    const row = [];

    orders &&
        orders.forEach((item) => {
            row.push({
                id: item._id,
                itemsQty: item.cart.length,
                total: "US$ " + item.totalPrice,
                status: item.status,
            });
        });

    return (
        <div className="w-full justify-center flex">
            <div className="w-full mx-8 pt-1 mt-10 bg-white">
                <DataGrid
                    rows={row}
                    columns={columns}
                    pageSize={10}
                    autoHeight
                    disableSelectionOnClick
                />
            </div>
        </div>
    );
}
export default ShopRefundedOrders