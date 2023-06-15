
import Loader from '../Components/Loader'
import { server } from "../server";
import styles from '../Styles/styles'
import { getAllProductsShop } from "../redux/actions/product";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import DashBoardHeader from '../Components/DashBoardHeader';
import DashboardSidebar from '../Components/DashboardSidebar';

const AllCoupons = () => {
    const [isLoading, setIsLoading] = useState(false);
    // console.log(selectedProducts)
    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div>
                    <DashBoardHeader />
                    <div className='flex justify-between w-full'>
                        <div className='w-[80px] 800px:w-[330px]'>
                            <DashboardSidebar active={9} />
                        </div>
                        <div className='w-full justify-center flex'>
                            <AllOrders />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
const AllOrders = () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [coupouns, setCoupouns] = useState([]);
    const [minAmount, setMinAmout] = useState(null);
    const [maxAmount, setMaxAmount] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [value, setValue] = useState(null);
    const { seller } = useSelector((state) => state.seller);
    const { product } = useSelector((state) => state.product);
    const products = product
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProductsShop(seller._id))
        setIsLoading(true);
        axios
            .get(`${server}/couponCode/get-coupon/${seller._id}`, {
                withCredentials: true,
            })
            .then((res) => {
                setIsLoading(false);
                setCoupouns(res.data.details);
            })
            .catch((error) => {
                setIsLoading(false);
            });
    }, []);
    console.log(coupouns)
    const handleDelete = async (id) => {
        axios.delete(`${server}/couponCode/delete-coupon/${id}`, { withCredentials: true }).then((res) => {
            toast.success("Coupon code deleted succesfully!")
        }).catch((error) => {
            console.log(error.response.data.message)
        })
        window.location.reload();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios
            .post(
                `${server}/couponCode/create-coupon-code`,
                {
                    name,
                    minAmount,
                    maxAmount,
                    selectedProduct,
                    value,
                    shopId: seller._id,
                },
                { withCredentials: true }
            )
            .then((res) => {
                toast.success("Coupon code created successfully!");
                setOpen(false);
                window.location.reload();
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    };

    const columns = [
        { field: "id", headerName: "Id", minWidth: 150, flex: 0.7 },
        {
            field: "name",
            headerName: "Coupon Code",
            minWidth: 180,
            flex: 1.4,
        },
        {
            field: "price",
            headerName: "Value",
            minWidth: 100,
            flex: 0.6,
        },
        {
            field: "Delete",
            flex: 0.8,
            minWidth: 120,
            headerName: "",
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Button onClick={() => handleDelete(params.id)}>
                            <AiOutlineDelete size={20} />
                        </Button>
                    </>
                );
            },
        },
    ];

    const row = [];

    coupouns &&
        coupouns.forEach((item) => {
            row.push({
                id: item._id,
                name: item.name,
                price: item.value + " %",
                sold: 10,
            });
        });
    return (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
            <div className="w-full flex justify-end">
                <div
                    className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`}
                    onClick={() => setOpen(true)}
                >
                    <span className="text-white">Create Coupon Code</span>
                </div>
            </div>
            <DataGrid
                rows={row}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                autoHeight
            />
            {open && (
                <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
                    <div className="w-[90%] 800px:w-[40%] h-[80vh] bg-white rounded-md shadow p-4">
                        <div className="w-full flex justify-end">
                            <RxCross1
                                size={30}
                                className="cursor-pointer"
                                onClick={() => setOpen(false)}
                            />
                        </div>
                        <h5 className="text-[30px] font-Poppins text-center">
                            Create Coupon code
                        </h5>
                        {/* create coupoun code */}
                        <form onSubmit={handleSubmit} aria-required={true}>
                            <br />
                            <div>
                                <label className="pb-2">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={name}
                                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your coupon code name..."
                                />
                            </div>
                            <br />
                            <div>
                                <label className="pb-2">
                                    Discount Percentenge{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="value"
                                    value={value}
                                    required
                                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    onChange={(e) => setValue(e.target.value)}
                                    placeholder="Enter your coupon code value..."
                                />
                            </div>
                            <br />
                            <div>
                                <label className="pb-2">Min Amount</label>
                                <input
                                    type="number"
                                    name="value"
                                    value={minAmount}
                                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    onChange={(e) => setMinAmout(e.target.value)}
                                    placeholder="Enter your coupon code min amount..."
                                />
                            </div>
                            <br />
                            <div>
                                <label className="pb-2">Max Amount</label>
                                <input
                                    type="number"
                                    name="value"
                                    value={maxAmount}
                                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    onChange={(e) => setMaxAmount(e.target.value)}
                                    placeholder="Enter your coupon code max amount..."
                                />
                            </div>
                            <br />
                            <div>
                                <label className="pb-2">Selected Product</label>
                                <select
                                    className="w-full mt-2 border h-[35px] rounded-[5px]"
                                    value={selectedProduct}
                                    onChange={(e) => {
                                        const selectedProductId = e.target.value;
                                        if (!selectedProduct.includes(selectedProductId)) {
                                            setSelectedProduct([...selectedProduct, selectedProductId]);
                                        }
                                    }}
                                    multiple
                                >
                                    <option value="Choose your selected products">
                                        Choose a selected product
                                    </option>
                                    {products &&
                                        products.map((i) => (
                                            <option value={i._id} key={i._id}>
                                                {i.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <br />
                            <div>
                                <input
                                    type="submit"
                                    value="Create"
                                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
export default AllCoupons;