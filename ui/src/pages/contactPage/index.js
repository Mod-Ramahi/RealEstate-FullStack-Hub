import React, { useState } from "react";
import './ContactUs.css'
import { useTranslation } from "react-i18next";
import { SendMsg } from "../../api";
const ContactPage = () => {
    const [t] = useTranslation()
    const [ name, setName] = useState()
    const [ email, setEmail] = useState()
    const [message, setMessage] = useState()

    const handleNameChange = (event) => {
        const Name = event.target.value
        setName(Name)
    }
    const handleEmailChange = (event) => {
        const Email = event.target.value
        setEmail(Email)
    }
    const handleMesageInput = (event) => {
        const Message = event.target.value
        setMessage(Message)
    }

    const handleSendMessage = async () => {
        if(name && email && message) {
            try{
                const data = {name, email, message}
                const MessageSending = await SendMsg(data)
                console.log('msg sent: ',MessageSending) 
            } catch (error) {
                console.error(error)
            }
        }
    }
    return (
        <div className="contact-div">
            <h2>Contact Us</h2>
            <span className="main-contact-span">{t('contactUs')}</span>
            <div className="contact-details">
                <span className="contact-info-span">{t('contactNo')}</span>
                <span className="contact-info-span">{t('contactWtp')}</span>
                <span className="contact-info-span">{t('contactEmail')}</span>
            </div>
            <span className="main-contact-span">{t('contactForm')}</span>
            <div className="contact-box">
                <form className="contact-form">
                    <div className="your-info">
                        <span className="your-info-span">{t('formName')}</span>
                        <input type="text" className="txt-input input" onChange={handleNameChange}/>
                    </div>
                    <div className="your-info">
                        <span className="your-info">{t('formEmail')}</span>
                        <input type="email" className="email-input input" onChange={handleEmailChange}/>
                    </div>
                    <div className="your-info">
                        <span className="your-info">{t('formMsg')}</span>
                        <textarea className="text-area input" onChange={handleMesageInput}/>
                    </div>
                    <div className="submit-button-div">
                        <button className="submit-btn" onClick={handleSendMessage}>{t('formsubmit')}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default ContactPage