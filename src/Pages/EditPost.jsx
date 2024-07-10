import React,{useEffect,useState} from 'react'
import {useParams,useNavigate} from "react-router-dom"
import service from "../Appwrite/Conf.js"
import {PostForm} from "../Components/Index.js"

const EditPost = () => {
  const {slug} = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  
  useEffect(() => {
    service.getPost(slug).then((post)=>{
      if(post){
        setPost(post)
      } else{
        navigate("/")
      }
    })
  }, [slug,navigate])
  
  return post ? (
    <div className="">
      <PostForm post={post}/>
    </div>
  ) : null
}

export default EditPost