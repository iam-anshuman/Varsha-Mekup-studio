import HomePage from "./Pages/HomePage";
import GalleryPage from "./Pages/GalleryPage";
import { createBrowserRouter,RouterProvider,redirect } from 'react-router-dom';
import LayoutPage from './Pages/LayoutPage';
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import ErrorPage from "./Pages/ErrorPage";
import MyProfile from "./Pages/MyProfile";
import PrivateRoute from "./Pages/PrivateRoute";
import AdminPanelLayout from "./Pages/AdminPanelLayout";
import IssueCertificate from "./Component/IssueCertificate";
import  AdminLogin from "../src/Component/AdminLogin"
import Dashboard from "./Component/Dashboard";
import Users from "./Component/Users";
import UserContacted from "./Component/UserContacted";
import AdminUserServices from "./Component/AdminUserServices";
import AdminIssuedCertificate from "./Component/AdminIssuedCertificates";
import ForgetPassword from "./Component/ForgetPassword";

const router = createBrowserRouter([
  {
    path:"/",
    element:<LayoutPage/>,
    children:[
      {
        index:true,
        element:<HomePage/>
      },
      {
        path:"/gallery",
        element:<GalleryPage/>
      },
      {
        path:"/signup",
        element:<SignupPage/>
      },
      {
        path:"/login",
        element:<LoginPage/>
      },
      {
        path:"/forget-password",
        element:<ForgetPassword/>
      },
      {
        path:"/my-profile",
        element:<PrivateRoute/>,
        children:[
          {
            index:true,
            element:<MyProfile/>,
          }
        ]
      },
      {
        path:"*",
        element:<ErrorPage/>
      }
    ],
  },
  {
    path:"/admins-panel",
    element:<AdminPanelLayout/>,
    children:[
      {
        index:true,
        element:<Dashboard/>
      },
      {
        path:"issue-certificate",
        element:<IssueCertificate/>
      },
      {
        path:"certificates-issued",
        element:<AdminIssuedCertificate/>
      },
      {
        path:"login",
        element:<AdminLogin/>
      },
      {
        path:"users",
        element:<Users/>
      },
      {
        path:"user-contacted",
        element:<UserContacted/>
      },
      {
        path:"user-service",
        element:<AdminUserServices/>
      }
      ,{
        path:"*",
        element:<ErrorPage/>
      }
    ],

  }
])


function App({children}) {
  
  return (
    <>
      <RouterProvider router={router}>
        {children}
      </RouterProvider>
    </>
  )
}

export default App;
