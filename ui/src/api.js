import axios from "axios";
import { getItem } from "./localStorage";

const instance = axios.create({
    baseURL: 'https://51.20.18.182:5000/api/v1',
    // withCredentials: true
})

export const RegisterAdmin = async (data) => {
    try {
        const token = getItem()
        const response = await instance.post('/administration/createadmin',
            data,
            { headers: { Authorization: `Bearer ${token}` } })
        return response
    } catch (error) {
            console.error('Error', error.message);
        }
}

export const SignIn = async (data) => {
    try {
        const response = await instance.post('/administration/signin', data)
        return response
    } catch (error) {
        console.error(error)
        return error.response
    }
}

export const AddRealEstate = async (data) => {
    try {
        const token = getItem()
        const response = await instance.post('/data/adddata',
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
        const response = await instance.get('/data/getdata',
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
        const response = await instance.get(`/data/getsingle/${id}`)
        return response
    } catch (error) {
        console.error(error)
        return error.response
    }
}

export const AddPhoto = async (formData, id) => {
    try {
        const token = getItem()
        const response = await instance.post(`/photo/addphoto/${id}`, formData,
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
        const response = await instance.post(`/data/photolink/${id}`, data)
        return response
    } catch (error) {
        console.error(error)
        return error.response
    }
}

export const DeletePhoto = async (data) => {
    try{
        // const token = getItem()
        // console.log('instance token', token)
        const {link, token} = data
        const response = await instance.delete('/photo/deletephoto', 
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
        const response = await instance.put(`/data/updateinfo/${id}`, data, {headers: {Authorization: `Bearer ${token}`}})
        return response
    } catch(error){
        console.error(error)
        return error.response
    }
}

export const DeleteCard = async (id) => {
    try{
        const token = getItem()
        const response = await instance.delete(`/data/deletecard/${id}`, {headers: {Authorization: `Bearer ${token}`}})
        return response
    } catch(error) {
        console.error(error)
        return error.response
    }
}

export const GetAllAdmins = async () => {
    try{
        const response = await instance.get('/administration/getalladmins')
        return response
    } catch(error){
        console.error(error)
        return error.response
    }
}

export const DeleteAdmin = async (id) => {
    try{
        const token = getItem()
        const response = await instance.delete(`/administration/deleteadmin/${id}`, {headers:{Authorization:`Bearer ${token}`}})
        return response
    } catch (error) {
        console.error(error)
        return error.response
    }
}

export const UiGetData = async (data) => {
    try{
        const response = await instance.post('/data/uigetdata', data)
        return response
    } catch (error) {
        console.error('the error',error)
        return error.response
    }
}

export const SendMsg = async (data) => {
    try{
        const response = await instance.post('/data/messages', data)
        return response
    } catch (error) {
        console.error(error)
    }
}

export const GetMessages = async (pageSize) => {
    try{
        const response = await instance.get('/data/getmsgs',
        {params:{
            pageSize: pageSize
        }}
        )
        return response
    } catch (error) {
        console.log(error)
    }
}