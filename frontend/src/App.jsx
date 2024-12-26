import { useState } from 'react'
import {Route,Routes} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import IndexPage from './pages/IndexPage.jsx'
import CreateTodo from './pages/CreateTodo.jsx'
import EditTodo from './pages/EditTodo.jsx'
import Detail from './pages/Detail.jsx'
import DeleteTodo from './pages/DeleteTodo.jsx'
import Mytodo from './pages/Mytodo.jsx'
import UserContextProvider from './UserContext.jsx'
import './App.css'
import Logout from './pages/Logout.jsx'
import { ThemeContextProvider } from './ThemeContext.jsx';
function App() {
 
  return (
    <>
    <ThemeContextProvider>
      <UserContextProvider>
        <Routes>
          <Route path='/' element={<IndexPage/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/logout' element={<Logout/>}></Route>
          <Route path='/create' element={<CreateTodo/>}></Route>
          <Route path='/mytask/:id' element={<Mytodo/>}></Route>
          <Route path='/update/:id' element={<EditTodo/>}></Route>
          <Route path='/detail/:id' element={<Detail/>}></Route>
          <Route path='/delete/:id' element={<DeleteTodo/>}></Route>
        </Routes>
      </UserContextProvider>
    </ThemeContextProvider>
      <ToastContainer />
        {/* <CreateTodo/> */}
        {/* <EditTodo/> */}

    </>
  )
}

export default App
