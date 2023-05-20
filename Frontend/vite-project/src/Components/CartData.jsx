import React, { useState } from 'react'
import { HiMinus, HiPlus } from 'react-icons/hi'
import { RxCross1 } from 'react-icons/rx'
const CartData = ({ data }) => {
    const [val, setVal] = useState(1)
    const price = data.price * val
    return (
        <div className='border-b p-4'>
            <div className='w-full flex items-center'>
                <div>
                    <div className='bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer' onClick={() => setVal(val + 1)}>
                        <HiPlus size={18} color="#fff" />
                    </div>
                    <span className='pl-[10px]'>
                        {val}
                    </span>
                    <div className='bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer' onClick={() => (val > 1 ? setVal(val - 1) : null)}>
                        <HiMinus size={18} color="#fff" />
                    </div>
                </div>
                <img src="https://bonik-react.vercel.app/assets/images/products/Fashion/Clothes/1.SilverHighNeckSweater.png" alt=""
                    className="w-[80px] h-[80px] ml-2"
                />
                <div className="pl-[5px]">
                    <h1>{data.name}</h1>
                    <h4 className="font-[400] text-[15px] text-[#00000082]">${data.price} * {val}</h4>
                    <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
                        US${price}
                    </h4>
                </div>
                <RxCross1 className="cursor-pointer" />
            </div>
        </div>
    )
}

export default CartData