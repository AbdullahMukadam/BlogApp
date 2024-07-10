import React, {useEffect,useState} from 'react'
import Header from "./Components/Header/Header.jsx"
import Footer from "./Components/Footer/Footer.jsx"
import authservice from "./Appwrite/Auth.js"
import {login,logout} from "./Store/AuthSlice.js"
import {useDispatch} from "react-redux"
import {Outlet} from "react-router-dom"

const App = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  
  useEffect(() => {
    authservice.GetCurrentUser().then((UserData)=>{
      if(UserData){
        dispatch(login({UserData}))
      } else{
        dispatch(logout())
      }
    })
    .finally(()=>setLoading(false))
  }, [])
  
  return !loading ? (
    <div className="w-screen min-h-screen bg-gradient-to-r from-slate-900 to-slate-700">
     <div className="w-full h-full">
      <Header />
       <Outlet />
      <Footer />
     </div>
    </div>
    ) : null
}

export default App