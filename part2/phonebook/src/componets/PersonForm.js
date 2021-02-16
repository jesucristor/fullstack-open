import React from 'react'

const PersonForm = ({ newName, handleNames, newNumber, handleNumbers, addPerson }) => {
    return (
        <div>
            <div>
                name: <input value={newName} onChange={handleNames} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumbers} />
            </div>
            <div>
                <button type="submit" onClick={addPerson}>add</button>
            </div>
        </div>
    )
}

export default PersonForm
