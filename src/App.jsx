import HomePage from "./Pages/HomePage";
import GalleryPage from "./Pages/GalleryPage";
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import LayoutPage from './Pages/LayoutPage';
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";

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
      }
    ]
  }
])


function App() {
  
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
