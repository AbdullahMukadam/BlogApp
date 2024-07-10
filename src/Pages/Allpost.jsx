import React,{useState,useEffect} from 'react'
import service from "../Appwrite/Conf.js"
import {PostCard} from "../Components/Index.js"

const Allpost = () => {
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    service.getPosts([]).then((posts)=>{
      if(posts){
        setPosts(posts.documents)
      }
    })
  }, [])
  
  return (
    <div className="w-screen">
       <div className="w-full p-4 md:flex flex-wrap gap-x-10 p-4 justify-center">
           {posts.map((post)=>(
            <div key={post.$id} className="mb-2 md:w-5/12">
              <PostCard {...post} />
            </div>
            ))}
       </div>
    </div>
  )
}

export default Allpost