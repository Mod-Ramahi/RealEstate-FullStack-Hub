import React, { useEffect, useState } from "react";
import { GetMessages } from "../../../api";

const AllMessages = () => {
    const [messages, setMessages] = useState()

    useEffect(() => {
        const pageSize = 'a'
        GetMessages(pageSize).then((msg) => {
            setMessages(msg.data)
            console.log(msg)
        }).catch((error) => {
            console.error(error);
        })
    }, [])

    const convertCreatedAt = (createdAt) => {
        const dateObject = new Date(createdAt)
        return dateObject.toLocaleDateString() + '' + dateObject.toLocaleTimeString()
    }

    return (
        <div className="messages-container" style={
            {
                marginTop:'12rem',
                padding:'2rem',
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'center',
                gap:'2rem'
            }
            }>
            {messages?.map((message, idx) => (
                <div className="single-msg" key={idx} style={{padding:'2rem', display:'flex', flexDirection:'column', gap:'1rem', border:'1px solid black', width:'90%'}}>
                    <span style={{fontSize:'1rem'}}>{convertCreatedAt(message.createdAt)}</span>
                    <hr/>
                    <span style={{fontSize:'2rem'}}>
                        {message.message}
                    </span>
                    <hr/>
                    <span style={{fontSize:'1.5rem'}}>{message.name} : {message.email}</span>
                </div>
            ))}
        </div>
    )
}

export default AllMessages