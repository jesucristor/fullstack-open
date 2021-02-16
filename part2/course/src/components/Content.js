import React from 'react'
import Part from './Part'

const Content = ({ parts }) => {
    return (
        <div>
            {
                parts.map(p => <Part key={p.id} p={p} />)
            }
        </div>
    )
}

export default Content
