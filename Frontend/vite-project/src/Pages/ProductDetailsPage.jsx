import React, { useEffect } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import ProductDetails from "../Components/ProductDetails.jsx"
import { useState } from 'react'
import { productData } from '../Static/data'
import { useParams } from 'react-router-dom'
import SuggestedProduct from "../Components/SuggestedProduct.jsx"
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../redux/actions/product'
const ProductDetailsPage = () => {
    const { id } = useParams()
    const { allProducts } = useSelector((state) => state.product)
    const [data, setData] = useState(null)
    console.log(id)
    useEffect(
        () => {
            if (!data) {
                console.log("Inside");
                const dt = allProducts.find((i) => i._id === id);
                console.log(dt);
                setData(dt);
            }
        }, []);
    console.log(data)
    return (
        <div>
            <Header />
            <ProductDetails data={data} />
            {
                data && <SuggestedProduct data={data} />
            }
            <Footer />

        </div>
    )
}

export default ProductDetailsPage