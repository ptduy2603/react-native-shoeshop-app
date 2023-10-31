import axios from "axios"
// this folder contain all of fucntions to interact with external api

// Create new user api
export const createNewUser = (user) => {
   return axios.post('http://10.0.2.2:8000/users/register', user)    
}

//Get all users from database 
export const getUsers = () => {
   return axios.get('http://10.0.2.2:8000/users')
}

