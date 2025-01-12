import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import  store  from './Store/Store.js'
import { Provider } from 'react-redux'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import {Home,
  AddPost,
  EditPost,
  Allpost,
  LoginPage,
  SignupPage,
  Post,
  AuthLayout
} from "./Components/Index.js"

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
    children:[
      {
        path:"/",
        element: <Home />
      },
      {
        path:"/login",
        element:(
          <AuthLayout authentication={false}>
            <LoginPage />
          </AuthLayout>
          )
      },
      {
        path:"/signup",
        element:(
          <AuthLayout authentication={false}>
            <SignupPage />
          </AuthLayout>
          )
      },
      {
        path:"/add-post",
        element:(
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
          )
      },
      {
        path:"/all-posts",
        element:(
          <AuthLayout authentication>
            <Allpost />
          </AuthLayout>
          )
      },
      {
        path:"/edit-post/:slug",
        element:(
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
          )
      },
      {
        path:"/post/:slug",
        element: <Post />
      },
    ],
  },
  ])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
  </React.StrictMode>,
)
