import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetSingleData, UpdateInfo } from "../../../api";
import './EditInfo.css'

const EditInfo = () => {
    const [category, setCategory] = useState()
    const [type, setType] = useState()
    const [location, setLocation] = useState()
    const [price, setPrice] = useState()
    const [area, setArea] = useState()
    const [floor, setFloor] = useState()
    const [rooms, setRooms] = useState()
    const [furnishing, setFurnishing] = useState()
    const [titleEn, setTitleEn] = useState()
    const [titleAr, setTitleAr] = useState()
    const [detailsEn, setDetailsEn] = useState()
    const [detailsAr, setDetailsAr] = useState()
    const [rank, setRank] = useState()
    const [additional, setAdditional] = useState()
    const { id } = useParams()

    useEffect(() => {
        console.log('edit info id: ', id)
        GetSingleData(id).then((data) => {
            console.log(data)
            const targetData = data.data.singleData
            setCategory(targetData.category)
            setType(targetData.type)
            setLocation(targetData.location)
            setPrice(targetData.price)
            setArea(targetData.area)
            setFloor(targetData.floor)
            setRooms(targetData.rooms)
            setFurnishing(targetData.furnishing)
            setTitleEn(targetData.titleEn)
            setTitleAr(targetData.titleAr)
            setDetailsEn(targetData.detailsEn)
            setDetailsAr(targetData.detailsAr)
            setRank(targetData.rank)
            if (type === 'farm' || type === 'land') {
                setAdditional(false)
            } else {
                setAdditional(true)
            };
        }).catch((error) => {
            console.error(error)

        })
    }, [])

    const handleCategory = (event) => {
        const Category = event.target.value
        setCategory(category)
    }
    const handleType = (event) => {
        const Type = event.target.value
        setType(Type)
    }
    const handleLocation = (event) => {
        const Location = event.target.value
        setLocation(Location)
    }
    const handleArea = (event) => {
        const Area = event.target.value
        setArea(Area)
    }
    const handlePrice = (event) => {
        const Price = event.target.value
        setPrice(Price)
    }
    const handleFloor = (event) => {
        const Floor = event.target.value
        setFloor(Floor)
    }
    const handleRooms = (event) => {
        const Rooms = event.target.value
        setRooms(Rooms)
    }
    const handleFurnishing = (event) => {
        const Furnishing = event.target.value
        setFurnishing(Furnishing)
    }
    const handleEnTitle = (event) => {
        const TitleEn = event.target.value
        setTitleEn(TitleEn)
    }
    const handleArTitle = (event) => {
        const TitleAr = event.target.value
        setTitleAr(TitleAr)
    }
    const handleEnDetails = (event) => {
        const DetailsEn = event.target.value
        setDetailsEn(DetailsEn)
    }
    const handleArDetails = (event) => {
        const DetailsAr = event.target.value
        setDetailsAr(DetailsAr)
    }
    const handleRank = (event) => {
        const Rank = event.target.value
        setRank(Rank)
    }

    const handleSaveInfo = async () => {
        try{
            const data = {category, type, location, price, area, rooms, furnishing, floor, titleAr, titleEn, detailsEn, detailsAr, rank}
            const update = await UpdateInfo(data, id)
            console.log(update)
        } catch(error) {
            console.log(error)
        }
    }
    return (
        <div className="edit-info-container">
            <span className="span-edit-info">edit info</span>
            <div className="edit-div">
                <span className="edit-info-span">category</span>
                <select className="edit-info-select" onChange={handleCategory}>
                    <option className="option" value={category}>current category:{category}</option>
                    <option className="option" value='sale'>Sale</option>
                    <option className="option" value='rent'>Rent</option>
                    <option className="option" value='commercial'>Commercial</option>
                </select>
            </div>
            <div className="edit-div">
                <span className="edit-info-span">type</span>
                <select className="edit-info-select" onChange={handleType}>
                    <option className="option" value={type}>current type:{type}</option>
                    <option className="option" value="apartment">Apartment</option>
                    <option className="option" value="villa">Villa</option>
                    <option className="option" value="studio">Studio</option>
                    <option className="option" value="building">Building</option>
                    <option className="option" value="farm">Farm</option>
                    <option className="option" value="land">Land</option>
                </select>
            </div>
            <div className="edit-div">
                <span className="edit-info-span">location</span>
                <select className="edit-info-select" onChange={handleLocation}>
                    <option className="option" value={location}>current location:{location}</option>
                    <option className="option" value="abdoun">Abdoun</option>
                    <option className="option" value="alabdali">Al abdali</option>
                    <option className="option" value="7thcircle">7th Circle</option>
                    <option className="option" value="others">others</option>
                </select>
            </div>
            <div className="edit-div">
                <span className="edit-info-span">area: {area}</span>
                <input type="number" className="edit-infp-input" value={area? area :''} onChange={handleArea} />
            </div>
            <div className="edit-div">
                <span className="edit-info-span">price: {price}</span>
                <input type="number" className="edit-infp-input" value={price? price : ''} onChange={handlePrice} />
            </div>
            {additional &&
                <>
                    <div className="edit-div">
                        <span className="edit-info-span">floor</span>
                        <select className="edit-info-select" onChange={handleFloor}>
                            <option className="option" value={floor}>current floor: {floor}</option>
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
                    <div className="edit-div">
                        <span className="edit-info-span">rooms</span>
                        <select className="edit-info-select" onChange={handleRooms}>
                            <option className="option" value={furnishing}>current rooms: {rooms}</option>
                            <option className="option" value="0">0</option>
                            <option className="option" value="1">1</option>
                            <option className="option" value="2">2</option>
                            <option className="option" value="3">3</option>
                            <option className="option" value="4">4</option>
                            <option className="option" value="5">5</option>
                            <option className="option" value="6">+6</option>
                        </select>
                    </div>
                    <div className="edit-div">
                        <span className="edit-info-span">rooms</span>
                        <select className="edit-info-select" onChange={handleFurnishing}>
                            <option className="option" value={furnishing}>current: {furnishing}</option>
                            <option className="option" value="furnished">Furnished</option>
                            <option className="option" value="unfurnished">Unfurnished</option>
                        </select>
                    </div>
                </>
            }
            <div className="edit-div">
                <span className="edit-info-span">title English:</span>
                <textarea className="text-area" maxLength={60} onChange={handleEnTitle} value={titleEn} />
            </div>
            <div className="edit-div">
                <span className="edit-info-span">title Arabic:</span>
                <textarea className="text-area" maxLength={60} onChange={handleArTitle} value={titleAr} />
            </div>
            <div className="edit-div">
                <span className="edit-info-span">details English:</span>
                <textarea className="text-area" maxLength={60} onChange={handleEnDetails} value={detailsEn} />
            </div>
            <div className="edit-div">
                <span className="edit-info-span">details Arabic:</span>
                <textarea className="text-area" maxLength={60} onChange={handleArDetails} value={detailsAr} />
            </div>
            <div className="edit-div">
                <span className="edit-info-span">rank:</span>
                <select id="select-rank" className="edit-info-select" value={rank} onChange={handleRank}>
                    <option className="option" value={rank}>current rank: {rank}</option>
                    <option className="option" value={0}>0</option>
                    <option className="option" value={1}>1</option>
                    <option className="option" value={2}>2</option>
                </select>
            </div>
            <button className="edit-info-save" onClick={handleSaveInfo}>Save Changes</button>
        </div>
    )
}

export default EditInfo