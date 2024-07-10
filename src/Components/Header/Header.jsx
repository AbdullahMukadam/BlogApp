import React,{useState} from 'react'
import {LogoutBtn} from "../Index.js"
import {Logo} from "../Index.js"
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Header = () => {
  const authStatus = useSelector((state)=>state.auth.status)
  
  const navigate=useNavigate()
  
    // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };
  
  const NavItem=[
    {
      name:"Home",
      slug:"/",
      active:true
    },
    {
      name:"Signup",
      slug:"/signup",
      active: !authStatus
    },
    {
      name:"Login",
      slug:"/login",
      active:!authStatus
    },
    {
      name:"All-Post",
      slug:"/all-posts",
      active:authStatus
    },
    {
      name:"Add-Post",
      slug:"/add-post",
      active:authStatus
    }
    ]
    
  return (
    <div className='bg-white dark:bg-gray-900 flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white rounded-xl border-2 border-gray-600'>
      {/* Logo */}
      

      {/* Desktop Navigation */}
      <ul className='hidden md:flex'>
        {NavItem.map(item => (
          item.active ? (
            <button
            key={item.name}
            onClick={()=>navigate(item.slug)}
            className='p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black font-serif'
          >
            {item.name}
          </button>
            ) :null
        ))}
        {authStatus && <LogoutBtn/>}
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? 'fixed md:hidden right-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-gradient-to-r from-slate-900 to-slate-700 ease-in duration-800 '
            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
        }
      >
        {/* Mobile Logo */}


        {/* Mobile Navigation Items */}
        {NavItem.map(item => (
         item.active ? (
           <button
            key={item.name}
            onClick={()=>navigate(item.slug)}
            className='p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600 m-2 font-serif'
          >
            {item.name}
          </button>
           ) : null 
        ))}
        {authStatus && 
        <LogoutBtn />
        }
      </ul>
    </div>
  )
}

export default Header