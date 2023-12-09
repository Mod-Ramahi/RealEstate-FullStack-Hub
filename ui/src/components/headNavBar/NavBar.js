import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.css'
import { useTranslation } from 'react-i18next'


const NavBar = () => {
    const [t, i18] = useTranslation()

    return (
        <Navbar className="my-edit-navbar" data-bs-theme="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/home"><img className="logo" src='/images/Logo.jpeg' /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/contactus">{t('contactBtn')}</Nav.Link>
                        <Nav.Link href="/aboutus">{t('aboutBtn')}</Nav.Link>
                        {i18.language === 'en' &&
                            <button className="translation-btn"
                                onClick={() => i18.changeLanguage('ar')}>
                                عر                            </button>
                        }
                        {i18.language === 'ar' &&
                            <button className="translation-btn"
                                onClick={() => i18.changeLanguage('en')}>
                                EN
                            </button>

                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;