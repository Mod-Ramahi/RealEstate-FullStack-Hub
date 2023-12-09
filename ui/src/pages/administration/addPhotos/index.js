import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AddPhoto, DeletePhoto, GetSingleData, SaveImgUrl } from "../../../api";
import './AddPhotos.css'
import { getItem } from "../../../localStorage";
const AddPhotos = () => {
    const [token, setToken] = useState()
    const [photoFile, setPhotoFile] = useState(null)
    const [photoUrl, setPhotoUrl] = useState([])
    const [uploadedLink, setUploadedLink] = useState()
    const [imageShow, setImageShow] = useState(false)
    const { id } = useParams()
    useEffect(() => {
        const getToken = getItem('token')
        setToken(getToken)
        console.log('idd: ', id)
        GetSingleData(id).then((data) => {
            const imageUrl = data.data.singleData.photoLinks
            if (imageUrl && imageUrl.length > 0) {
                setPhotoUrl(imageUrl)
                setImageShow(true)
            } else {
                setImageShow(false)
            }

            // setPhotoUrl(imageUrl)
            console.log('data response: ', data, 'image url: ', imageUrl)
        }).catch((error) => {
            console.error(error)
        })
    }, [])

    useEffect(() => {
        const saveLinks = async () => {
            try {
                console.log('enter photo link')
                const data = { uploadedLink }
                const saveImgLink = await SaveImgUrl(data, id)
                console.log('save image link response: ', saveImgLink)
                setPhotoUrl(prevItems => [...prevItems, saveImgLink.data.uploadedLink])
                setImageShow(true)
            } catch (error) {
                console.error(error)
            }
        }
        if (uploadedLink) {
            saveLinks()
        }

    }, [uploadedLink])

    const handleFileUpload = (event) => {
        const file = event.target.files[0]
        if (file) {
            console.log('file: ', file)
            setPhotoFile(file)
        }
    }

    const handleUploadPhoto = async () => {
        try {
            const formData = new FormData();
            formData.append('image', photoFile)
            const newPhotoData = await AddPhoto(formData, id)
            console.log('new photo response:', newPhotoData)
            const imageLink = newPhotoData.data.imageUrl;
            const imageKey = newPhotoData.data.imageKey;
            const savedPhoto = newPhotoData.data.newPhoto;
            console.log('new photo data: ', newPhotoData, 'image link: ', imageLink, 'imageKey: ', imageKey, 'saved photo', savedPhoto)
            setUploadedLink(imageLink)
        } catch (error) {
            console.error(error)
        }
    }

    const handleDeletePhoto = (event) => {
        const link = event.target.value;
        console.log(link)
        const data = { link, token }
        if (link) {
            DeletePhoto(data).then((deleted) => {
                console.log('deleted recieved: ', deleted)
                if(deleted){
                    //remove from real estate array
                }
            }).catch((error) => {
                console.log(error)
            })
        }
    }


    return (
        <div className="photo-control-div">
            <div className="upload-div">
                <span>upload and add new photo. or choose one to delete</span>
                <input type="file" onChange={handleFileUpload} />
                <button onClick={handleUploadPhoto}>Add new Photo</button>
            </div>

            <div className="images-div">
                {
                    imageShow &&
                    photoUrl.map((photo, idx) => (
                        <div className="single-img-card" key={idx}>
                            <img src={photo} alt={idx} className="single-image" />
                            <button className="single-img-btn" value={photo} onClick={handleDeletePhoto}>Delete</button>
                        </div>
                    )
                    )
                }
            </div>
        </div>
    )
}

export default AddPhotos