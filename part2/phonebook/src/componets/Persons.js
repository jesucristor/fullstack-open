import React from 'react'

const Persons = ({ filterPersons }) => {
    return (
        <div>
            {
                filterPersons.map(p => <div key={p.name}>{p.name} {p.number}</div>)
            }
        </div>
    )
}

export default Persons
