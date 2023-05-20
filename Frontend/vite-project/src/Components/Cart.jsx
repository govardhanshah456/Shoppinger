import React from 'react'
import { RxCross1 } from 'react-icons/rx'
import styles from '../Styles/styles'
import { IoBagHandleOutline } from "react-icons/io5";
import CartData from './CartData';
import { Link } from 'react-router-dom';
const Cart = ({ setOpenCart }) => {
    const cartData = [
        {
            name: "IPhone 14 pro max 256 GB SSD and 8 GB RAM silver color",
            description: "shuifbiefnwonvgnbojgn;ksvm;kvn sjgbn ;kwvm w;k",
            price: 999,
        },
        {
            name: "IPhone 14 pro max 256 GB SSD and 8 GB RAM silver color",
            description: "shuifbiefnwonvgnbojgn;ksvm;kvn sjgbn ;kwvm w;k",
            price: 999,
        },
        {
            name: "IPhone 14 pro max 256 GB SSD and 8 GB RAM silver color",
            description: "shuifbiefnwonvgnbojgn;ksvm;kvn sjgbn ;kwvm w;k",
            price: 999,
        },
    ]
    return (
        <div className='fixed top-0 left-0 w-full bg-[#000] h-screen z-10'>
            <div className='fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm'>
                <div>
                    <div className="flex w-full justify-end pt-5 pr-5">
                        <RxCross1 size={25} className='cursor-pointer' onClick={() => setOpenCart(false)} />
                    </div>
                    <div className={`${styles.normalFlex} p-4`}>
                        <IoBagHandleOutline size={25} />
                        <h5 className='pl-2 text-[20px] font-[500]'>
                            x items
                        </h5>
                    </div>
                    <br />
                    <div className='w-full border-t'>
                        {
                            cartData && cartData.map((i, index) => (
                                <CartData data={i} />
                            ))
                        }
                    </div>
                </div>
                <div className='px-5 mb-3'>
                    <Link to="/checkout">
                        <div className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}>
                            <h1 className="text-[#fff] text-[18px] font-[600]">Checkout Now (USD$1080)</h1>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Cart