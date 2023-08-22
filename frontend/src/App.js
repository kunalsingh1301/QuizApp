
import './App.css';
import Signup from './pages/Signup'
import QuizAdmin from './pages/QuizDetailsPage';
import {createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home';
import QuizTakingPage from './pages/QuizTakingPage';
import Result from './pages/Result';
import { CheckUserExist } from './helper/helper';
import Dashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import QuizForm from './pages/QuizForm';


/* React Routers */
const router = createBrowserRouter([
  {
    path: '/',
    element:<Signup/>
  },
  {
    path: '/quizform',
    element:<QuizForm/>
  },
  {
    path:'/home',
    element:<Home/>
  },
  {
    path:'/quiztaking',
    element:<CheckUserExist><QuizTakingPage/></CheckUserExist>
  },
  {
    path:'/quizresult',
    element:<CheckUserExist><Result/></CheckUserExist>
  },
  {
    path:'/dashboard',
    element:<Dashboard isAdmin={true}/>
  },
  {
    path:'/login',
    element:<Login/>
  }
])

function App() {
  return (
    <>
      <RouterProvider router ={router}/>
    </>
  );
}

export default App;
