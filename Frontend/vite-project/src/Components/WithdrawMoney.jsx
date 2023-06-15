import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { server } from '../server';
import styles from '../Styles/styles';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
const WithdrawMoney = () => {
    const { seller } = useSelector((state) => state.seller);
    const [deliveredOrder, setDeliveredOrder] = useState(null);

    useEffect(() => {
        const getBalance = async () => {
            await axios.get(`${server}/order/get-all-order-seller/${seller._id}`, { withCredentials: true }).then((res) => {
                console.log(res)
                setDeliveredOrder(res?.data?.orders)
            })
                .catch((err) => {
                    toast.error(err.response.data.message)
                })
        }
        getBalance()
    }, []);
    const orderData = deliveredOrder && deliveredOrder.filter((item) => item.status === "Delivered");
    const totalEarningWithoutTax = orderData && orderData.reduce((acc, item) => acc + item.totalPrice, 0);

    const serviceCharge = totalEarningWithoutTax * 0.1;
    const availableBalance = (totalEarningWithoutTax - serviceCharge).toFixed(2);
    console.log(deliveredOrder)

    return (
        <div className='w-full h-[90vh] p-8'>
            <div className="w-full bg-white h-full rounded flex items-center justify-center flex-col">
                <h5 className='text-[20px] pb-4'>Available Balance: ${availableBalance}</h5>
                <div className={`${styles.button} text-white !h-[42px] !rounded`}>
                    Withdraw
                </div>
            </div>
        </div>
    )
}

export default WithdrawMoney