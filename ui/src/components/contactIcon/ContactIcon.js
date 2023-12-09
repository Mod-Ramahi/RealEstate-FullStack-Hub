import React, { useEffect, useState } from "react";
import './ContactIcon.css'
import { useLocation, useNavigate } from "react-router-dom";

const ContactIcon = () => {
    const [contactPage, setContactPage] = useState(false)
    const location = useLocation()
    useEffect(() => {
        if (location.pathname === '/contactus') {
            setContactPage(true)
        } else {
            setContactPage(false)
        }
    }, [location.pathname])
    const navigate = useNavigate()
    return (
        <div className="contact-icon-div" onClick={
            contactPage ?
                () => navigate('/home')
                :
                () => navigate('contactus')
        }>
            <img
                className="img-icon"
                alt="contact"
                src=
                {contactPage ?
                    "https://img.icons8.com/flat-round/64/home--v1.png"
                    :
                    "https://img.icons8.com/cotton/64/000000/phone-message.png"
                } />
        </div>
    )
}

export default ContactIcon