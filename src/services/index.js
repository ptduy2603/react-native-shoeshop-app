import axios from "axios"
const baseUrl = 'http://10.0.2.2:8000'
// this folder contain all of fucntions to interact with external api

// AUTH APIs
// Create new user api (Sign up)
export const createNewUser = (user) => {
   return axios.post(`${baseUrl}/users/register`, user)    
}

// Login with email and password
export const loginApp = (user) => {
   return axios.post(`${baseUrl}/users/login`, user)
}

// Get sigle user information
export const fetchUser = (token) => {
   return axios.get(`${baseUrl}/users/${token}`)
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

//Get all of users from database 
export const getUsers = () => {
   return axios.get(`${baseUrl}/users`)
}

// detete account 
export const deleteAccount = (token) => {
   return axios.post(`${baseUrl}/users/delete-account`, { token })
}

// adjust passowrd
export const adjustPassword = (token, password, newPassword) => {
      return axios.post(`${baseUrl}/users/adjust-password`, { token, password, newPassword })
}

// COUNTRY APIs
export const fetchCountryApi = (query) => {
   return axios.get(`${baseUrl}/country?${query}`)
}

// PRODUCT APIs
// Add new product into database
export const addProductToDatabase = (product) => {
   return axios.post(`${baseUrl}/products/addproduct`, { product })
}

// Fetch all products from database sorting by categories
export const fetchProductsFromServer = () => {
   return axios.get(`${baseUrl}/products`)
}

// CART APIs
// Add product to cart 
export const addProductToCart = (token, product) => {
   return axios.post(`${baseUrl}/cart/add-product`, { token, product })
}

// Fetch cart 
export const fetchCart = (token) => {
   return axios.get(`${baseUrl}/cart/${token}`)
}

//Categories APIs
// get all of categories from database
export const fetchCategories = () => {
   return axios.get(`${baseUrl}/categories`)
}

