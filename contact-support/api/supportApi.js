import axios from 'axios';
import { API } from '../utils/config';


export const createSupport = (support,token) => {
    return axios.post(`${API}/support/create`, support, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
}

export const editSupport = (support,supportId,token) => {
     return axios.put(`${API}/support/edit/${supportId}`, support, {
         headers: {
             'Content-Type': 'application/json',
             "Authorization": `Bearer ${token}`
         }
     })
 }


 export const editIsReplied = (reply,supportId) => {
    return axios.put(`${API}/support/edit/reply/${supportId}`, reply, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

 export const deleteSupport = (supportId) => {
     return axios.delete(`${API}/support/delete/${supportId}`,  {
         headers: {
             'Content-Type': 'application/json'
         }
     })
 }

export const getAll = () => {
     return axios.get(`${API}/support/getAll`, {
         headers: {
             'Content-Type': 'application/json'
         }
     })
 }