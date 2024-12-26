import Header from "../components/Header.jsx";
import { Link, } from "react-router-dom";
import {useState,useEffect,useContext} from 'react'
import { Bounce,ToastContainer, toast } from 'react-toastify';
import { UserContext } from "../UserContext.jsx"
import { useNavigate } from "react-router-dom";
import Backbutton from "../components/Backbutton.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheck} from '@fortawesome/free-solid-svg-icons'
import { useTheme } from "../ThemeContext.jsx";
export default function Login(){
    const [username,setusername]=useState('');
    const [password,setpassword]=useState('');
    const {userInfo,setUserInfo}=useContext(UserContext)
    const Navigate=useNavigate();
    const {isDarkMode}=useTheme();
    async function onSubmitHandler(e){
        e.preventDefault();
        console.log(username);
        console.log(password);
        let response=await fetch('http://localhost:5000/api/auth/login',{
            method:'POST',
            body:JSON.stringify({username,password}),
            headers:
            {'Content-Type':'Application/JSON'},
            credentials:'include'
        })
        if(response.ok){
            let data=await response.json();
            // alert('Logged in Successful!!!!')
            toast.success('🦄 Login Successful!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
            Navigate('/')
            setUserInfo(data);
            console.log(data)
        }
        else {
            toast.error('🦄 Sorry Login Unsuccessful!', {
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
    return(
        <>
        <Header/>
        <Backbutton onClick={backtopreviouspage}/>
        <div className={`w-full h-screen ${isDarkMode?'bg-slate-900':''}`}>
            <form className='rounded-xl w-3/4 m-auto bg-green-200 flex flex-col p-5' onSubmit={onSubmitHandler}>
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
                className='p-2 m-3 rounded-lg bg-green-400 hover:bg-green-800 hover:text-white'
                >
                Submit
                <span><FontAwesomeIcon className='ml-2' icon={faCheck} /></span>
                </button>
                <h1 className='text-center'>Not yet signed In ? <Link to="/register" className='hover:font-semibold hover:underline hover:decoration-solid hover:cursor-pointer'>Register Here</Link></h1>
            </form>
        </div>
        
        </>
    )
}