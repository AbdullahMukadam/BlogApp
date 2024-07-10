import {Client , Databases , Storage , Query, ID } from "appwrite"
import Config from "../Config/Config.js"

export class Service{
  client = new Client();
  database;
  storage;
  
  constructor(){
     
    this.client
      .setEndpoint(Config.AppwriteUrl) 
      .setProject(Config.ProjectId)
      /*.setKey(Config.AppwriteKey)*/
      
     this.database = new Databases(this.client)
     this.storage = new Storage(this.client)
  }
  
  async createPost({title,featuredImage,content,UserId,status}){
    try{
      return await this.database.createDocument(
        Config.DatabaseId,
        Config.CollectionId,
        ID.unique(),
        {
          title,
          featuredImage,
          content,
          status,
          UserId
        }
        )
    } catch(error){
      console.log("Error in CreatePost",error)
    }
  }
  
  async deletePost(slug){
    try{
      return await this.database.deleteDocument(
        Config.DatabaseId,
        Config.CollectionId,
        slug
        )
    } catch(error){
      console.log("Error in delete Post",error)
    }
  }
  
  async updatePost(slug,{title,featuredImage,content,status}){
    try{
      return await this.database.updateDocument(
        Config.DatabaseId,
        Config.CollectionId,
        slug,
        {
          title,
          featuredImage,
          content,
          status,
        }
        )
    } catch(error){
      console.log("error in updatePost",error)
    }
  }
  
  async getUser(UserId) {
    try {
      return await this.client.users.get(UserId)
    } catch (error) {
      console.log("Error fetching user details:", error)
    }
  }
  
  async getPost(slug){
    try{
      return await this.database.getDocument(
        Config.DatabaseId,
        Config.CollectionId,
        slug
        )
    } catch(error){
      console.log("error in getPost",error)
    }
  }
  
  async getPosts(queries=[Query.equal("status","active")]){
    try{
      return await this.database.listDocuments(
        Config.DatabaseId,
        Config.CollectionId,
        queries
        )
    } catch(error){
      console.log("Error in getPosts",error)
    }
  }
  
  //File upload services
  
  async uploadFile(file){
    try{
      return await this.storage.createFile(
        Config.BucketId,
        ID.unique(),
        file
        )
    } catch(error){
      console.log("Error in uploadFile",error)
    }
  }
  
  async deleteFile(fileId){
    try{
      return await this.storage.deleteFile(
        Config.BucketId,
        fileId
        )
    } catch(error){
      console.log("Error in deleteFile",error)
    }
  }
  
   getFilePreview(fileId){
      return this.storage.getFilePreview(
        Config.BucketId,
        fileId
        )
  }
}

const service = new Service
export default service