import axios from "axios"
const baseUrl = 'http://10.0.2.2:8000'
// this folder contain all of fucntions to interact with external api

// Create new user api
export const createNewUser = (user) => {
   return axios.post(`${baseUrl}/users/register`, user)    
}

// Login with email and password
export const loginApp = (user) => {
   return axios.post(`${baseUrl}/users/login`, user)
}

// Request to reset password using email api
export const requestResetPassword = (email) => {
   return axios.post(`${baseUrl}/users/resetpassword`, { email })
}

// Comfirm reset password OTP
export const verifyResetPassword = (token, otp, userId) => {
   return axios.post(`${baseUrl}/users/resetpassword/${userId}/${token}`, { otp })
}

// Reset password after verify
export const resetPassword = (userId, token, password) => {
   return axios.post(`${baseUrl}/users/changepassword/${userId}/${token}`, { password })
}


//Get all users from database 
export const getUsers = () => {
   return axios.get(`${baseUrl}/users`)
}
