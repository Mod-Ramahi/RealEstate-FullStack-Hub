import React from "react";
import './ContactUs.css'
import { useTranslation } from "react-i18next";
const ContactPage = () => {
    const [t] = useTranslation()
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
                        <input type="text" className="txt-input input" />
                    </div>
                    <div className="your-info">
                        <span className="your-info">{t('formEmail')}</span>
                        <input type="email" className="email-input input" />
                    </div>
                    <div className="your-info">
                        <span className="your-info">{t('formMsg')}</span>
                        <textarea className="text-area input" />
                    </div>
                    <div className="submit-button-div">
                        <button className="submit-btn">{t('formsubmit')}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default ContactPage