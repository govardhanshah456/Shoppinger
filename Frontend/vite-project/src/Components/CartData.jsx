import React, { useEffect, useState } from 'react'
import { HiMinus, HiOutlineMinus, HiPlus } from 'react-icons/hi'
import { RxCross1 } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { addToCart, removeFromCart } from '../redux/actions/cart'
import { backend_url, server } from '../server'
import styles from '../Styles/styles'
import axios from 'axios'
const CartData = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
    const [val, setVal] = useState(data.qty)
    const totalPrice = data.discountedPrice * val;
    const dispatch = useDispatch()
    const { cart } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.user)

    const increment = (data) => {
        if (data.stock < val) {
            toast.error("Product stock limited!");
        } else {
            setVal(val + 1);
            const updateCartData = { ...data, qty: val + 1 };
            console.log(updateCartData)
            quantityChangeHandler(updateCartData)
        }
    }
    const decrement = (data) => {
        setVal(val === 1 ? 1 : val - 1);
        const updateCartData = { ...data, qty: val - 1 };
        quantityChangeHandler(updateCartData)
    }

    return (
        <div className="border-b p-4">
            <div className="w-full flex items-center">
                <div>
                    <div
                        className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
                        onClick={() => increment(data)}
                    >
                        <HiPlus size={18} color="#fff" />
                    </div>
                    <span className="pl-[10px]">{data.qty}</span>
                    <div
                        className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
                        onClick={() => decrement(data)}
                    >
                        <HiOutlineMinus size={16} color="#7d879c" />
                    </div>
                </div>
                <img
                    src={`${backend_url}${data?.images[0]}`}
                    alt=""
                    className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
                />
                <div className="pl-[5px]">
                    <h1>{data.name}</h1>
                    <h4 className="font-[400] text-[15px] text-[#00000082]">
                        ${data.discountedPrice} * {val}
                    </h4>
                    <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
                        US${totalPrice}
                    </h4>
                </div>
                <RxCross1
                    className="cursor-pointer"
                    onClick={() => removeFromCartHandler(data)}
                />
            </div>
        </div>
    )
}

export default CartData