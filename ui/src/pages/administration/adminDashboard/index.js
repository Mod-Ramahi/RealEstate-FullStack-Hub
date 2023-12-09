import React, { useEffect } from "react";
import './AdminDashboard.css';
import * as yup from 'yup'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { DeleteAdmin, GetAllAdmins, RegisterAdmin } from "../../../api";
import NotificationBox from "../../../components/notificationBox/NotificationBox";
const AdminDashboard = () => {
    const [admins, setAdmins] = useState([])
    const [addAdmin, setAddAdmin] = useState(false)
    const [deleteAdmin, setDeleteAdmin] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const [adminName, setAdminName] = useState('')
    const [adminPass, setAdminPass] = useState('')
    const [adminRePass, setAdminRePass] = useState('')
    const [notificationBox, setNotificationBox] = useState(false)
    const [notificationMessage, setNotificationMessage] = useState('')
    const [validationErr, setValidationErr] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        if (deleteAdmin) {
            setAddAdmin(false)
            GetAllAdmins().then((admin) => {
                console.log('get all admins:', admin)
                setAdmins(admin.data)
                if(admin.status === 200){
                   console.log('deletebox true') 
                }
                
            }).catch((err) => {
                console.error(err)
            })
        } 
        if (addAdmin) {
            setDeleteAdmin(false)
        }

    }, [deleteAdmin, addAdmin])
    const validationSchema = yup.object().shape({
        adminName: yup.string().required('enter the admin username')
            .min(3, 'admin name must be at least 3 characters')
            .max(12, 'user name must not exceed 12 characters'),
        adminPass: yup.string().required('enter the admin password')
            .min(8, 'password must be at least 8 characters')
            .max(16, 'password must not exceed 18 characters'),
        adminRePass: yup.string().required('re-enter the admin password')
            .oneOf([yup.ref('adminPass'), null], 'passwords must match')
    })

    const handleAdminName = (event) => {
        const AdminUserName = event.target.value;
        setAdminName(AdminUserName)
        if (validationErr.adminName) {
            setValidationErr((prevError) => (
                {
                    ...prevError, adminName: ''
                }
            ))
        }
    }
    const handleAdminPass = (event) => {
        const AdminPassword = event.target.value;
        setAdminPass(AdminPassword)
        if (validationErr.adminPass) {
            setValidationErr((prevError) => (
                { ...prevError, adminPass: '' }
            ))
        }
    }
    const handleAdminRePass = (event) => {
        const AdminRePassword = event.target.value;
        setAdminRePass(AdminRePassword)
        if (validationErr.adminRePass) {
            setValidationErr((prevError) => (
                { ...prevError, adminRePass: '' }
            ))
        }
    }

    const closeNotificationBox = () => {
        setNotificationBox(false)
    }

    const handleCreateAdmin = async (event) => {
        event.preventDefault();
        try {
            await validationSchema.validate(
                { adminName, adminPass, adminRePass },
                { abortEarly: false }
            )
            // const name = adminName;
            // const password = adminPass;
            // const {name: adminName, password: adminPass} = data
            const data = { name: adminName, password: adminPass }
            const register = await RegisterAdmin(data)
            console.log('register response:', register.status, register)
            if (register.status === 201) {
                setNotificationBox(true)
                const message = 'new admin successfully been added'
                setNotificationMessage(message)
            } else if (register.data.status === 409) {
                setNotificationBox(true)
                const message = 'admin name already exists'
                setNotificationMessage(message)
            } else {
                setNotificationBox(true)
                const message = 'something went wrong'
                setNotificationMessage(message)
            }
        } catch (error) {
            if (error.name = 'ValidationError') {
                const ValidationErr = {}
                error.inner.forEach((err) => {
                    ValidationErr[err.path] = err.message
                })
                setValidationErr(ValidationErr)
            } else {
                console.error('error:', error)
                setNotificationBox(true)
                const message = `something went wrong: ${error}`;
                setNotificationMessage(message)
            }
        }
    }
    const handleDeleteAdmin = (event) => {
        const id = event.target.value
        if(id){
            DeleteAdmin(id).then((adminDelete) => {
                console.log(adminDelete)
                if(adminDelete.status === 200){
                    setNotificationBox(true)
                    setNotificationMessage('admin successfully deleted')
                }
            }).catch((error) => {
                console.log(error)
            })
        }
    }
    return (
        <div className="admin-container">
            {notificationBox && <NotificationBox closeBox={closeNotificationBox} message={notificationMessage} />}
            <div className="control-buttons">
                <span className="control-buttons-span">add data</span>
                <button className="control-buttons-btn" onClick={() => navigate('/adminadddata')}>Add</button>
                <hr className="admin-hr" />
                <span className="control-buttons-span">find to edit or delete</span>
                <button className="control-buttons-btn" onClick={() => navigate('/admineditdata')}>Edit or Delete</button>
            </div>
            <div className="control-buttons">
                <span className="control-buttons-span">Create new admin with user name and password. Or delete existing admin</span>
                <button className="control-buttons-btn" onClick={() => setAddAdmin(!addAdmin)}>Create admin</button>
                <button className="control-buttons-btn" onClick={() => setDeleteAdmin(!deleteAdmin)}>Delete admin</button>
                {addAdmin &&
                    <div className="add-admin">
                        <div className="create-admin">
                            <span>username: </span>
                            <input type="text" className="admin-username-input" onChange={handleAdminName} />
                            {validationErr.adminName && <span className="error-span">{validationErr.adminName}</span>}
                        </div>
                        <div className="create-admin">
                            <span>password: </span>
                            <input type={showPass ? "text" : "password"} className="admin-username-input" onChange={handleAdminPass} />
                            {validationErr.adminPass && <span className="error-span">{validationErr.adminPass}</span>}
                        </div>
                        <button className="showPass-btn" onClick={() => setShowPass(!showPass)}>show / hide password</button>
                        <div className="create-admin">
                            <span>repeat password: </span>
                            <input type={showPass ? "text" : "password"} className="admin-username-input" onChange={handleAdminRePass} />
                            {validationErr.adminRePass && <span className="error-span">{validationErr.adminRePass}</span>}
                        </div>
                        <button className="add-admin-btn" onClick={handleCreateAdmin}>Create new admin</button>
                    </div>
                }
                {deleteAdmin && 
                        <div className="admins-list" >{
                            admins.map((admin, idx) => (
                            <div className="single-admin" key={idx}>
                                <span className="admin-span">{admin.name}</span>
                                {admin.name !== 'tester' && <button className="delete-admin-btn" value={admin._id} onClick={handleDeleteAdmin}>Delete</button>}
                            </div>))}
                        </div>
                }
            </div>
        </div>
    )
}

export default AdminDashboard;