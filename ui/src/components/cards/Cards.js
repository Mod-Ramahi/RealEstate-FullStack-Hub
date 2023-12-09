import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Cards.css'
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Cards = () => {
    const [t] = useTranslation()
    const navigate = useNavigate()
    const icons = [
        "https://img.icons8.com/clouds/100/real-estate.png",
        "https://img.icons8.com/fluency/48/000000/property.png",
        "https://img.icons8.com/external-phatplus-lineal-color-phatplus/64/external-real-estate-payment-phatplus-lineal-color-phatplus.png"
    ]
    const cardTitles = t('cardTitles', {returnObjects: true})
    const cardText = t('cardText', {returnObjects: true})
    const handleClick = (button) => {
        if(button === 'Trusted'){
            navigate('/aboutus')
        }
        if(button === 'To Help You'){
            navigate('/contactus')
        }
        if(button === 'Your options'){
            console.log(window.scrollY)
            window.scrollTo(0,1200)
        }
    }
    const renderCard = () => {
        return (
            Array.from({ length: 3 }, (_, index) => (
                <Card className="card-box" style={{ width: '18rem' }} key={index}>
                    <Card.Img className="card-img" variant="top" src={icons[index]} />
                    <Card.Body className="card-body">
                        <Card.Title className="card-title">{cardTitles[index]}</Card.Title>
                        <Card.Text className="card-text">
                            {cardText[index]}
                        </Card.Text>
                        <Button variant="primary" className="card-button" onClick={() => handleClick(cardTitles[index])}>Find More</Button>
                    </Card.Body>
                </Card>
            )
            )
        )
    }
    return (
        <>
            <div className="cards-div">
                {renderCard()}
            </div>
            <hr className="main-hr" />
        </>


    )
}

export default Cards