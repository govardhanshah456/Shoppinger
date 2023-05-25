import React, { useState } from 'react'
import { useEffect } from 'react'
import { productData } from '../Static/data'
import Header from '../Components/Header'
import styles from '../Styles/styles'
import ProductCard from '../Components/ProductCard'
import { useSelector } from 'react-redux'
const BestSelling = () => {
    const [data, setData] = useState([])
    const { allProducts } = useSelector((state) => state.product)
    useEffect(() => {
        const d = allProducts
        setData(d)
    }, [allProducts])
    // console.log(allProduct)
    return (
        <>
            <Header activeHeading={2} />
            <br />
            <div className={`${styles.section}`}>
                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                    {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
                </div>
            </div>
        </>
    )
}

export default BestSelling