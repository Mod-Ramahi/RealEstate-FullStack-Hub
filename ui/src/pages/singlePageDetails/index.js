import React, { useEffect, useState } from "react";
import './SinglePageDetails.css'
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { GetSingleData } from "../../api";
const SinglePageDetails = () => {
    const [t, i18] = useTranslation()
    const [detailsData, setDetailsData] = useState()
    const [currentImage, setCurrentImage] = useState()
    const [title, setTitle] = useState()
    const [details, setDetails] = useState()
    const [photos, setPhotos] = useState([])
    const { id } = useParams()

    useEffect(() => {

        GetSingleData(id).then((data) => {
            console.log(data)
            setDetailsData(data.data.singleData)
            if (i18.language === 'ar') {
                setTitle(data.data.singleData.titleAr)
                setDetails(data.data.singleData.detailsAr)
            } else {
                setTitle(data.data.singleData.titleEn)
                setDetails(data.data.singleData.detailsEn)
            }
            if (data.data.singleData.photoLinks.length !== 0) {
                setPhotos(data.data.singleData.photoLinks)
            } else {
                setPhotos('/images/Logo.jpeg')
            }
            setCurrentImage(0)
        }).catch((error) => {
            console.error(error)
        })

    }, [id])

    const handleNextImg = () => {
        setCurrentImage((prevImage) => (prevImage + 1) % photos?.length)
    }
    const handlePreviousImg = () => {
        setCurrentImage((prevImage) => (prevImage - 1 + photos?.length) % photos?.length)
    }
    return (
        <div className='details-page'>
            <div className="title">
                <span className="title-span">{title}</span>
            </div>
            <div className="upper-section">
                <div className="left-section">
                    <span className="main-info-span">{t('locationMenu')} : In{detailsData?.location}</span>
                    <span className="main-info-span">{i18.language==='ar'? 'المساحة' : 'Area'} : {detailsData?.area}</span>
                    <span className="main-info-span">{t('floorMenu')} : {detailsData?.floor}</span>
                    <span className="main-info-span">{i18.language === 'ar'? "الغرف" : "rooms"} : {detailsData?.rooms}</span>
                </div>
                <div className="right-section">
                    <div className="photos">
                        <span className="next-img" onClick={handlePreviousImg}>{`<`}</span>
                        <img className="main-image" src={photos[currentImage]} />
                        <span className="next-img" onClick={handleNextImg}>{`>`}</span>
                    </div>

                </div>

            </div>
            <div className="all-photos-div">
                {
                    photos?.map((photo, idx) => (
                        <div className={idx === currentImage ? "all-photos border-img" : "all-photos"} key={idx}>
                            <img className="all-imgs" src={photo} key={idx} />
                        </div>))
                }
            </div>
            <hr />
            <div className="lower-section">
                <span className="detailed-info-span">{details}</span>
            </div>
            <hr />
        </div>
    )
}

export default SinglePageDetails