import React, { useEffect, useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import './ResultCard.css'
import { useNavigate } from "react-router-dom";
// import { GetSingleData } from "../../api";
import { useTranslation } from "react-i18next";

const ResultCard = ({ data }) => {
    const [t, i18] = useTranslation()
    const [cardTitle, setCardTitle] = useState()
    const [cardDetails, setCardDetails] = useState()
    const [cardPhotos, setCardPhotos] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (data) {
            console.log(i18.language)
            if (i18.language === 'ar') {
                setCardTitle(data.titleAr)
                const details = data.detailsAr.length > 70 ? `${data.detailsAr.slice(0, 70)}...` : data.detailsAr
                setCardDetails(details)
            } else {
                setCardTitle(data.titleEn)
                const details = data.detailsEn.length > 70 ? `${data.detailsEn.slice(0, 70)}...` : data.detailsEn
                setCardDetails(details)
            }
            if(data.photoLinks !== 0) {
                setCardPhotos(data.photoLinks)
            }else {
                setCardPhotos('/images/Logo.jpeg')
            }
            console.log(cardPhotos)
        }
    }, [data, t, i18.changeLanguage])

    const handleGoToDetailsPage = () => {
        navigate(`/details/${data._id}`)
    }

    return (
        <div className="card-div">
            <div className="card-img">
                <Carousel slide={false} className="carousel-card-img">
                    {cardPhotos?.map((photo, idx) => (
                        <Carousel.Item className="carousel-item-img" key={idx}>
                        <img alt={idx}
                            src={photo}
                            className="result-images" />
                    </Carousel.Item>
                    ))}
                    
                    {/* <Carousel.Item>
                        <img alt=""
                            src="https://res.cloudinary.com/apartmentlist/image/upload/c_fill,dpr_auto,f_auto,g_center,h_415,q_auto,w_640/c7c927008e8aa7a705891483787b8cc3.jpg"
                            className="result-images" />

                    </Carousel.Item>
                    <Carousel.Item>
                        <img alt=""
                            src="https://q-xx.bstatic.com/xdata/images/hotel/max500/391221300.jpg?k=c18061e55bb200048e5420d8bb815a16a44ff5912b5e26d20fd4f5509daf7b2c&o="
                            className="result-images" />
                    </Carousel.Item> */}
                </Carousel>
            </div>
            <div className="card-info">
                <div className="estate-title">
                    <span className="estate-title-span">{cardTitle}</span>
                    {/* <span className="estate-title-span">{data.price}</span> */}
                </div>
                <hr className="info-hr" />
                <div className="info-spans">
                    <span className="first-span">Location:</span>
                    <span className="second-span">{data.location}</span>
                </div>
                <div className="info-spans">
                    <span className="first-span">Area:</span>
                    <span className="second-span">{data.area} SQM</span>
                </div>
                <div className="summary-title">
                    <span className="summary-title-span">{cardDetails}</span>
                </div>
                <div className="price-details">
                    <span className="price-span">{data.price} Jod</span>
                    <button className="more-details" onClick={handleGoToDetailsPage}>More details &gt;&gt;</button>
                </div>
            </div>
        </div>
    )
}

export default ResultCard