import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import './EditData.css'
import { DeleteCard, GetDefaultData } from "../../../api";
import { useNavigate } from "react-router-dom";

const EditData = () => {
    const [searchText, setSearchText] = useState('')
    const [textSearch, setTextSearch] = useState('')
    const [previousButton, setPreviousButton] = useState(false)
    const [nextButton, setNextButton] = useState(true)
    // let currentPage = 1;
    const [currentPage, setCurrentPage] = useState(1)
    const [dataRecieved, setDataRecieved] = useState([])
    const [getType, setGetType] = useState('adminDefault')
    const [sort, setSort] = useState('createdAt')
    const [order, setOrder] = useState('desc')
    const [section, setSection] = useState('All')
    const [checkResult, setCheckResult] = useState(false)
    const [noData, setNoData] = useState(true)
    const [deleteId, setDeleteId] = useState()
    const [confirmBox, setConfirmBox] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (currentPage === 1) {
            setPreviousButton(false)
        }
        console.log('run')
        getAdminData()
    }, [checkResult, getType, currentPage, textSearch, sort, section, sort, order])

    const getAdminData = () => {
        const pageSize = 3;
        GetDefaultData(pageSize, currentPage, textSearch, sort, order, section)
            .then((data) => {
                if (data.data.length === 0) {
                    console.log('limit reached')
                    setCurrentPage(currentPage - 1)
                    setNextButton(false)
                    setNoData(true)
                } else {
                    if (data.status === 200) {
                        setNoData(false)
                        setDataRecieved(data.data)
                        console.log('data: ', data, 'data recieved:', data.data, 'current page: ', currentPage, 'get type: ', getType)
                    } else {
                        console.log('Error:', data)
                        setNoData(true)
                    }
                }

            }).catch((error) => {
                setNoData(true)
                console.error('error: something went wrong: ', error)
            })
    }

    const nextPage = () => {
        setCurrentPage(currentPage + 1)
        setGetType('adminNext')
        setPreviousButton(true)
    }
    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
            // setGetType('adminPrevious')
            setNextButton(true)
        }
    }

    const handleSearchText = (event) => {
        const Text = event.target.value
        setSearchText(Text)
    }
    const handleTextSearchResult = () => {
        setCurrentPage(1)
        setTextSearch(searchText)
        setGetType('adminDefault')
        setCheckResult(!checkResult)
    }
    const handleSort = (event) => {
        const sortValue = event.target.value;
        const Order = event.target.getAttribute('order')
        setSort(sortValue)
        setOrder(Order)
        setCurrentPage(1)
        setGetType('adminDefault')
    }
    const handleSection = (event) => {
        const Section = event.target.value;
        setSection(Section)
        setCurrentPage(1)
        setGetType('adminDefault')
    }
    const handleEditPhoto = (event) => {
        const id = event.target.value;
        // const card = id._id
        console.log('first id:', id)
        navigate(`/admineditphoto/${id}`)
    }
    const handleEditInfo = (event) => {
        const id = event.target.value;
        navigate(`/admineditinfo/${id}`)
    }
    const handleDeleteCard = (event) => {
        const id = event.target.value;
        setDeleteId(id)
        setConfirmBox(true)
    }
    const closeDelete = () => {
        setDeleteId(null)
        setConfirmBox(false)
    }
    const yesDelete = async () => {
        try{
            const id = deleteId
            const deleteCard = await DeleteCard(id)
            console.log(deleteCard)
        } catch(error){
            console.error(error)
        }
        setConfirmBox(false)
    }
    return (
        <div className='edit-container'>{
            deleteId && confirmBox ?
                <div
                    className="modal show"
                    style={{ display: 'block', position: 'initial' }}
                >
                    <Modal.Dialog>
                        <Modal.Header >
                            <Modal.Title>Delete</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p>Are you sure?</p>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={closeDelete}>No, Close</Button>
                            <Button variant="primary" onClick={yesDelete}>Yes, Delete</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>
                :
                <>
                    <div className='edit-buttons'>
                        <div className="search-div">
                            <span>find by title or Id</span>
                            <input type='text' className='input-search' placeholder='Id or title...' onChange={handleSearchText} />
                            <button className="search-btn" onClick={handleTextSearchResult}>Search</button>
                        </div>
                        <div className="sort-div">
                            <button className='sort-btn' value='createdAt' order='desc' onClick={handleSort}>Sort by date recenet</button>
                            <button className='sort-btn' value='createdAt' order='asc' onClick={handleSort}>Sort by date old</button>
                            <button className='sort-btn' value='rank' order='desc' onClick={handleSort}>Sort by rank 2 to 0</button>
                            <button className='sort-btn' value='rank' order='asc' onClick={handleSort}>Sort by rank 0 to 2</button>
                        </div>
                        <div className="type-div">
                            <span>Select Section</span>
                            <select className='select-type' onChange={handleSection}>
                                <option vlaue="all">All</option>
                                <option vlaue="sale">Sale</option>
                                <option vlaue="rent">Rent</option>
                                <option vlaue="commercial">Commercial</option>
                            </select>
                        </div>
                    </div>
                    <div className="result-container">{!noData &&
                        // dataRecieved.length !== 0 &&
                        // Array.from({ length: 5 }, (_, index) => (
                        dataRecieved.map((data, index) => (
                            <Card style={{ width: '18rem' }} key={index}>
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body className="card-body-edit">
                                    <Card.Title>{data.titleEn}</Card.Title>
                                    <Card.Text>
                                        {data.detailsEn}
                                    </Card.Text>
                                    <Button variant="primary" value={data._id} onClick={handleEditPhoto}>Edit photos</Button>
                                    <Button variant="secondary" value={data._id} onClick={handleEditInfo}>Edit info</Button>
                                    <Button variant="danger" value={data._id} onClick={handleDeleteCard}>Delete</Button>
                                </Card.Body>
                            </Card>
                        ))
                    }
                    </div>
                    <div className="pagination-btns">
                        {previousButton && <button onClick={previousPage}>Back</button>}
                        {nextButton && <button onClick={nextPage}>Next</button>}

                    </div>
                </>
        }
        </div>
    )
}

export default EditData