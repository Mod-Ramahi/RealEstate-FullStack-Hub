import axios from "axios";
import { getItem } from "./localStorage";

const api = axios.create({
    baseURL: 'http://real-estate-mern-full-stack-server.vercel.app'
})

export const RegisterAdmin = async (data) => {
    try {
        const token = getItem()
        const response = await api.post('/administration/createadmin',
            data,
            { headers: { Authorization: `Bearer ${token}` } })
        return response
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error(error.response.data);
            console.error(error.response.status);
            console.error(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error', error.message);
        }
    }
}

export const SignIn = async (data) => {
    try {
        const response = await api.post('/administration/signin', data)
        return response
    } catch (error) {
        console.error(error)
        return error.response
    }
}

export const AddRealEstate = async (data) => {
    try {
        const token = getItem()
        const response = await api.post('/data/adddata',
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        return response
    } catch (error) {
        console.error(error)
        return error.response
    }
}

export const GetDefaultData = async (pageSize, currentPage, textSearch, sort, order, section) => {
    try {
        const token = getItem()
        const response = await api.get('/data/getdata',
            {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    pageSize,
                    currentPage,
                    order,
                    sortBy: sort,
                    textSearch,
                    section
                }
            });
        return response
    } catch (error) {
        console.error(error)
        return error.response
    }
}

export const GetSingleData = async (id) => {
    try {
        const response = await api.get(`/data/getsingle/${id}`)
        return response
    } catch (error) {
        console.error(error)
        return error.response
    }
}

export const AddPhoto = async (formData, id) => {
    try {
        const token = getItem()
        const response = await api.post(`/photo/addphoto/${id}`, formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                    
                }
            })
        return response
    } catch (error) {
        console.error(error)
        return error.response
    }
}

export const SaveImgUrl = async (data, id) => {
    try {
        const response = await api.post(`/data/photolink/${id}`, data)
        return response
    } catch (error) {
        console.error(error)
        return error.response
    }
}

export const DeletePhoto = async (data) => {
    try{
        // const token = getItem()
        // console.log('api token', token)
        const {link, token} = data
        const response = await api.delete('/photo/deletephoto', 
        {data:{link}, 
        headers: {Authorization: `Bearer ${token}`}})
        return response
    } catch (error){
        console.error(error)
        return error.response
    }
}

export const UpdateInfo = async (data, id) => {
    try{
        const token = getItem()
        const response = await api.put(`/data/updateinfo/${id}`, data, {headers: {Authorization: `Bearer ${token}`}})
        return response
    } catch(error){
        console.error(error)
        return error.response
    }
}

export const DeleteCard = async (id) => {
    try{
        const token = getItem()
        const response = await api.delete(`/data/deletecard/${id}`, {headers: {Authorization: `Bearer ${token}`}})
        return response
    } catch(error) {
        console.error(error)
        return error.response
    }
}

export const GetAllAdmins = async () => {
    try{
        const response = await api.get('/administration/getalladmins')
        return response
    } catch(error){
        console.error(error)
        return error.response
    }
}

export const DeleteAdmin = async (id) => {
    try{
        const token = getItem()
        const response = await api.delete(`/administration/deleteadmin/${id}`, {headers:{Authorization:`Bearer ${token}`}})
        return response
    } catch (error) {
        console.error(error)
        return error.response
    }
}

export const UiGetData = async (data) => {
    try{
        const response = await api.post('/data/uigetdata', data)
        return response
    } catch (error) {
        console.error(error)
    }
}

export const SendMsg = async (data) => {
    try{
        const response = await api.post('/data/messages', data)
        return response
    } catch (error) {
        console.error(error)
    }
}

export const GetMessages = async (pageSize) => {
    try{
        const response = await api.get('/data/getmsgs',
        {params:{
            pageSize: pageSize
        }}
        )
        return response
    } catch (error) {
        console.log(error)
    }
}