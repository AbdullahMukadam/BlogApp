import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../Store/AuthSlice.js'
import {Button} from "./Index.js"
import {Input} from "./Index.js"
import {useDispatch} from "react-redux"
import authservice from "../Appwrite/Auth.js"
import {useForm} from "react-hook-form"

const Login = () => {
  const [error, setError] = useState()
  const {register,handleSubmit} = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const login = async (data)=>{
    setError("")
    try{
      const session= await authservice.login(data)
   if(session){
   const User= await authservice.GetCurrentUser()
     if(User) dispatch(authLogin(User))
     navigate("/")
   }
    } catch(error){
      setError(error.message)
    }
    
}

  return (
    <div className="flex justify-center items-center w-full p-1 py-3 shadow-gray-200 ">
    <div className="w-11/12 flex items-center justify-center bg-gray-100 py-10 px-4 rounded md:w-3/5 ">
      <div className="max-w-md w-4/5 space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-700 font-serif">Login into your Account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(login)}>
          <div className="rounded-md shadow-sm -space-y-px  ">
           
            <div>
              
              
              <Input
                label="Email"
                placeholder="Enter your Email"
                type="email"
                {...register("email",{
                  required:true,
                  validate:{
                    matchPatern:(value)=>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email Address must be a valid address",
                  }
                })}
              />
             {error && <p className="text-red-400 text-center">{error}</p>}
            </div>
            <div>
              
              <Input
                label="Password"
                placeholder="Enter your Password"
                type="password"
                {...register("password",{
                  required:true,
                })}
              />
              {error && <p className="text-red-400 text-center">{error}</p>}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Button type="submit" className="bg-blue-500 w-3/5">Sign In</Button>
          </div>
        </form>
        <div className="text-gray-400 text-[14px] text-center transition ease-in duration-100 hover:text-black ">
           <Link to="/signup">Dont have a Account? Click Here</Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login