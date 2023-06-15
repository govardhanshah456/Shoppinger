import React, { useEffect } from 'react'
import DashBoardHeader from '../Components/DashBoardHeader'
import DashboardSidebar from '../Components/DashboardSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteEventById, getAllEventShop } from '../redux/actions/event'
import { DataGrid } from '@material-ui/data-grid'
import Loader from '../Components/Loader'
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
const ShopAllEvents = () => {
    return (
        <div>
            <DashBoardHeader />
            <div className='flex justify-between w-full'>
                <div className='w-[80px] 800px:w-[330px]'>
                    <DashboardSidebar active={5} />
                </div>
                <div className='w-full justify-center flex'>
                    <AllEvents />
                </div>
            </div>
        </div>
    )
}
const AllEvents = () => {
    const { event, isLoading } = useSelector((state) => state.event)
    const dispatch = useDispatch()
    const { seller } = useSelector((state) => state.seller)
    useEffect(() => {
        dispatch(getAllEventShop(seller._id))
    }, [dispatch])
    const handleDelete = (id) => {
        dispatch(DeleteEventById(id))
        window.location.reload()
    }
    const columns = [
        { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
        {
            field: "name",
            headerName: "Name",
            minWidth: 180,
            flex: 1.4,
        },
        {
            field: "price",
            headerName: "Price",
            minWidth: 100,
            flex: 0.6,
        },
        {
            field: "Stock",
            headerName: "Stock",
            type: "number",
            minWidth: 80,
            flex: 0.5,
        },

        {
            field: "sold",
            headerName: "Sold out",
            type: "number",
            minWidth: 130,
            flex: 0.6,
        },
        {
            field: "Preview",
            flex: 0.8,
            minWidth: 100,
            headerName: "",
            type: "number",
            sortable: false,
            renderCell: (params) => {
                const d = params.row.name;
                const product_name = d.replace(/\s+/g, "-");
                return (
                    <>
                        <Link to={`/event/${params.row.id}`}>
                            <Button>
                                <AiOutlineEye size={20} />
                            </Button>
                        </Link>
                    </>
                );
            },
        },
        {
            field: "Delete",
            flex: 0.8,
            minWidth: 120,
            headerName: "",
            type: "number",
            sortable: false,
            renderCell: (params) => {
                console.log(params)
                return (
                    <>
                        <Button onClick={() => handleDelete(params.row.id)}>
                            <AiOutlineDelete size={20} />
                        </Button>
                    </>
                );
            },
        },
    ];

    const row = [];

    event &&
        event.forEach((item) => {
            row.push({
                id: item._id,
                name: item.name,
                price: "US$ " + item.discountedPrice,
                Stock: item.stock,
                sold: 10,
            });
        });
    return (
        <>
            {
                isLoading ? (<Loader />) :
                    (
                        <div className="w-full justify-center flex">
                            <div className="w-full mx-8 pt-1 mt-10 bg-white">
                                <DataGrid
                                    rows={row}
                                    columns={columns}
                                    pageSize={10}
                                    disableSelectionOnClick
                                    autoHeight
                                />
                            </div>
                        </div>
                    )
            }
        </>
    )
}
export default ShopAllEvents