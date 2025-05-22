import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Todo from './Todo'
import Register from './register'
import Login from './Login'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Todo />,
  },
  {
    path:"/register",
    element:<Register />
  },
  {
    path:"/login",
    element:<Login />
  }

])
createRoot(document.getElementById('root')).render(
  
  <RouterProvider router={router} />

)
