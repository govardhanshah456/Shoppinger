import React, { useState } from 'react'
import styles from '../Styles/styles'
import { server } from '../server'
// import user from '../../../../Backend/model/user'
import { useDispatch, useSelector } from 'react-redux'
import Header from './Header'
import Footer from './Footer'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { addToOrder, resetOrder } from '../redux/actions/order'
const CheckOut = () => {
    const { user } = useSelector((state) => state.user)
    const [name, setName] = useState(user ? user.name : "")
    const [email, setEmail] = useState(user ? user.email : "")
    const [phoneNumber, setPhoneNumber] = useState(user ? user.phoneNumber : null)
    const [zipCode, setZipCode] = useState(null)
    const [country, setCountry] = useState(null)
    const [state, setState] = useState(null)
    const [city, setCity] = useState(null)
    const [address1, setAddress1] = useState(null)
    const [address2, setAddress2] = useState(null)
    const [couponCode, setCouponCode] = useState("");
    const [couponCodeData, setCouponCodeData] = useState(null);
    const [discountPrice, setDiscountPrice] = useState(null);
    const { cart } = useSelector((state) => state.cart)
    const subTotalPrice = cart.reduce(
        (acc, item) => acc + item.qty * item.discountedPrice,
        0
    );

    // this is shipping cost variable
    const shipping = subTotalPrice * 0.1;



    const handleSubmit = (e) => {
        e.preventDefault()
        const name = couponCode
        axios.get(`${server}/couponCode/get-coupon-value/${name}`)
            .then((res) => {
                if (!res.data.couponCodee) {
                    toast.error("No Such Coupon Code Exists!")
                } else {
                    const coupon = res.data.couponCodee
                    const minVal = coupon.minAmount
                    const maxVal = coupon.maxAmount
                    const selectedProducts = coupon.selectedProduct
                    if (minVal !== null && maxVal !== null && subTotalPrice < minVal || subTotalPrice > maxVal) {
                        toast.error("Coupon Code is available only for Price Range Between" + "[" + minVal + "," + maxVal + "]");
                    }
                    else if (minVal !== null && subTotalPrice < minVal) {
                        toast.error("Coupon Code is available only for Price Range Starting From" + "[" + minVal + "]");
                    }
                    else if (maxVal !== null && subTotalPrice > maxVal) {
                        toast.error("Coupon Code is available only for Price Range Ending At" + "[" + maxVal + "]");
                    }
                    else {
                        var discountPrice1 = 0.0
                        cart.forEach((i) => {
                            if (selectedProducts.includes(i._id))
                                discountPrice1 += i.discountedPrice * (coupon.value / 100)
                        })
                        setDiscountPrice(discountPrice1)
                        setCouponCodeData(coupon)
                    }
                }
            })
    }
    const discountPercentenge = couponCodeData ? discountPrice : "";
    // var discountPrice1 = 0.0
    const totalPrice = couponCodeData
        ? (subTotalPrice + shipping - discountPercentenge).toFixed(2)
        : (subTotalPrice + shipping).toFixed(2);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const paymentSubmit = (e) => {
        e.preventDefault()
        if (!address1 || !address2 || !city || !state || !country || !zipCode) {
            toast.error("All fields requires")
            return
        }
        const shippingAddress = {
            country, state, city, zipCode, address1, address2,
        }
        const orderData = {
            cart, user, shippingAddress, subTotalPrice, totalPrice, shipping, discountPrice,
        }
        // localStorage.setItem("latestOrder", JSON.stringify(orderData));
        dispatch(resetOrder())
        dispatch(addToOrder(orderData))
        navigate("/payment")
    }
    return (
        <>
            <Header />
            <br />
            <CheckoutSteps active={1} />
            <br />
            <br />
            <div className="w-full flex flex-col items-center py-8">
                <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
                    <div className="w-full 800px:w-[65%]">
                        <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
                            <div className='w-full px-5'>
                                {/* <form onSubmit={handleSubmit} aria-required={true}> */}
                                <div className='w-full flex  pb-3'>
                                    <div className='w-[50%]'>
                                        <label className='block pb-2'>Full Name</label>
                                        <input type='text' className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className='w-[50%]'>
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
                                        <label className='block pb-2'>ZipCode</label>
                                        <input type='number' className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                                    </div>
                                </div>
                                <div className='w-full 800px:flex block pb-3'>
                                    <div className='w-[100%] 800px:w-[50%]'>
                                        <label className='block pb-2'>Country</label>
                                        <input type='text' className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required value={country} onChange={(e) => setCountry(e.target.value)} />
                                    </div>
                                    <div className='w-[100%] 800px:w-[50%]'>
                                        <label className='block pb-2'>State</label>
                                        <input type='text' className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required value={state} onChange={(e) => setState(e.target.value)} />
                                    </div>
                                </div>
                                <div className='w-full 800px:flex block pb-3'>
                                    <div className='w-[100%] 800px:w-[50%]'>
                                        <label className='block pb-2'>City</label>
                                        <input type='text' className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required value={city} onChange={(e) => setCity(e.target.value)} />
                                    </div>
                                    <div className='w-[100%] 800px:w-[50%]'>
                                        <label className='block pb-2'>Address1</label>
                                        <input type='text' className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required value={address1} onChange={(e) => setAddress1(e.target.value)} />
                                    </div>
                                </div>
                                <div className='w-full 800px:flex block pb-3'>
                                    <div className='w-[100%] 800px:w-[50%]'>
                                        <label className='block pb-2'>Address2</label>
                                        <input type='text' className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required value={address2} onChange={(e) => setAddress2(e.target.value)} />
                                    </div>
                                </div>
                                {
                                    user && user.addresses.length > 0 &&
                                    <>
                                        <div className='w-full 800px:flex block pb-3'>
                                            <div className='w-[100%] 800px:w-[50%]'>
                                                <label className='block pb-2'>Select Address From Above</label>
                                                {user &&
                                                    user.addresses.map((item, index) => (
                                                        <div className="w-full flex mt-1">
                                                            <input
                                                                type="checkbox"
                                                                className="mr-3"
                                                                value={item.addressType}
                                                                onClick={() =>
                                                                    setAddress1(item.address1) ||
                                                                    setAddress2(item.address2) ||
                                                                    setZipCode(item.zipCode) ||
                                                                    setCountry(item.country) ||
                                                                    setCity(item.city) || setState(item.state)
                                                                }
                                                            />
                                                            <h2>{item.addressType}</h2>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>

                        </div>
                    </div>
                    <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
                        <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
                            <div className="flex justify-between">
                                <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
                                <h5 className="text-[18px] font-[600]">${subTotalPrice}</h5>
                            </div>
                            <br />
                            <div className="flex justify-between">
                                <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
                                <h5 className="text-[18px] font-[600]">${shipping.toFixed(2)}</h5>
                            </div>
                            <br />
                            <div className="flex justify-between border-b pb-3">
                                <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
                                <h5 className="text-[18px] font-[600]">
                                    - {discountPercentenge ? "$" + discountPercentenge.toString() : null}
                                </h5>
                            </div>
                            <h5 className="text-[18px] font-[600] text-end pt-3">${totalPrice}</h5>
                            <br />
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    className={`${styles.input} h-[40px] pl-2`}
                                    placeholder="Coupoun code"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    required
                                />
                                <input
                                    className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`}
                                    required
                                    value="Apply code"
                                    type="submit"
                                />
                            </form>
                        </div>
                    </div>
                </div>
                <div
                    className={`${styles.button} w-[150px] 800px:w-[280px] mt-10`}
                    onClick={paymentSubmit}
                >
                    <h5 className="text-white">Go to Payment</h5>
                </div>
            </div>
            <br />
            <Footer />
        </>

    )
}
const CheckoutSteps = ({ active }) => {
    console.log(active);
    return (
        <div className='w-full flex justify-center'>
            <div className="w-[90%] 800px:w-[50%] flex items-center flex-wrap">
                <div className={`${styles.noramlFlex}`}>
                    <div className={`${styles.cart_button}`}>
                        <span className={`${styles.cart_button_text}`}>1.Shipping</span>
                    </div>
                    <div className={`${active > 1 ? "w-[30px] 800px:w-[70px] h-[4px] !bg-[#f63b60]"
                        : "w-[30px] 800px:w-[70px] h-[4px] !bg-[#FDE1E6]"
                        }`} />
                </div>

                <div className={`${styles.noramlFlex}`}>
                    <div className={`${active > 1 ? `${styles.cart_button}` : `${styles.cart_button} !bg-[#FDE1E6]`}`}>
                        <span className={`${active > 1 ? `${styles.cart_button_text}` : `${styles.cart_button_text} !text-[#f63b60]`}`}>
                            2.Payment
                        </span>
                    </div>
                </div>

                <div className={`${styles.noramlFlex}`}>
                    <div className={`${active > 3 ? "w-[30px] 800px:w-[70px] h-[4px] !bg-[#f63b60]"
                        : "w-[30px] 800px:w-[70px] h-[4px] !bg-[#FDE1E6]"
                        }`} />
                    <div className={`${active > 2 ? `${styles.cart_button}` : `${styles.cart_button} !bg-[#FDE1E6]`}`}>
                        <span className={`${active > 2 ? `${styles.cart_button_text}` : `${styles.cart_button_text} !text-[#f63b60]`}`}>
                            3.Success
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CheckOut 