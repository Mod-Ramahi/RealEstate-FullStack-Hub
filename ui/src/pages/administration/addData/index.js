import React, { useState } from "react";
import './AddData.css'
import { AddRealEstate } from "../../../api";
import NotificationBox from "../../../components/notificationBox/NotificationBox";

const AddData = () => {
    const [category, setCategory] = useState('')
    const [type, setType] = useState('')
    const [additional, setAdditional] = useState(true);
    const [location, setLocation] = useState('')
    const [area, setArea] = useState(0)
    const [price, setPrice] = useState(0)
    const [floor, setFloor] = useState(0)
    const [rooms, setRooms] = useState(1)
    const [furnishing, setFurnishing] = useState('')
    const [titleEn, setTitleEn] = useState('')
    const [titleAr, setTitleAr] = useState('')
    const [detailsEn, setDetailsEn] = useState('')
    const [detailsAr, setDetailsAr] = useState('')
    const [rank, setRank] = useState(1)
    const [notificationBox, setNotificationBox] = useState(false)
    const [notificationMessage, setNotificationMessage] = useState('')

    const handleCloseNotification = () => {
        setNotificationBox(false)
    }

    const handleCategory = (event) => {
        const Category = event.target.value;
        setCategory(Category);
    }
    const handleType = (event) => {
        const Type = event.target.value;

        if (Type === 'farm' || Type === 'land') {
            setAdditional(false)
        } else {
            setAdditional(true)
        };

        setType(Type);
    }
    const handleLocation = (event) => {
        const Location = event.target.value;
        setLocation(Location);
    }
    const handleArea = (event) => {
        const Area = event.target.value;
        setArea(Area)
    }
    const handlePrice = (event) => {
        const Price = event.target.value;
        setPrice(Price)
    }
    const handleFloor = (event) => {
        const Floor = event.target.value;
        setFloor(Floor)
    }
    const handleRooms = (event) => {
        const Rooms = event.target.value;
        setRooms(Rooms)
    }
    const handleFurnishing = (event) => {
        const Furnishing = event.target.value;
        setFurnishing(Furnishing)
    }
    const handleEnTitle = (event) => {
        const TitleEn = event.target.value;
        setTitleEn(TitleEn)
    }
    const handleArTitle = (event) => {
        const TitleAr = event.target.value;
        setTitleAr(TitleAr)
    }
    const handleEnDetails = (event) => {
        const DetailsEn = event.target.value;
        setDetailsEn(DetailsEn)
    }
    const handleArDetails = (event) => {
        const DetailsAr = event.target.value;
        setDetailsAr(DetailsAr)
    }
    const handleRank = (event) => {
        const Rank = event.target.value;
        setRank(Rank)
    }
    const handleSubmit = async () => {
        try {
            const data = {
                category,
                type,
                location,
                area,
                price,
                floor,
                rooms,
                furnishing,
                titleAr,
                titleEn,
                detailsAr,
                detailsEn,
                rank
            }
            const RealEstate = await AddRealEstate(data);
            if (RealEstate.status === 201) {
                console.log('RealEstate: ', RealEstate)
                setNotificationBox(true)
                setNotificationMessage('new data successfully added')
            }
            else {
                console.log('response realEstate: ', RealEstate)
                setNotificationBox(true)
                setNotificationMessage('error, cannot add new data')
            }
        } catch (error) {
            console.error('error', error)
            setNotificationBox(true)
            setNotificationMessage('error, something went wrong')
        }
        console.log('ok')
    }
    return (
        <div className="add-container">
            {notificationBox && <NotificationBox message={notificationMessage} closeBox={handleCloseNotification} />}
            <div className="add-form">
                {/* <div className="add-photos">
                    <form className="image-form" onSubmit={handleSubmit}>
                        <span>add photos related</span>
                        <input type="file" name="image" accept="/image/*" />
                        <button type="submit">Add image</button>
                    </form>
                    <div className="uploaded-photos">

                    </div>
                </div>
                <hr /> */}
                <div className="add-info">
                    <span className="other-span">Main info</span>
                    <div className="section">
                        <span className="head-span">Select category</span>
                        <select id="select-category" className="select" onChange={handleCategory}>
                            <option className="option" value="">Select</option>
                            <option className="option" value="sale">Sale</option>
                            <option className="option" value="rent">Rent</option>
                            <option className="option" value="commercial">Commercial</option>
                        </select>
                    </div>
                    <div className="section">
                        <span className="head-span">Select type: </span>
                        <select id="select-type" className="select" onChange={handleType}>
                            <option className="option" value="">Select</option>
                            <option className="option" value="apartment">Apartment</option>
                            <option className="option" value="villa">Villa</option>
                            <option className="option" value="studio">Studio</option>
                            <option className="option" value="building">Building</option>
                            <option className="option" value="farm">Farm</option>
                            <option className="option" value="land">Land</option>
                        </select>
                    </div>
                    <div className="section">
                        <span className="head-span">Select location: </span>
                        <select id="select-location" className="select" onChange={handleLocation}>
                            <option className="option" value="">Select</option>
                            <option className="option" value="abdoun">Abdoun</option>
                            <option className="option" value="alabdali">Al abdali</option>
                            <option className="option" value="7thcircle">7th Circle</option>
                            <option className="option" value="others">others</option>
                        </select>
                    </div>
                    <div className="section">
                        <span className="head-span">Enter Area: </span>
                        <input type="number" className="select-input" onChange={handleArea} />
                    </div>
                    <div className="section">
                        <span className="head-span">Enter price: </span>
                        <input type="number" className="select-input" onChange={handlePrice} />
                    </div>
                    <hr className="section-hr" />
                    {
                        additional &&
                        <div className="additional-section">
                            <span className="other-span">Other info</span>
                            <div className="section">
                                <span className="head-span">Select floor</span>
                                <select id="select-floor" className="select" onChange={handleFloor}>
                                    <option className="option" value="">Select</option>
                                    <option className="option" value="-2">-2</option>
                                    <option className="option" value="-1">-1</option>
                                    <option className="option" value="0">0</option>
                                    <option className="option" value="1">1</option>
                                    <option className="option" value="2">2</option>
                                    <option className="option" value="3">3</option>
                                    <option className="option" value="4">+4</option>
                                    <option className="option" value="6">roof</option>
                                </select>
                            </div>
                            <div className="section">
                                <span className="head-span">Select rooms</span>
                                <select id="select-rooms" className="select" onChange={handleRooms}>
                                    <option className="option" value="">Select</option>
                                    <option className="option" value="0">0</option>
                                    <option className="option" value="1">1</option>
                                    <option className="option" value="2">2</option>
                                    <option className="option" value="3">3</option>
                                    <option className="option" value="4">4</option>
                                    <option className="option" value="5">5</option>
                                    <option className="option" value="6">+6</option>
                                </select>
                            </div>
                            <div className="section">
                                <span className="head-span">Furnishing type</span>
                                <select id="select-furnishing" className="select" onChange={handleFurnishing}>
                                    <option className="option" value="">Select</option>
                                    <option className="option" value="furnished">Furnished</option>
                                    <option className="option" value="unfurnished">Unfurnished</option>
                                </select>
                            </div>
                            <hr />
                        </div>
                    }

                </div>
                <div className="add-details">
                    <span className="other-span">More Details</span>
                    <span className="head-span bold-span">Title in English and Arabic:</span>
                    <div className="section">
                        <span className="head-span">Title EN:</span>
                        <textarea className="text-area" maxLength={60} onChange={handleEnTitle} placeholder="Title in English. max length = 60 character" />
                    </div>
                    <div className="section">
                        <span className="head-span">Title عر:</span>
                        <textarea className="text-area" maxLength={60} onChange={handleArTitle} placeholder="العنوان باللغة العربية وبحد اقصى = 60 حرف" />
                    </div>
                    <span className="other-span">Details in English and Arabic</span>
                    <div className="section">
                        <span>Details EN:</span>
                        <textarea className="text-area" onChange={handleEnDetails} placeholder="Details in english..." />
                    </div>
                    <div className="section">
                        <span>Details عر:</span>
                        <textarea className="text-area" onChange={handleArDetails} placeholder="التفاصيل بالعربية..." />
                    </div>
                </div>
                <div className="rank">
                    <span className="other-span">
                        Choose the rank to determine the priority of appearance in search results, ranging from 0 (maximum priority) to 2 (lowest priority).
                    </span>
                    <select id="select-rank" className="select" onChange={handleRank}>
                        <option className="option" value={0}>0</option>
                        <option className="option" value={1}>1</option>
                        <option className="option" value={2}>2</option>
                    </select>
                </div>
                <hr />
                <button className="save-btn" onClick={handleSubmit}>Save and add photos</button>
            </div>
        </div>
    )
}

export default AddData