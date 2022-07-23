import axios from 'axios';
import {API} from '../utils/config';

export const login=(user)=>{
    return axios.post(`${API}/user/login`,user,{
        headers:{
            'Content-Type':'application/json'
        }
    })
}

export const createUser = (data) => {
    return axios.post(`${API}/user/create`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const getAll=()=>{
    return axios.get(`${API}/user/getAll`,{
        headers:{
            'Content-Type':'application/json'
        }
    })
}

export const editUser=(data, userId)=>{
    console.log(`${API}/user/edit/${userId}`)
    return axios.put(`${API}/user/edit/${userId}`,data,{
        headers:{
            'Content-Type':'application/json'
        }
    })
}

export const deleteUserApi=(userId)=>{
    return axios.delete(`${API}/user/delete/${userId}`,{
        headers:{
            'Content-Type':'application/json'
        }
    })
}