import { React, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/headNavBar/NavBar";
import ContactIcon from "../components/contactIcon/ContactIcon";
import Footer from "../components/footer/Footer";
import { useState } from "react";
import AdminNavBar from "../components/headNavBar/AdminNavBar";
import { getItem, removeItem } from "../localStorage";
// import jwtDecode from "jsonwebtoken/decode";
// import jwt_decode from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom/dist";

const Root = () => {
    const location = useLocation()
    const { pathname } = useLocation()
    const [isAdmin, setIsAdmin] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
        if (pathname.includes('admin')) {
            
            const token = getItem('token')
            if (token) {
                setIsAdmin(true)
                const decoded = jwtDecode(token)
                const cuurentTime = Math.floor(Date.now() / 1000)
                if (decoded.exp < cuurentTime) {
                    console.log('token removed', token)
                    removeItem(token)
                    navigate('/adminlogin')
                }
                console.log('decode:', decoded, 'time to exp: ', decoded.exp - cuurentTime)
            } else {
                navigate('/adminlogin')
            }
        } else {
            setIsAdmin(false)
        }
    }, [location.pathname])
    return (
        <>
            {
                isAdmin ?
                    <>
                        <AdminNavBar />
                        <Outlet />
                        <Footer />
                    </>
                    :
                    <>
                        <NavBar />
                        <ContactIcon />
                        <Outlet />
                        <Footer />
                    </>
            }
        </>


    )
}

export default Root