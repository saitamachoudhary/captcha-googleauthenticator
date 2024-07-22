import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import Login from './components/Login';
import User from "./components/User";
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const createRouter=createBrowserRouter([
    {
      path:'/',
      element:<Login/>
    },
    {
      path:'/user',
      element:<User/>
    }
  ])
  return (
  <GoogleOAuthProvider clientId="1020011523699-36sv2u511i77ngek117t5ke7jpq9005r.apps.googleusercontent.com">
   <RouterProvider router={createRouter}/>
  </GoogleOAuthProvider>
  )
}

export default App;


