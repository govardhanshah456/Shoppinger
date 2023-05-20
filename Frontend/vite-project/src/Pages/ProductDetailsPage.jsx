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
    const { name } = useParams()
    const { allProducts } = useSelector((state) => state.product)
    const [data, setData] = useState(null)
    const productName = name.replace(/-/g, " ")
    const dispatch = useDispatch()
    console.log(productName)
    useEffect(() => {
        dispatch(getAllProducts())

    }, [])
    useEffect(() => {
        const dt = allProducts && allProducts.find((i) => i.name === productName)
        console.log(dt)
        setData(dt)
    })

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