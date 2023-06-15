import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import styles from '../Styles/styles'
import { useLocation } from 'react-router-dom'
import { server } from '../server'
import { useDispatch, useSelector } from 'react-redux'
import { resetCart } from '../redux/actions/cart'
import axios from 'axios'
import { addToOrder, resetOrder } from '../redux/actions/order'
import { toast } from "react-toastify"
const Payment = () => {
    // const [orderData, setOrderData] = useState([])
    const dispatch = useDispatch()
    const { Order } = useSelector((state) => state.order)
    let [orderData, setOrderData] = useState(Order[0])
    console.log(orderData)
    const { cart } = useSelector((state) => state.cart)
    useEffect(() => {
        if (orderData) {
            dispatch(resetOrder())
            let temp = { ...Order[0] };
            temp.cart = cart;
            console.log(temp)
            setOrderData(temp);
            dispatch(addToOrder(temp))
        }

    }, [cart])
    const cashOnDelieveryHandler = (e) => {
        e.preventDefault()
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        orderData = { ...orderData, type: "Cash On Delivery", }

        console.log(orderData)
        axios.post(`${server}/order/create-order`, orderData, config).then((res) => {
            toast.success("order created successfully")
            dispatch(resetCart())
        })
    }
    return (
        <>
            <Header />
            <br />
            <CheckoutSteps active={2} />
            <br />
            <div className='w-full flex flex-col items-center py-8'>
                <div className='w-[90%] 1000px:w-[70%] block 800px:flex'>
                    <div className='w-full 800px:w-[65%]'>
                        <PaymentInfo cashOnDelieveryHandler={cashOnDelieveryHandler} />
                    </div>
                    <div className='w-full 800px:w-[65%]'>
                        {/* <CartData orderData={orderData} /> */}
                    </div>
                </div>
            </div>
            <br />
            <Footer />
        </>
    )
}
const PaymentInfo = ({ cashOnDelieveryHandler }) => {
    const [select, setSelect] = useState(1)
    return (
        <div>
            <div className="flex w-full pb-5 border-b mb-2">
                <div
                    className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
                    onClick={() => setSelect(3)}
                >
                    {select === 3 ? (
                        <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
                    ) : null}
                </div>
                <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
                    Cash on Delivery
                </h4>
            </div>

            {/* cash on delivery */}
            {select === 3 ? (
                <div className="w-full flex">
                    <form className="w-full" onSubmit={cashOnDelieveryHandler}>
                        <input
                            type="submit"
                            value="Confirm"
                            className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
                        />
                    </form>
                </div>
            ) : null}
        </div>
    )
}
const CartData = ({ orderData }) => {
    const shipping = orderData?.shipping?.toFixed(2);
    return (
        <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
            <div className="flex justify-between">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
                <h5 className="text-[18px] font-[600]">${orderData?.subTotalPrice}</h5>
            </div>
            <br />
            <div className="flex justify-between">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
                <h5 className="text-[18px] font-[600]">${shipping}</h5>
            </div>
            <br />
            <div className="flex justify-between border-b pb-3">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
                <h5 className="text-[18px] font-[600]">{orderData?.discountPrice ? "$" + orderData.discountPrice : "-"}</h5>
            </div>
            <h5 className="text-[18px] font-[600] text-end pt-3">
                ${orderData?.totalPrice}
            </h5>
            <br />
        </div>
    );
};
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
export default Payment