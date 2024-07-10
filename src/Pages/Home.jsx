import React,{useEffect,useState} from 'react'
import service from "../Appwrite/Conf.js"
import {PostCard} from "../Components/Index.js"

const Home = () => {
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
     service.getPosts([]).then((posts)=>{
       if(posts){
         setPosts(posts.documents)
       }
       })
  }, [])
  
    
  
  if(posts.length === 0){
    return (
      <div className="w-screen bg-gradient-to-r from-slate-900 to-slate-700">
        <div className="w-full flex flex-col items-center">
         <img className="w-1/2" src="https://cdn-icons-png.flaticon.com/512/6478/6478111.png" alt="" />
          <h1 className="text-xl text-gray-300 font-mono font-bold text-center">No Post Available, Please Login to Read Post</h1>
        </div>
         
      </div>
      )
  } 
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

export default Home