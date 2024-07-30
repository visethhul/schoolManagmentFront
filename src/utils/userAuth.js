//const USER_KEY = 'user'
//const TOKENT_KEY = 'token'
//const REFRESH_TOKEN_KEY = 'refreshToken'
//const IS_LOGIN_KEY  = 'isLogin'

export const setUser = (user)=>{
  localStorage.setItem('user_name',JSON.stringify(user))
}

export const getUser = () => {
  return JSON.parse(localStorage.getItem('user'))
}

export const setToken =(token) =>{
 localStorage.setItem('token',token)
}
export const getToken = ()=>{
 return localStorage.getItem('token')

}
export const setRefreshToken = (refreshToken)=>{
 localStorage.setItem('refreshToken',refreshToken)
}
export const getRefreshTokent = ()=>{
 return localStorage.getItem('refreshToken')
}
export const setIsLogin = (isLogin)=>{
 localStorage.setItem('isLogin',JSON.stringify(isLogin))
}
export const getIsLogin=() =>{
  return JSON.parse(localStorage.getItem('isLogin'))
 
}

// function to clear all stored data for logout 
export const Logout=() =>{
 localStorage.removeItem('user')
 localStorage.removeItem('token')
 localStorage.removeItem('refreshToken')
 localStorage.removeItem('isLogin')
 window.location.reload()
}