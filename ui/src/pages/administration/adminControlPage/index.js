import React, { useEffect, useState } from "react";
import './AdminControlPage.css'
import { useNavigate } from "react-router-dom";
import { GetMessages } from "../../../api";
const AdminControlPage = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const pageSize = 3;
        GetMessages(pageSize).then((msg) => {
            setMessages(msg.data)
            console.log(msg)
        }).catch((error) => {
            console.error(error)
        })
    }, [])

    const convertCreatedAt = (createdAt) => {
        const dateObject = new Date(createdAt)
        return dateObject.toLocaleDateString() + '' + dateObject.toLocaleTimeString()
    }
    return (
        <div className="admin-control-div">
            <div className="messages-div">
                <button className="messages-btn" onClick={() => navigate('/admineditinfo/allmessages')}>See All Messages</button>
                <div className="messages-list">
                    {
                        messages?.map((message, idx) => (
                            <div className="single-message" key={idx}>
                                <span>Time: {convertCreatedAt(message.createdAt)}</span>
                                <hr/>
                                <span>{message.message.length > 50 ? `${message.message.slice(0, 50)}...` : message.message}</span>
                            </div>
                        ))
                    }

                    {/* <div className="single-message">
                        <span>message firts texts, asdf asdf asdaf assdf asdsf</span>
                    </div>
                    <div className="single-message">
                        <span>message firts texts, asdf asdf asdaf assdf asdsf</span>
                    </div>
                    <div className="single-message">
                        <span>message firts texts, asdf asdf asdaf assdf asdsf</span>
                    </div> */}
                </div>
            </div>
            <div className="edit-data">
                <span className="edit-data-span">Data Control and administration</span>
                <button className="edit-data-btn" onClick={() => navigate('/admindashboard')}>Edit/Add/Delete</button>
            </div>
        </div>
    )
}

export default AdminControlPage;