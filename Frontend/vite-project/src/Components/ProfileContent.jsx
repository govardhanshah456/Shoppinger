import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { backend_url } from "../server"
import { AiOutlineCamera, AiOutlineDelete } from 'react-icons/ai'
import styles from "../Styles/styles"
import { DataGrid } from "@material-ui/data-grid"
import { Link } from 'react-router-dom'
import {
    AiOutlineArrowRight,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx"
import { Button } from "@material-ui/core";
import { MdOutlineTrackChanges } from "react-icons/md";
import { toast } from 'react-toastify'
import axios from "axios"
import { server } from '../server'
import { loadUser } from "../redux/actions/user"
import AddressCard from './AddressCard'
import { Modal } from "@material-ui/core"
const ProfileContent = ({ active }) => {
    const { user } = useSelector((state) => state.user)
    const [name, setName] = useState(user && user.name)
    const [email, setEmail] = useState(user && user.email)
    const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber)
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState(null);
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("name", name)
        formData.append("email", email)
        formData.append("password", password)
        formData.append("phoneNumber", phoneNumber)
        const formDataObject = Object.fromEntries(formData.entries());
        console.log(formDataObject)
        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true,
        }
        axios.put(`${server}/user/update-user-info`, formData, config).then((res) => {
            toast.success("Succesfully Updated")
        }).catch((error) => {
            // console.log("inside")
            toast.error(error.response.data.message)
        })

    }
    const dispatch = useDispatch()
    const HandleImage = async (e) => {
        e.preventDefault()
        const file = e.target.files[0];
        setAvatar(file);

        const formData = new FormData();

        formData.append("image", e.target.files[0]);

        axios
            .put(`${server}/user/update-user-avatar`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            })
            .then((response) => {
                toast.success("avatar updated successfully!");
                dispatch(loadUser())
            })
            .catch((error) => {
                toast.error(error);
            });
    }
    return (
        <div className='w-full'>
            {
                active === 1 &&
                (
                    <>
                        <div className='flex justify-center w-full'>
                            <div className='relative'>
                                <img src={`${backend_url}${user && user.avatar}`}
                                    className='w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]'
                                />
                                <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                                    <input
                                        type="file"
                                        id="image"
                                        className="hidden"
                                        onChange={HandleImage}
                                    />
                                    <label htmlFor="image">
                                        <AiOutlineCamera />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <br />
                        <br />
                        <div className='w-full px-5'>
                            <form onSubmit={handleSubmit} aria-required={true}>
                                <div className='w-full 800px:flex block pb-3'>
                                    <div className='w-[100%] 800px:w-[50%]'>
                                        <label className='block pb-2'>Full Name</label>
                                        <input type='text' className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className='w-[100%] 800px:w-[50%]'>
                                        <label className='block pb-2'>E-Mail</label>
                                        <input type='text' className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className='w-full 800px:flex block pb-3'>
                                    <div className='w-[100%] 800px:w-[50%]'>
                                        <label className='block pb-2'>Phone Number</label>
                                        <input type='number' className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                    </div>
                                    <div className='w-[100%] 800px:w-[50%]'>
                                        <label className='block pb-2'>Password</label>
                                        <input type='password' className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <input
                                    className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                                    required
                                    value="Update"
                                    type="submit"
                                />
                            </form>
                        </div>
                    </>
                )
            }
            {
                active === 2 && (
                    <>
                        <AllOrders />
                    </>
                )
            }
            {
                active === 3 && (
                    <>
                        <AllRefundOrders />
                    </>
                )
            }
            {
                active === 5 && (
                    <>
                        <TrackOrder />
                    </>
                )
            }
            {
                active === 6 && (
                    <>
                        <ChangePassword />
                    </>
                )
            }
            {
                active === 7 && (
                    <>
                        <Address />
                    </>
                )
            }

        </div>
    )
}
const AllOrders = () => {
    const [orders, setOrders] = useState(null)
    const { user } = useSelector((state) => state.user)
    const id = user && user._id
    console.log(id)

    useEffect(() => {
        axios.get(`${server}/order/get-all-order/${id}`).then((res) => {
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
    const rows = []
    orders && orders.forEach((item) => {
        rows.push({
            id: item._id,
            itemsQty: item.cart.length,
            total: "$" + item.totalPrice,
            status: item.status,
        })
    })
    return (
        <div className='pl-8 pt-1'>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableRowSelectionOnClick
                autoHeight
            />
        </div>
    )
}
const AllRefundOrders = () => {
    const [orders, setOrders] = useState(null)
    const { user } = useSelector((state) => state.user)
    const id = user && user._id
    useEffect(() => {
        axios.get(`${server}/order/get-all-order-refund/${id}`).then((res) => {
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
                        <Link to={`/order/user/${params.id}`}>
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
        <div className="pl-8 pt-1">
            <DataGrid
                rows={row}
                columns={columns}
                pageSize={10}
                autoHeight
                disableSelectionOnClick
            />
        </div>
    );
};
const TrackOrder = () => {
    const { user } = useSelector((state) => state.user)
    const [orders, setOrders] = useState(null)
    useEffect(() => {
        axios.get(`${server}/order/get-all-order/${user._id}`, { withCredentials: true }).then((res) => {
            setOrders(res.data.orders)
        }).catch((err) => {
            console.log(err)
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
            minWidth: 130,
            headerName: "",
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/orderTrack/${params.id}`}>
                            <Button>
                                <MdOutlineTrackChanges size={20} />
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
        <div className="pl-8 pt-1">
            <DataGrid
                rows={row}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                autoHeight
            />
        </div>
    );
};
const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [renterNewPassword, setRenterNewPassword] = useState("")
    const { user } = useSelector((state) => state.user)
    const handleSubmit = (e) => {
        e.preventDefault()
        const pass = currentPassword, newPass = newPassword, confPass = renterNewPassword, id = user._id
        axios.put(`${server}/user/update-password`, { pass, newPass, confPass, id }, { withCredentials: true })
            .then((res) => {
                console.log(res);
                toast.success("password Updated Successfully")
                axios.get(`${server}/user/logout`, { withCredentials: true }).then((res) => {
                    toast.success("Please Login Again with updated password!")
                    window.location.reload()
                })
                    .catch((error) => {
                        toast.error(error.response.data.message)
                    })
            })
            .catch((error) => {
                toast.error(error.response.data.message)
            })
    }
    return (
        <div className='w-full px-5'>
            <div className='flex w-full items-center justify-between'>
                <h1 className='text-[25px] font-[600px] text-[#000000ba] pb-2'>
                    Change Password
                </h1>
            </div>
            <br />
            <div className='w-full px-5'>
                <form onSubmit={handleSubmit} aria-required={true}>
                    <div className='w-full 800px:flex block pb-3'>
                        <div className='w-[100%] 800px:w-[50%]'>
                            <label className='block pb-2'>Current Password</label>
                            <input type='password' className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className='w-full 800px:flex block pb-3'>
                        <div className='w-[100%] 800px:w-[50%]'>
                            <label className='block pb-2'>New Password</label>
                            <input type='password' className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className='w-full 800px:flex block pb-3'>
                        <div className='w-[100%] 800px:w-[50%]'>
                            <label className='block pb-2'> Renter New Password</label>
                            <input type='password' className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required value={renterNewPassword} onChange={(e) => setRenterNewPassword(e.target.value)} />
                        </div>
                    </div>
                    <input
                        className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                        required
                        value="Update"
                        type="submit"
                    />
                </form>
            </div>
        </div>
    )
}
const Address = () => {
    const [open, setOpen] = useState(false)
    const [zipCode, setZipCode] = useState("")
    const [country, setCountry] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [address1, setAddress1] = useState("")
    const [address2, setAddress2] = useState("")
    const [addressType, setAddressType] = useState("")
    const [editAddress, setEditAddress] = useState(null)
    const [deleteAddress, setDeleteAddress] = useState(null)
    const { user } = useSelector((state) => state.user)
    const address = user && user.addresses;
    const id = user && user._id
    const user_id = user._id
    const addressTypes = [
        {
            "name": "Home",
        },
        {
            "name": "Office",
        }
    ]
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`${server}/user/add-address`, { zipCode, country, city, state, address1, address2, addressType, id }, { withCredentials: true }).then((res) => {
            setOpen(false)
            toast.success("Succesfully Updated")
            window.location.reload()
        }).catch((error) => {
            setOpen(false)
            toast.error(error.response.data.message)

        })
    }

    // var address_id = "";
    const handleEdit = (address, handleMenuClose) => {
        console.log(address)
        // address_id = address._id
        setEditAddress(address)
        handleMenuClose()
    };
    const handleDeleteActual = (e) => {
        // e.preventDefault()
        const address_id = deleteAddress._id
        axios.put(`${server}/user/delete-address`, { user_id, address_id }, { withCredentials: true }).then((res) => {
            setModalOpen(false)
            toast.success("deleted successfully!")
            window.location.reload()
        })
            .catch((error) => {
                setModalOpen(false)
                toast.error(error.response.data.message)
            })
    }
    const handleDelete = (address, handleMenuClose) => {
        // Handle delete logic
        setDeleteAddress(address)
        handleMenuClose()

    };

    const handleSubmitEdit = (e) => {
        e.preventDefault()
        const zipCode = editAddress.zipCode
        const country = editAddress.country
        const city = editAddress.city
        const state = editAddress.state
        const address1 = editAddress.address1
        const address2 = editAddress.address2
        const addressType = editAddress.addressType
        const address_id = editAddress._id
        axios.put(`${server}/user/update-address`, { zipCode, country, city, state, address1, address2, addressType, user_id, address_id }, { withCredentials: true }).then((res) => {
            setEditAddress(null)
            console.log("inside")
            toast.success("Succesfully Updated")
            window.location.reload()
        }).catch((error) => {
            setEditAddress(null)
            console.log("Inside Here")
            toast.error(error.response.data.message)

        })
    }
    const [modalOpen, setModalOpen] = useState(true);

    const handleOpen = () => {
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
    }
    return (
        <>
            {open && (
                <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
                    <div className="w-[100%] 800px:w-[40%] h-[105vh] bg-white rounded-md shadow p-4">
                        <div className="w-full flex justify-end">
                            <RxCross1
                                size={30}
                                className="cursor-pointer"
                                onClick={() => setOpen(null)}
                            />
                        </div>
                        <h5 className="text-[30px] font-Poppins text-center">
                            Add New Address
                        </h5>
                        {/* create coupoun code */}
                        <form onSubmit={handleSubmit} aria-required={true}>
                            <br />
                            <div>
                                <label className="pb-2">
                                    ZipCode <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="name"
                                    required
                                    value={zipCode}
                                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    onChange={(e) => setZipCode(e.target.value)}
                                    placeholder="Enter your ZipCode"
                                />
                            </div>
                            <br />
                            <div>
                                <label className="pb-2">
                                    Country
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="value"
                                    value={country}
                                    required
                                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    onChange={(e) => setCountry(e.target.value)}
                                    placeholder="Enter your Country"
                                />
                            </div>
                            <br />
                            <div>
                                <label className="pb-2">State</label>
                                <input
                                    type="text"
                                    name="value"
                                    value={state}
                                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    onChange={(e) => setState(e.target.value)}
                                    placeholder="Enter your State..."
                                />
                            </div>
                            <div>
                                <label className="pb-2">City</label>
                                <input
                                    type="text"
                                    name="value"
                                    value={city}
                                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder="Enter your State..."
                                />
                            </div>
                            <br />
                            <div>
                                <label className="pb-2">Address1</label>
                                <input
                                    type="text"
                                    name="value"
                                    value={address1}
                                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    onChange={(e) => setAddress1(e.target.value)}
                                    placeholder="Enter your coupon code max amount..."
                                />
                            </div>
                            <div>
                                <label className="pb-2">Address2</label>
                                <input
                                    type="text"
                                    name="value"
                                    value={address2}
                                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    onChange={(e) => setAddress2(e.target.value)}
                                    placeholder="Enter your coupon code max amount..."
                                />
                            </div>
                            <br />
                            <div>
                                <label className="pb-2">Address Type</label>
                                <select

                                    className="w-full mt-2 border h-[35px] rounded-[5px] bg-lightgray cursor:not-allowed"
                                    value={addressType}
                                    onChange={(e) => setAddressType(e.target.value)}

                                >
                                    <option value="Choose your selected products">
                                        Choose an option
                                    </option>
                                    {addressTypes &&
                                        addressTypes.map((i) => (
                                            <option value={i.name} key={i.name}>
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
                                    className="mt-2 appearance-none block w-[50%] ml-auto mr-auto px-3 h-[35px] bg-black text-[#fff] border border-gray-300 rounded-[3px] placeholder-gray-400 cursor-pointer focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <div className='w-full px-5'>
                <div className='flex w-full items-center justify-between'>
                    <h1 className='text-[25px] font-[600] text-[#000000ba] pb-2'>
                        My Addresses
                    </h1>
                    <div className={`${styles.button} rounded-md`} onClick={() => setOpen(!open)}>
                        <span className='text-[#fff]'>Add New Address</span>
                    </div>
                </div>
                <br />
                {
                    address && address.map((i, index) => (
                        <AddressCard key={index} address={i} handleEdit={handleEdit} handleDelete={handleDelete} />
                    ))
                }
                {
                    address.length === 0 ? (
                        <div>You have not added Address yet</div>
                    ) : null
                }
                {
                    deleteAddress && <div>

                        <Modal open={modalOpen} onClose={handleClose}>
                            <div className="modal-content">
                                <h2>Confirmation</h2>
                                <p>Are you sure you want to delete?</p>
                                <div className="modal-actions">
                                    <Button variant="contained" color="secondary" onClick={handleDeleteActual}>
                                        Yes
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={handleClose}>
                                        No
                                    </Button>
                                </div>
                            </div>
                        </Modal>
                    </div>
                }
                {editAddress &&
                    <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
                        <div className="w-[100%] 800px:w-[40%] h-[105vh] bg-white rounded-md shadow p-4">
                            <div className="w-full flex justify-end">
                                <RxCross1
                                    size={30}
                                    className="cursor-pointer"
                                    onClick={() => setEditAddress(null)}
                                />
                            </div>
                            <h5 className="text-[30px] font-Poppins text-center">
                                Update Address
                            </h5>
                            {/* create coupoun code */}
                            <form onSubmit={handleSubmitEdit} aria-required={true}>
                                <br />
                                <div>
                                    <label className="pb-2">
                                        ZipCode <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="name"
                                        required
                                        value={editAddress.zipCode}
                                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        onChange={(e) => setEditAddress({
                                            ...editAddress,
                                            zipCode: e.target.value
                                        })}
                                        placeholder="Enter your ZipCode"
                                    />
                                </div>
                                <br />
                                <div>
                                    <label className="pb-2">
                                        Country
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="value"
                                        value={editAddress.country}
                                        required
                                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        onChange={(e) => setEditAddress({
                                            ...editAddress,
                                            country: e.target.value
                                        })}
                                        placeholder="Enter your Country"
                                    />
                                </div>
                                <br />
                                <div>
                                    <label className="pb-2">State</label>
                                    <input
                                        type="text"
                                        name="value"
                                        value={editAddress.state}
                                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        onChange={(e) => setEditAddress({
                                            ...editAddress,
                                            state: e.target.value
                                        })}
                                        placeholder="Enter your State..."
                                    />
                                </div>
                                <div>
                                    <label className="pb-2">City</label>
                                    <input
                                        type="text"
                                        name="value"
                                        value={editAddress.city}
                                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        onChange={(e) => setEditAddress({
                                            ...editAddress,
                                            city: e.target.value
                                        })}
                                        placeholder="Enter your State..."
                                    />
                                </div>
                                <br />
                                <div>
                                    <label className="pb-2">Address1</label>
                                    <input
                                        type="text"
                                        name="value"
                                        value={editAddress.address1}
                                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        onChange={(e) => setEditAddress({
                                            ...editAddress,
                                            address1: e.target.value
                                        })}
                                        placeholder="Enter your coupon code max amount..."
                                    />
                                </div>
                                <div>
                                    <label className="pb-2">Address2</label>
                                    <input
                                        type="text"
                                        name="value"
                                        value={editAddress.address2}
                                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        onChange={(e) => setEditAddress({
                                            ...editAddress,
                                            address2: e.target.value
                                        })}
                                        placeholder="Enter your coupon code max amount..."
                                    />
                                </div>
                                <br />
                                <div>
                                    <label className="pb-2">Address Type</label>
                                    <select
                                        disabled
                                        className="w-full mt-2 border h-[35px] rounded-[5px]"
                                        value={editAddress.addressType}
                                        onChange={(e) => setEditAddress({
                                            ...editAddress,
                                            addressType: e.target.value
                                        })}
                                    >
                                        <option value="Choose your selected products">
                                            Choose an option
                                        </option>
                                        {addressTypes &&
                                            addressTypes.map((i) => (
                                                <option value={i.name} key={i.name}>
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
                                        className="mt-2 appearance-none block w-[50%] ml-auto mr-auto px-3 h-[35px] bg-black text-[#fff] border border-gray-300 rounded-[3px] placeholder-gray-400 cursor-pointer focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                }
                {/* <div className='w-full bg-white rounded-[4px] flex items-center shadow px-3 justify-between  pr-18'>
                    <div className='flex items-center'>
                        <h5 className="pl-5 font-[600] text-[12px] 800px:text-[unset]">
                            102,
                        </h5>
                        <div className="pl-8 flex items-center">
                            <h6 className="text-[12px] 800px:text-[unset]">Tapovan Apartment,</h6>
                            <h5 className="pl-6 text-[12px] 800px:text-[unset]">Govindnagar,Dahod</h5>
                        </div>
                        <div className="min-w-[10%] flex items-center justify-between pl-8">
                            <AiOutlineDelete size={25} className="cursor-pointer" />
                        </div>
                    </div>

                </div> */}
            </div>
        </>
    )
}
export default ProfileContent