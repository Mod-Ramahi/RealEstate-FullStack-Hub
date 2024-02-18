import React, { useState, useEffect } from "react";
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import ResultCard from "../resultCard/ResultCard";
import './Search.css';
import { useTranslation } from "react-i18next";
import { UiGetData, test } from "../../api";
import { useNavigate } from "react-router-dom";

const SearchArea = () => {
    const [t, i18] = useTranslation()
    const [activeOption, setActiveOption] = useState('link-1')
    const [secondFilter, setSecondFilter] = useState(true)
    const [category, setCategory] = useState('sale')
    const [location, setLocation] = useState()
    const [type, setType] = useState()
    const [area, setArea] = useState()
    const [price, setPrice] = useState()
    const [floor, setFloor] = useState()
    const [rooms, setRooms] = useState()
    const [furnishing, setFurnishing] = useState()
    const [nextButton, setNextButton] = useState(true)
    const [previousButton, setPreviousButton] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [noData, setNoData] = useState(false)
    const [searchedData, setSearchedData] = useState([])
    const [waitData, setWaitData] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        if (currentPage === 1) {
            setPreviousButton(false)
        }
        const data = { category, location, type, area, price, floor, rooms, furnishing, currentPage }
        UiGetData(data).then((uiData) => {
            console.log('1')
            const recievedData = uiData.data
            setSearchedData(recievedData)
            setWaitData(false);
            console.log('2')
            console.log('recieved:', recievedData)
            if (recievedData.length === 0) {
                setNextButton(false)
                if (currentPage > 1) {
                    setCurrentPage(--currentPage)
                } else {
                    setNoData(true)
                }
            } else {
                setNoData(false)
            }
        }).catch((error) => {
            console.error(error)
        })
    }, [category, location, type, area, price, floor, rooms, furnishing, currentPage, waitData])

    const handleLinkClick = (eventKey) => {
        setActiveOption(eventKey)
        if (eventKey === 'link-1') {
            setCategory('sale')
        } else if (eventKey === 'link-2') {
            setCategory('rent')
        } else {
            setCategory('commercial')
        }
    }
    const handleTypeChange = (eventKey) => {
        console.log(eventKey)
        setType(eventKey)
        if (eventKey === 'Lands' || eventKey === 'Farms' || eventKey === 'مزارع' || eventKey === 'اراضي') {
            setSecondFilter(false)
        } else {
            setSecondFilter(true)
        }
    }
    const handleLocationChange = (eventKey) => {
        setLocation(eventKey)
    }
    const handleAreaChange = (eventKey) => {
        setArea(eventKey)
    }
    const handlePriceChange = (eventKey) => {
        setPrice(eventKey)
    }
    const handleFloorChange = (eventKey) => {
        setFloor(eventKey)
    }
    const handleRoomsChange = (eventKey) => {
        setRooms(eventKey)
    }
    const handleFurnishingChange = (eventKey) => {
        setFurnishing(eventKey)
    }
    const nextPage = () => {
        setCurrentPage(++currentPage)
        setPreviousButton(true)
    }
    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(--currentPage)
            setNextButton(true)
        }
    }
    const handleResetFilter = () => {
        setCategory('sale')
        setType(null)
        setLocation(null)
        setArea(null)
        setPrice(null)
        setRooms(null)
        setFloor(null)
        setFurnishing(null)
        setCurrentPage(1)
    }

    const locationOptions = t('locationOptions', { returnObjects: true })
    const typeOptions = t('typeOptions', { returnObjects: true })

    return (
        <div className="search-container">
            <div className="search-area">
                <h1 className="search-h1">{t('searchTitle')}</h1>
                <div className="main-options">
                    <Nav justify variant="tabs" onSelect={handleLinkClick} activeKey={activeOption} className="nav-linkk">
                        <Nav.Item>
                            <Nav.Link className="nav-linkk" eventKey='link-1'>{t('searchSection1')}</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="nav-linkk" eventKey='link-2'>{t('searchSection2')}</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="nav-linkk" eventKey='link-3'>{t('searchSection3')}</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
                <div className="filter-options">
                    <div className="option-div">
                        <Dropdown className="d-inline mx-2" onSelect={handleLocationChange}>
                            <Dropdown.Toggle id="dropdown-autoclose-true" className="filter-buttons-two">
                                {t('locationMenu')}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {locationOptions.map((location, idx) => (
                                    <Dropdown.Item key={idx} eventKey={location}>{location}</Dropdown.Item>

                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="option-div">
                        <Dropdown className="d-inline mx-2" onSelect={handleTypeChange}>
                            <Dropdown.Toggle id="dropdown-autoclose-true" className="filter-buttons-two">
                                {t('typeMenu')}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {
                                    typeOptions.map((type, idx) => (
                                        <Dropdown.Item key={idx} eventKey={type}>{type}</Dropdown.Item>
                                    ))
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="option-div">
                        <Dropdown className="d-inline mx-2" onSelect={handleAreaChange}>
                            <Dropdown.Toggle id="dropdown-autoclose-true" className="filter-buttons-two">
                                {t('areaMenu')}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item eventKey='0-100'>0-100</Dropdown.Item>
                                <Dropdown.Item eventKey='100-200'>100-200</Dropdown.Item>
                                <Dropdown.Item eventKey='200-300'>200-300</Dropdown.Item>
                                <Dropdown.Item eventKey='300-500'>300-500</Dropdown.Item>
                                <Dropdown.Item eventKey='500-1000'>500-1000</Dropdown.Item>
                                <Dropdown.Item eventKey='1000-2000'>1,000-2,000</Dropdown.Item>
                                <Dropdown.Item eventKey='2000-5000'>2,000-5,000</Dropdown.Item>
                                <Dropdown.Item eventKey='5000-10000'>5,000-10,000</Dropdown.Item>
                                <Dropdown.Item eventKey='10000'> + 10,000</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="option-div">
                        <Dropdown className="d-inline mx-2" onSelect={handlePriceChange}>
                            <Dropdown.Toggle id="dropdown-autoclose-true" className="filter-buttons-two">
                                {t('priceMenu')}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item eventKey='0-100000'>0-100,000</Dropdown.Item>
                                <Dropdown.Item eventKey='100000-200000'>100,000-200,000</Dropdown.Item>
                                <Dropdown.Item eventKey='200000-300000'>200,000-300,000</Dropdown.Item>
                                <Dropdown.Item eventKey='300000-500000'>300,000-500,000</Dropdown.Item>
                                <Dropdown.Item eventKey='500000'>500,000-More</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                <div className="second-filters">
                    {secondFilter &&
                        <>
                            <Dropdown className="d-inline mx-2" onSelect={handleFloorChange}>
                                <Dropdown.Toggle id="dropdown-autoclose-true" className="filter-buttons">
                                    {t('floorMenu')}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey={-2}>-2</Dropdown.Item>
                                    <Dropdown.Item eventKey={-1}>-1</Dropdown.Item>
                                    <Dropdown.Item eventKey={0}>0</Dropdown.Item>
                                    <Dropdown.Item eventKey={1}>1</Dropdown.Item>
                                    <Dropdown.Item eventKey={2}>2</Dropdown.Item>
                                    <Dropdown.Item eventKey={3}>3</Dropdown.Item>
                                    <Dropdown.Item eventKey={4}>4+</Dropdown.Item>
                                    <Dropdown.Item eventKey={6}>{t('roofOption')}</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <Dropdown className="d-inline mx-2" onSelect={handleRoomsChange}>
                                <Dropdown.Toggle id="dropdown-autoclose-true" className="filter-buttons">
                                    {t('roomsMenu')}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey={1}>1</Dropdown.Item>
                                    <Dropdown.Item eventKey={2}>2</Dropdown.Item>
                                    <Dropdown.Item eventKey={3}>3</Dropdown.Item>
                                    <Dropdown.Item eventKey={4}>4</Dropdown.Item>
                                    <Dropdown.Item eventKey={5}>5</Dropdown.Item>
                                    <Dropdown.Item eventKey={6}>6+</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <Dropdown className="d-inline mx-2" onSelect={handleFurnishingChange}>
                                <Dropdown.Toggle id="dropdown-autoclose-true" className="filter-buttons">
                                    {t('furnishingMenu')}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey='furnished'>{t('furnishingOption1')}</Dropdown.Item>
                                    <Dropdown.Item eventKey='unfurnished'>{t('furnishingOption2')}</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </>
                    }
                </div>
                <div className="results-container">
                    <div className="reset-btn-div">
                        <button className="filter-buttons" onClick={handleResetFilter}>Reset filters</button>
                    </div>
                    <div className="result-area">
                        {waitData ? (<span> Please wait (demo web app with free hosting and cloud serveces), or refresh the page</span>)
                            : (<>
                                {
                                    noData ?
                                        <span> No results match your search filter</span>
                                        :
                                        <>{
                                            searchedData.map((data, idx) => (
                                                <ResultCard key={idx} data={data} />
                                            ))
                                        }</>
                                }
                            </>)
                        }

                        {/* <ResultCard />
                        <ResultCard />
                        <ResultCard />
                        <ResultCard />
                        <ResultCard />
                        <ResultCard />
                        <ResultCard />
                        <ResultCard />
                        <ResultCard />
                        <ResultCard />
                        <ResultCard /> */}
                    </div>
                    <div className="results-buttons">
                        {previousButton && <button className="next-prev-btns" onClick={previousPage}>Back</button>}
                        {nextButton && <button className="next-prev-btns" onClick={nextPage}>Next</button>}
                    </div>
                </div>

            </div>
        </div >
    )
}

export default SearchArea;