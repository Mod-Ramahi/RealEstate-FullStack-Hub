import React from "react";
 import './NotificationBox.css'
const NotificationBox = ({message, closeBox}) => {
    // message = 'abcd abcd'
    return(
        <div className="notification-container">
            <div className="notification-box">
            <span className="notification-span">{message}</span>
            <button className="notification-button" onClick={closeBox}>Close | X </button>
            </div>
        </div>
    )
}

export default NotificationBox