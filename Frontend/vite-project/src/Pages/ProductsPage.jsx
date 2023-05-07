import React, { useEffect } from 'react'
import Header from '../Components/Header'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { productData } from '../Static/data'
import styles from '../Styles/styles'
import ProductCard from '../Components/ProductCard'
const ProductsPage = () => {
    const [search] = useSearchParams()
    const category = search.get("category")
    const [data, setData] = useState([]);
    useEffect(() => {
        if (category === null) {
            const d =
                productData;
            setData(d);
        } else {
            const d =
                productData && productData.filter((i) => i.category === category);
            setData(d);
        }
        //    window.scrollTo(0,0);
    }, []);

    return (
        <>
            <Header activeHeading={3} />
            <br />
            <div className={`${styles.section}`}>
                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                    {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
                </div>
            </div>
        </>
    )
}

export default ProductsPage