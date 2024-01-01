import * as React from "react";
import { createBrowserRouter } from 'react-router-dom'
import Root from "./root";
import HomePage from "../pages/homePage";
import SinglePageDetails from "../pages/singlePageDetails";
import ContactPage from "../pages/contactPage";
import AboutUsPage from "../pages/aboutUsPage";
import AdminLoginPage from "../pages/administration/adminLogInPage";
import AdminControlPage from "../pages/administration/adminControlPage";
import AdminDashboard from "../pages/administration/adminDashboard";
import AddData from "../pages/administration/addData";
import EditData from "../pages/administration/editData";
import AddPhotos from "../pages/administration/addPhotos";
import EditInfo from "../pages/administration/editInfo";
import AllMessages from "../pages/administration/allMessages";

const Router = 
    createBrowserRouter([
        {
            path:'/',
            element: <Root/>,
            children: [
                {
                    path:'/',
                    element: <HomePage/>
                },
                {
                    path:'*',
                    element:<HomePage/>
                },
                {
                    path:'/details/:id',
                    element:<SinglePageDetails/>
                },
                {
                    path:'/contactus',
                    element:<ContactPage/>
                },
                {
                    path:'/aboutus',
                    element:<AboutUsPage/>
                },
                {
                    path:'/adminlogin',
                    element:<AdminLoginPage/>
                },
                {
                    path:'/admincontrol',
                    element:<AdminControlPage/>
                },
                {
                    path:'/admindashboard',
                    element:<AdminDashboard/>
                },
                {
                    path:'/adminadddata',
                    element:<AddData/>
                },
                {
                    path:'/admineditdata',
                    element:<EditData/>
                },
                {
                    path:'/admineditphoto/:id',
                    element:<AddPhotos/>
                },
                {
                    path:'/admineditinfo/:id',
                    element:<EditInfo/>
                },
                {
                    path:'/admineditinfo/allmessages',
                    element:<AllMessages/>
                }
            ]
        }
    ])


export default Router