const Config ={
  AppwriteUrl:String(import.meta.env.VITE_APPWRITE_BLOG_URL),
  ProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  DatabaseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  CollectionId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  BucketId:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  Apikey:String(import.meta.env.VITE_TINYMCE_APIKEY),
  AppwriteKey:String(import.meta.env.VITE_APPWRITE_APIKEY)
}

export default Config