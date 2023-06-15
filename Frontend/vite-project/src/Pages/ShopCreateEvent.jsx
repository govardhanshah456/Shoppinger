import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { categoriesData } from '../Static/data'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { server } from '../server'
import axios from 'axios'
import { toast } from "react-toastify"
import DashBoardHeader from '../Components/DashBoardHeader'
import DashboardSidebar from '../Components/DashboardSidebar'
import { createEvent } from '../redux/actions/event'
const ShopCreateEvent = () => {
    const { seller } = useSelector((state) => state.seller)
    const { error, success, event } = useSelector((state) => state.event)
    const [images, setImages] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [tags, setTags] = useState("")
    const [originalPrice, setOriginalPrice] = useState(0)
    const [discountPrice, setDiscountPrice] = useState()
    const [stock, setStock] = useState()
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        if (success) {
            toast.success("Event created successfully!");
            navigate("/dashboard-events");
            window.location.reload();
        }
    }, [dispatch, error, success]);
    const handleImageChange = (e) => {
        e.preventDefault();
        let files = Array.from(e.target.files);
        setImages(() => {
            return files
        });
    };
    const handleStartDateChange = (e) => {
        const startDate = new Date(e.target.value);
        const minEndDate = new Date(startDate.getTime() + 1 * 24 * 60 * 60 * 1000);
        setStartDate(startDate);
        setEndDate(null);
        console.log()
        document.getElementById("end-date").min = minEndDate.toISOString().slice(0, 10);
    }

    const handleEndDateChange = (e) => {
        const endDate = new Date(e.target.value);
        setEndDate(endDate);
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        const newForm = new FormData()
        images.map((file) => {
            newForm.append("images", file)
        })
        newForm.append("name", name)
        newForm.append("description", description)
        newForm.append("category", category)
        newForm.append("tags", tags)
        newForm.append("originalPrice", originalPrice)
        newForm.append("discountedPrice", discountPrice)
        newForm.append("stock", stock)
        newForm.append("shopId", seller._id)
        newForm.append("startDate", startDate.toISOString());
        newForm.append("endDate", endDate.toISOString());
        console.log(newForm);
        dispatch(createEvent(newForm))
    }
    const today = new Date().toISOString().slice(0, 10);
    const minEndDate = startDate ? new Date(startDate.getTime() + 1 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10) : "";
    return (
        <div>
            <DashBoardHeader />
            <div className="flex justify-between w-full">
                <div className="w-[80px] 800px:w-[330px]">
                    <DashboardSidebar active={6} />
                </div>
                <div className="w-full justify-center flex">
                    <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
                        <h5 className="text-[30px] font-Poppins text-center">Create Event</h5>
                        {/* create Event form */}
                        <form onSubmit={handleSubmit}>
                            <br />
                            <div>
                                <label className="pb-2">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your Event name..."
                                />
                            </div>
                            <br />
                            <div>
                                <label className="pb-2">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    cols="30"
                                    required
                                    rows="8"
                                    type="text"
                                    name="description"
                                    value={description}
                                    className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Enter your Event description..."
                                ></textarea>
                            </div>
                            <br />
                            <div>
                                <label className="pb-2">
                                    Category <span className="text-red-500">*</span>
                                </label>
                                <select
                                    className="w-full mt-2 border h-[35px] rounded-[5px]"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="Choose a category">Choose a category</option>
                                    {categoriesData &&
                                        categoriesData.map((i) => (
                                            <option value={i.title} key={i.title}>
                                                {i.title}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <br />
                            <div>
                                <label className="pb-2">Tags</label>
                                <input
                                    type="text"
                                    name="tags"
                                    value={tags}
                                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    onChange={(e) => setTags(e.target.value)}
                                    placeholder="Enter your Event tags..."
                                />
                            </div>
                            <br />
                            <div>
                                <label className="pb-2">Start Date</label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={startDate ? startDate.toISOString().slice(0, 10) : ""}
                                    min={today}
                                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    onChange={handleStartDateChange}
                                    placeholder="Enter your Event Start Date..."
                                />
                            </div>
                            <br />
                            <div>
                                <label className="pb-2">End Date</label>
                                <input
                                    type="date"
                                    name="price"
                                    id="end-date"
                                    value={endDate ? endDate.toISOString().slice(0, 10) : ""}
                                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    onChange={handleEndDateChange}
                                    min={minEndDate}
                                    placeholder="Enter your event end date..."
                                />
                            </div>
                            <br />
                            <div>
                                <label className="pb-2">Original Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={originalPrice}
                                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    onChange={(e) => setOriginalPrice(e.target.value)}
                                    placeholder="Enter your Event price...(by default enter 0)"
                                />
                            </div>
                            <br />
                            <div>
                                <label className="pb-2">
                                    Price (With Discount) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={discountPrice}
                                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    onChange={(e) => setDiscountPrice(e.target.value)}
                                    placeholder="Enter your Event price with discount..."
                                />
                            </div>
                            <br />
                            <div>
                                <label className="pb-2">
                                    Event Stock <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={stock}
                                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    onChange={(e) => setStock(e.target.value)}
                                    placeholder="Enter your Event stock..."
                                />
                            </div>
                            <br />
                            <div>
                                <label className="pb-2">
                                    Upload Images <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="file"
                                    name=""
                                    id="upload"
                                    className="hidden"
                                    multiple
                                    onChange={handleImageChange}
                                />
                                <div className="w-full flex items-center flex-wrap">
                                    <label htmlFor="upload">
                                        <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
                                    </label>
                                    {images &&
                                        images.map((i) => (
                                            <img
                                                src={URL.createObjectURL(i)}
                                                key={i}
                                                alt=""
                                                className="h-[120px] w-[120px] object-cover m-2"
                                            />
                                        ))}
                                </div>
                                <br />
                                <div>
                                    <input
                                        type="submit"
                                        value="Create"
                                        className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ShopCreateEvent