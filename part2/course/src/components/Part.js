import React from 'react'

const Part = ({ p }) => {
    const { name, exercises } = p
    return (
        <div>
            <p>{name} {exercises}</p>
        </div>
    )
}

export default Part
