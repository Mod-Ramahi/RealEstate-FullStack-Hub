import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.css'
import { getItem, removeItem } from "../../localStorage";
import { useNavigate } from "react-router-dom";


const AdminNavBar = () => {
    const navigate = useNavigate()

    const handleSignOut = () => {
        const token = getItem('token');
        console.log('token', token)
        if(token){
            removeItem(token)
            navigate('/adminlogin')
        }
    }

    return (
        <Navbar className="my-edit-navbar" data-bs-theme="dark" expand="lg">
            <Container>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/admincontrol">Admin Main Page</Nav.Link>
                        <Nav.Link href="/admindashboard">Admin Control Page</Nav.Link>
                        <span
                            style={{ cursor: 'pointer', color: 'white', fontWeight: 'bold', padding: '1rem' }}
                            onClick={handleSignOut}>
                            Sign Out
                        </span>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default AdminNavBar;