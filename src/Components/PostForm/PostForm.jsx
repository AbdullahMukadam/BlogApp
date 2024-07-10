import React,{useCallback,useEffect} from 'react'
import {useForm} from "react-hook-form"
import {useSelector} from "react-redux"
import service from "../../Appwrite/Conf.js"
import {RTE,Select,Button,Input} from "../Index.js"
import {useNavigate} from "react-router-dom"


const PostForm = ({post}) => {
  const userData=useSelector((state)=>state.auth.UserData)
  
  const navigate = useNavigate()
  const {register,handleSubmit,control,getValues,setValue,watch} = useForm({
    defaultValues:{
      content:post?.content || "",
      title:post?.title || "",
      status:post?.status || "active",
      slug:post?.$id || "",
    },
  })
  
  const SlugTransform= useCallback((value)=>{
    if(value && typeof value==="string"){
      return value
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z\d\s]+/g, "-")
      .replace(/\s/g, "-");
    }
  },[])
  
  useEffect(() => {
    const subscription = watch((value,{name})=>{
      if(name === "title"){
        setValue("slug",SlugTransform(value.title,{shouldValidate:true}))
      }
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [watch,SlugTransform,setValue])
  
  
  const submit =async (data)=>{
    if(post){
     const delfile= service.deleteFile(post.featuredImage)
    
    if(delfile){
    const newfile= data.image[0] ? await service.uploadFile(data.image[0]) : null;
    
    const dBPost= await service.updatePost(post.$id,{
      ...data,
      featuredImage : newfile ? newfile.$id : undefined
    })
    
    if(dBPost){
      navigate(`/post/${dBPost.$id}`)
    }
    }
    } else{
      const file =await service.uploadFile(data.image[0])
      if(file){
        const fileId = file.$id
        data.featuredImage = fileId
      const dBpost= await service.createPost({
          ...data,
          UserId: userData.$id,
        })
        if(dBpost){
          navigate(`/post/${dBpost.$id}`)
        }
      }
    }
    
  }
  
  return (
    <form onSubmit={handleSubmit(submit)}>
       <div className="bg-gradient-to-r from-slate-900 to-slate-700 w-full p-4 rounded-xl md:flex lg:flex">
         <div className="w-full p-5">
           <Input 
           type="text"
           placeholder="Enter your Title"
           label="Title:"
           {...register("title",{
             required:true
           })}
           />
           
           <Input 
           type="text"
           placeholder="Dont type anything here"
           label="Slug:"
           {...register("slug",{
             required:true
           })}
           onInput={(e)=>{
             setValue("slug",SlugTransform(e.currentTarget.value),{shouldValidate:true})
           }}
           />
           
           <RTE 
           control={control}
           label="Content:"
           name="content"
           defaultValue={getValues("content")}
           />
         </div>
         <div className="w-full p-5">
           <Input 
           type="file"
           label="Image:"
           accept="image/png, image/jpg, image/jpeg, image/gif"
           {...register("image",{
             required: !post
           })}
           />
           {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
           
           <Select
           options={["active","inactive"]}
           label="Status:"
           
           {...register("status",{
             required:true
           })}
           />
           
           <Button
           className="bg-blue-600 w-full mt-5"
           type="submit"
           >{post ? "Update" : "Submit"}</Button>
           
         </div>
       </div>
    </form>
  )
}

export default PostForm