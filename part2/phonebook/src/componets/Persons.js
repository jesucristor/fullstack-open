import React from 'react'

const Persons = ({ filterPersons, deletePersonId }) => {
    return (
        <div>
            {
                filterPersons.map(p => <div key={p.name}>{p.name} {p.number}<button onClick={() => deletePersonId(p)}>delete</button></div>)
            }
        </div>
    )
}

export default Persons
