import { useContext } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import ChangePass from './AuthModule/Components/ChangePass/ChangePass';
import Login from './AuthModule/Components/Login/Login';
import ResetPass from './AuthModule/Components/ResetPass/ResetPass';
import ResetPassRequest from './AuthModule/Components/ResetPassRequest/ResetPassRequest';
import { AuthContext } from './Context/AuthContext';
import Home from './HomeModule/Components/Home/Home';
import FavoritesList from './RecipesModule/Components/RecipesList/FavoritesList';
import RecipesList from './RecipesModule/Components/RecipesList/RecipesList';
import AuthLayout from './SharedModule/Components/AuthLayout/AuthLayout';
import MasterLayout from './SharedModule/Components/MasterLayout/MasterLayout';
import NotFound from './SharedModule/Components/NotFound/NotFound';
import ProtectedRoute from './SharedModule/Components/ProtectedRoute/ProtectedRoute';
import Registeration from './AuthModule/Components/Registeration/Registeration';



function App() {
let {userData,saveUserData} = useContext(AuthContext)
  const routes = createBrowserRouter([
    {
      path: 'dashboard',
      element: (
        <ProtectedRoute userData={userData}>
          <MasterLayout userData={userData} />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "recipes", element: <RecipesList /> },
        { path: "favourites", element: <FavoritesList /> },
        
       
      ]
    },
    {
      path: "/",
      element: 
      
        <AuthLayout />
      ,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login saveUserData={saveUserData} /> },
        { path: "login", element: <Login saveUserData={saveUserData} /> },
        { path: "change-password", element: <ChangePass /> },
        { path: "reset-pass", element: <ResetPass /> },
        { path: "reset-pass-request", element: <ResetPassRequest /> },
        { path: "registeration", element: <Registeration/> },
        
 


      ]
    }
  ])

  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes} />
    </>
  )
}

export default App
