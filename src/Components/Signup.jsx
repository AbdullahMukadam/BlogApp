import React,{useState} from 'react'
import {Input,Button} from "./Index.js"
import {useForm} from "react-hook-form"
import {Link} from "react-router-dom"
import authservice from "../Appwrite/Auth.js"
import {useDispatch} from "react-redux"
import {login} from "../Store/AuthSlice.js"
import {useNavigate} from "react-router-dom"

const Signup = () => {
  const {register,handleSubmit} = useForm()
  const [error, setError] = useState()
  const dispatch = useDispatch()
  const navigate=useNavigate()
  
  
  const signup = async (data)=>{
    setError("")
    try{
   const UserData= await authservice.createAccount(data)
      if(UserData){
        const User =await authservice.GetCurrentUser()
        if(User) dispatch(login(User))
          navigate("/")
       }
   } catch(error){
      setError(error.message)
    }
 }
  
  return (
    <div className="flex justify-center items-center w-full p-1 py-3 shadow-gray-200 ">
    <div className="w-11/12 flex items-center justify-center bg-gray-100 py-10 px-4 rounded md:w-3/5">
      <div className="max-w-md w-4/5 space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-700 font-serif">Sign up for an account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(signup)}>
          <div className="rounded-md shadow-sm -space-y-px  ">
            <div >
              
              <Input
              label="Name"
              placeholder="Enter your Full Name"
              type="text"
              {...register("name",{
                required:true,
              })}
              />
              {error && <p className="text-red-400 text-center">{error}</p>}
            </div>
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
            <Button type="submit" className="bg-blue-500 w-3/5">Sign Up</Button>
          </div>
        </form>
        <div className="text-gray-400 text-[14px] text-center transition ease-in duration-100 hover:text-black ">
           <Link to="/login">Already have an account? Click Here</Link>
        </div>
      </div>
    </div>
    </div>
  );
};
  


export default Signup