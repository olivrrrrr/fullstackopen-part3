import axios from 'axios'

const baseURL = "/api/persons"; 

const getAll = () =>{
    const request = axios.get(baseURL)
        return request.then(resp=>resp.data)
}

const create = (newObject) =>{
   const request = axios.post(baseURL, newObject)
        return request.then(resp=>resp.data)
}

const update = (id, newObject) =>{
  const request = axios.put(`${baseURL}/${id}`, newObject)
    return request.then(resp=>resp.data)

}

const deletePerson = (id) =>{
   const request = axios.delete(`${baseURL}/${id}`)
    return request.then(resp=>resp.data)
}

export default {
    getAll: getAll, 
    create : create,
    update : update, 
    deletePerson : deletePerson
}
