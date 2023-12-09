import React from "react";
import './AdminControlPage.css'
import { useNavigate } from "react-router-dom";
const AdminControlPage = () => {
    const navigate = useNavigate();

    return(
        <div className="admin-control-div">
            <div className="messages-div">
                <button className="messages-btn">See All Messages</button>
                <div className="messages-list">
                    <div className="single-message">
                        <span>message firts texts, asdf asdf asdaf assdf asdsf</span>
                    </div>
                    <div className="single-message">
                        <span>message firts texts, asdf asdf asdaf assdf asdsf</span>
                    </div>
                    <div className="single-message">
                        <span>message firts texts, asdf asdf asdaf assdf asdsf</span>
                    </div>
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