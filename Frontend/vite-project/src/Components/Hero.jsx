import React from 'react'
import styles from '../Styles/styles'
import image from "../assets/landingpage.jpg"
import { Link } from 'react-router-dom'
const Hero = () => {
    return (
        <div className={`${styles.section} flex flex-row`}>
            <div className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.normalFlex}`} style={{
                backgroundImage: "url(https://img.freepik.com/free-vector/ecommerce-web-page-concept-illustration_114360-8204.jpg?w=1060&t=st=1683455484~exp=1683456084~hmac=d9486b8058b9905b6683fca16be1ac797966ffd96b9c2ca771ada99b9cbdf9ee)",
                backgroundSize: "cover", /* ensure the image covers the entire div */
                backgroundPosition: "center",
                float: "left", /* float the image div to the left */
                width: "50%",
            }}>
            </div>
            <div className={`${styles.section} w-90 800px:w-[60%] float-left`} style={{
                display: "flex", /* use flexbox to align the text div to the right */
                /* vertically center the text div */
                paddingLeft: "2%", /* add some spacing between the two divs */
                /* set the width of the text div to 50% */


            }}>
                <div className={`${styles.card} p-6 md:p-8`} style={{ /* add a card-like border around the text */
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",

                    /* set the width of the card to 100% of the parent div */
                }}>
                    <h1 className={`text-6xl md:text-6xl leading-tight md:leading-normal text-[#2ea5e1] font-bold text-center md:text-left mb-6`}>One Stop For <br /> All Your Needs.</h1>
                    <br />

                    <p className="text-xl font-[sans-serif] font-normal text-center md:text-left text-gray-800 leading-relaxed mb-6">
                        Find incredible bargains on all your favorite products at Shopinger! Our website offers a vast selection of items at cheap prices. Whether you're looking for clothing, electronics, or anything in between, we have it all. Visit our website today and start saving!
                    </p>
                    <br />
                    <Link to="/products" className="inline-block">
                        <div className={`${styles.button} text-center mt-5`} style={{
                            backgroundColor: '#000',
                            color: '#fff',
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '18px',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            transition: 'background-color 0.3s ease',
                            cursor: 'pointer',
                        }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = '#222';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = '#000';
                            }}>
                            <span className="font-medium text-lg">
                                Shop Now
                            </span>
                        </div>
                    </Link>
                </div>

                {/* <h1 className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#2ea5e1] font-[600] capitalize`}>One Stop For <br /> All Your Needs.</h1> */}
            </div>
        </div>
    )
}

export default Hero