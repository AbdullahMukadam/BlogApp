import React,{useEffect,useState} from 'react'
import {useParams ,useNavigate ,Link} from "react-router-dom"
import service from "../Appwrite/Conf.js"
import parse from "html-react-parser"
import {useSelector} from "react-redux"
import {Button} from "../Components/Index.js"

const Post = () => {
  const [post, setPost] = useState(null)
  const userData = useSelector((state)=> state.auth.UserData)
  const isAuthour = post && userData ? post.UserId === userData.$id : false;
  
  const { slug } = useParams()
  const navigate = useNavigate()
  
  useEffect(() => {
    if(slug) {
      service.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
    } else navigate("/")
    
  }, [slug,navigate])
  
  const deletepost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
        
    };
  
  return post ? (
    <div className="w-screen bg-gradient-to-r from-slate-400 to-slate-700 p-4 rounded mt-3 mb-3 md:w-4/5 md:mx-auto">
       <div className="w-full p-4 flex flex-col">
         <img className="rounded-xl w-full  bg-contain" src={service.getFilePreview(post.featuredImage)} alt={post.title} />
         <h1 className="font-mono text-center text-xl">{parse(post.content)}</h1>
          {isAuthour && <div className="flex justify-center gap-5 mt-3">
           <Link to={`/edit-post/${post.$id}`}>
           <Button
           className="bg-blue-500"
           >EditPost</Button>
         </Link>
           <Button 
           onClick={deletepost}
           className="bg-green-500"
           >DeletePost</Button>
         </div> 
          }
       </div>
    </div>
  ) : null
}

export default Post