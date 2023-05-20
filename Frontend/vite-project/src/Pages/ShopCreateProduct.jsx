import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { categoriesData } from '../Static/data'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { server } from '../server'
import axios from 'axios'
import { toast } from "react-toastify"
import { createProduct } from '../redux/actions/product'
import DashBoardHeader from '../Components/DashBoardHeader'
import DashboardSidebar from '../Components/DashboardSidebar'
const ShopCreateProduct = () => {
    const { seller } = useSelector((state) => state.seller)
    const navigate = useNavigate()
    const { success, error } = useSelector((state) => state.product);
    const [images, setImages] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [tags, setTags] = useState("")
    const [originalPrice, setOriginalPrice] = useState(0)
    const [discountPrice, setDiscountPrice] = useState()
    const [stock, setStock] = useState()
    const dispatch = useDispatch()
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        if (success) {
            toast.success("Product created successfully!");
            navigate("/dashboard");
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
        console.log(newForm);
        dispatch(createProduct(newForm))
    }
    return (
        <div>
            <DashBoardHeader />
            <div className="flex justify-between w-full">
                <div className="w-[80px] 800px:w-[330px]">
                    <DashboardSidebar active={4} />
                </div>
                <div className="w-full justify-center flex">
                    <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
                        <h5 className="text-[30px] font-Poppins text-center">Create Product</h5>
                        {/* create product form */}
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
                                    placeholder="Enter your product name..."
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
                                    placeholder="Enter your product description..."
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
                                    placeholder="Enter your product tags..."
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
                                    placeholder="Enter your product price...(by default enter 0)"
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
                                    placeholder="Enter your product price with discount..."
                                />
                            </div>
                            <br />
                            <div>
                                <label className="pb-2">
                                    Product Stock <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={stock}
                                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    onChange={(e) => setStock(e.target.value)}
                                    placeholder="Enter your product stock..."
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

export default ShopCreateProduct