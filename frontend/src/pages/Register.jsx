import Header from "../components/Header.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheck} from '@fortawesome/free-solid-svg-icons'
import { Link,useNavigate } from "react-router-dom";
import Backbutton from "../components/Backbutton.jsx";
import { Bounce,ToastContainer, toast } from 'react-toastify';
import { useState } from "react";
import { useTheme } from "../ThemeContext.jsx";
export default function Register(){
    const Navigate=useNavigate();
    const [username,setusername]=useState('');
    const [password,setpassword]=useState('');
    const {isDarkMode}=useTheme();
    async function onSubmitHandler(e){
        e.preventDefault();
        console.log(username);
        console.log(password);
        let response=await fetch('https://mern-todo-wmhj.onrender.com/api/auth/register',{
            method:'POST',
            body:JSON.stringify({username,password}),
            headers:
            {
                'Content-Type':'Application/JSON'
            },
            credentials:'include'
        })
        if(response.ok){
            // alert('Registration Successful')
            toast.success('🦄 Hurray!! Registration Successful!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
            
        }
        else{
            toast.error('🦄 Sorry Registration Unsuccessful!', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
        }
    }
    function backtopreviouspage(){
        Navigate('/');
    }
    return (
        <>
            <Header/>
            <Backbutton onClick={backtopreviouspage}/>
            <div className={`w-full h-screen ${isDarkMode?'bg-slate-900':''}`}>
                <form className='w-3/4 rounded-xl m-auto bg-blue-200 flex flex-col p-5' onSubmit={onSubmitHandler}>
                    <input
                    className='p-3 m-3 rounded-xl bg-slate-100'
                    type="text"
                    placeholder="Enter Your Username"
                    onChange={(e)=>(setusername(e.target.value))}
                    />
                    <input
                    className='p-3 m-3 rounded-xl bg-slate-100'
                    type="text"
                    placeholder="Enter Your Password"
                    onChange={(e)=>(setpassword(e.target.value))}
                    />
                    <button
                    className='p-2 m-3 rounded-lg bg-blue-400 hover:bg-blue-800 hover:text-white'
                    >
                    Submit
                    <span><FontAwesomeIcon className='ml-2' icon={faCheck} /></span>
                    </button>
                    <h1 className='text-center'>Already signed In ? <Link to="/login" className='hover:font-semibold hover:underline hover:decoration-solid hover:cursor-pointer'>Login Here</Link></h1>
                </form>   
            </div>
         
        </>
    )
}   