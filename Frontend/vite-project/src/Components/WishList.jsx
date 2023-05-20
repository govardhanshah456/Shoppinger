import React from 'react'
import { RxCross1 } from 'react-icons/rx'
import styles from '../Styles/styles'
import { IoBagHandleOutline } from "react-icons/io5";
import { BsCartPlus } from "react-icons/bs"
import { useState } from 'react';
const WishList = ({ setOpenWishList }) => {
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
                        <RxCross1 size={25} className='cursor-pointer' onClick={() => setOpenWishList(false)} />
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
                                <CartSingle data={i} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
const CartSingle = ({ data }) => {
    const [value, setValue] = useState(1);
    const totalPrice = data.price * value;

    return (
        <div className="border-b p-4">
            <div className="w-full flex items-center">
                <RxCross1 className="cursor-pointer" />
                <img src="https://bonik-react.vercel.app/assets/images/products/Fashion/Clothes/1.SilverHighNeckSweater.png" alt=""
                    className="w-[80px] h-[80px] ml-2"
                />

                <div className="pl-[5px]">
                    <h1>{data.name}</h1>
                    <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
                        US${totalPrice}
                    </h4>
                </div>
                <div>
                    <BsCartPlus size={20} className="cursor-pointer" tile="Add to cart" />
                </div>
            </div>
        </div>
    );
};
export default WishList