import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import service from "../Appwrite/Conf.js"
import parse from "html-react-parser"


const PostCard = ({$id,title,featuredImage,content}) => {
  const [user, setUser] = useState([])
  
 /* useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await service.getUser(UserId);
        setUser(userDetails);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
  }, [UserId]);
  */
  
  return (
    <Link to={`/post/${$id}`}>
     <div className="w-full h-48 flex gap-3 bg-black p-3 overflow-hidden rounded-xl items-center lg:h-80">
      <div className="w-2/4 h-full">
       <img className="w-full h-full object-cover " src={service.getFilePreview(featuredImage)} alt={title} />
      </div>
      <div className="w-2/4 h-full lg:flex lg:items-center">
       <h2 className="text-[12px] text-white mt-8 font-mono lg:text-2xl">{parse(content)}</h2>
       {user && <h2 className="text-[12px] text-right mt-2 text-gray-300 font-serif">{user.name}</h2>}
      </div>
    </div>
    </Link>
    
  )
}

export default PostCard