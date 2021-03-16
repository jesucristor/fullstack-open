import React from 'react'
import '../App.css'
const MessageInfo = ({ message, error }) => {
    if (error) {
        return (
            <div className='error'>{message}</div>
        )
    }
    return (
        <div className='success'>
            {message}
        </div>
    )
}

export default MessageInfo
