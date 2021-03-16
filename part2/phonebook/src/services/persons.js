import axios from 'axios'

const baseUrl = 'api/persons'


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const createPerson = (newObj) => {
    const request = axios.post(baseUrl, newObj)
    return request.then(response => response.data)
}

const deletePerson = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const modifyPerson = newObj => {
    const request = axios.put(`${baseUrl}/${newObj.id}`, newObj)
    return request.then(response => response.data)
}

export default {
    getAll,
    createPerson,
    deletePerson,
    modifyPerson
}