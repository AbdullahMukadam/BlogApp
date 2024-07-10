import { Client, Account, ID } from "appwrite";
import Config from "../Config/Config.js"

export class AuthService{
  client = new Client();
  account;
  
  constructor(){
    this.client
       .setEndpoint(Config.AppwriteUrl) 
       .setProject(Config.ProjectId);       
     this.account = new Account(this.client)
  }
  
  async createAccount({name,email,password}){
    try{
    const CreatedAccount= await this.account.create(
        ID.unique(),
        email,
        password,
        name
        )
        if(CreatedAccount){
          return this.login({email,password})
        } else{
          return CreatedAccount
        }
    } catch(error){
      console.log("Error in createAccount", error)
    }
  }
  
  async login({email,password}){
    try{
      return await this.account.createEmailPasswordSession(email,password)
    } catch(error){
      console.log("Error in login", error)
    }
  }
  
  async logout(){
    try{
      return await this.account.deleteSessions()
    } catch(error){
      console.log("Error in logout",error)
    }
  }
  
  async GetCurrentUser(){
    try{
      return await this.account.get()
    } catch(error){
      console.log("Error in GetCurrentUser", error)
    }
  }
}

const authservice = new AuthService
export default authservice