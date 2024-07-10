import React from 'react'
import authservice from "../../Appwrite/Auth.js"
import {useDispatch} from "react-redux"
import {logout} from "../../Store/AuthSlice.js"

const LogoutBtn = () => {
  const dispatch= useDispatch()
  
  const HandleLogout =()=>{
    authservice.logout().then(()=>{
      dispatch(logout())
    })
  }
  return (
    <button
    onClick={HandleLogout}
    className="p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600 m-2">Logout</button>
  )
}

export default LogoutBtn