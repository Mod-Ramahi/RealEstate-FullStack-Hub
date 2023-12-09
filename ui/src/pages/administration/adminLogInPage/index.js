import React, { useState } from "react";
import './AdminLoginPage.css'
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';
import { SignIn } from "../../../api";
import NotificationBox from "../../../components/notificationBox/NotificationBox";
import { setItem } from "../../../localStorage";

const AdminLoginPage = () => {
    const [name, setName] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [password, setPassword] = useState('')
    const [validationErr, setValidationErr] = useState({})
    const [notificationBox, setNotificationBox] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('')
    const navigate = useNavigate()

    const validationSchema = yup.object().shape({
        name: yup.string().required('name required')
            .min(3, 'admin name must be at least 3 characters')
            .max(12, 'user name must not exceed 12 characters'),
        password: yup.string().required('password required')
            .min(8, 'password must be at least 8 characters')
            .max(16, 'password must not exceed 16 characters'),
    })

    const handleUserName = (event) => {
        const Name = event.target.value;
        setName(Name)
        if (validationErr.name) {
            setValidationErr((prevError) => ({
                ...prevError, name: ''
            })
            )
        }
    }
    const handlePassword = (event) => {
        const Password = event.target.value;
        setPassword(Password);
        if (validationErr.password) {
            setValidationErr((prevError) => ({
                ...prevError,
                password: ''
            }))
        }
    }

    const closeNotificationBox = () => {
        setNotificationBox(false)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await validationSchema.validate(
                { name, password },
                { abortEarly: false }
            )
            const data = { name, password }
            const signIn = await SignIn(data)
            console.log('sing in response:', signIn)

            if (signIn.status === 200) {
                const token = (signIn.data.token)
                setItem(token)
                console.log('success sign in','token: '+token)
                setNotificationBox(false)
                navigate('/admincontrol')
            } else if (signIn.status === 401 || signIn.data.status === 401) {
                console.log('invalid name or password')
                const messsage = 'invalid name or password'
                setNotificationBox(true)
                setNotificationMessage(messsage)
            } else {
                const message = 'something went wrong'
                setNotificationBox(true)
                setNotificationMessage(message)
            }

        } catch (error) {
            if (error.name === 'ValidationError') {
                const ValidationErr = {}
                error.inner.forEach((err) => {
                    ValidationErr[err.path] = err.message
                })
                setValidationErr(ValidationErr)
            } else {
                console.error('error:', error)
                const message = `error signing in: ${error}`
                setNotificationBox(true)
                setNotificationMessage(message)
            }
        }
        // navigate('/admincontrol')
    }
    return (
        <>
        {notificationBox && <NotificationBox message={notificationMessage} closeBox={closeNotificationBox}/>}
            <div className="login-div">
                <form className="login-form">
                    <span>User Name:</span>
                    <input className="admin-input" type="text" onChange={handleUserName} />
                    {validationErr.name && <span className="error-span">{validationErr.name}</span>}
                    <span>Password:</span>
                    <input className="admin-input" type={showPass ? 'text' : 'password'} onChange={handlePassword} />
                    <span className="show-pass" onClick={() => setShowPass(!showPass)}>{showPass ? 'hide' : 'show'}</span>
                    {validationErr.password && <span className="error-span">{validationErr.password}</span>}
                    <button onClick={handleSubmit}>Login</button>
                </form>
            </div>
        </>

    )
}
export default AdminLoginPage