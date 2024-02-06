import HomePage from "./Pages/HomePage";
import GalleryPage from "./Pages/GalleryPage";
import { createBrowserRouter,RouterProvider,redirect } from 'react-router-dom';
import LayoutPage from './Pages/LayoutPage';
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import ErrorPage from "./Pages/ErrorPage";
import MyProfile from "./Pages/MyProfile";
import PrivateRoute from "./Pages/PrivateRoute";

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
        path:"/my-profile",
        element:<PrivateRoute/>,
        children:[
          {
            index:true,
            element:<MyProfile/>
          }
        ]
      },
      {
        path:"*",
        element:<ErrorPage/>
      }
    ]
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
