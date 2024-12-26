import React,{useState} from "react";
import {useNavigate} from 'react-router-dom'
import { Bounce,ToastContainer, toast } from 'react-toastify';
import Backbutton from '../components/Backbutton.jsx'
import {useTheme} from '../ThemeContext.jsx'
export default function CreatTodo(){
    const [title,settitle]=useState('');
    const [description,setdescription]=useState('');
    const Navigate=useNavigate();
    const {isDarkMode}=useTheme();
    async function onhandleSubmit(ev){
        ev.preventDefault();
        console.log(title);
        console.log(description);
        let response=await fetch('http://localhost:5000/api/todo/createtodo',{
            method:'POST',
            body:JSON.stringify({title,description}),
            headers:{
                'Content-Type':'Application/JSON',
            },
            credentials:'include'
        })
        if(response.ok){
            // alert('Task Created Successfully!!');
            toast.success('🦄 Task Created Successfully!!!', {
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
            Navigate('/');
        }
        else if(response.status===404){
            // alert('Task Creation Failed!!!')
            toast.error('🦄 Sorry Task Creation Failed!!!', {
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
            // alert('Error while creating Task!!')
            toast.warn('🦄 Error while creating Task!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                })
        }
    }
    function backtopreviouspage(){
        Navigate('/')
    }
    return (
        <>
            <h1 className={`text-center text-3xl sm:text-4xl ${isDarkMode?'text-white bg-slate-900':'text-slate-900'} font-bold underline p-2`}>Create Task</h1>
            <Backbutton onClick={backtopreviouspage}></Backbutton>
            <div className={`w-full h-screen ${isDarkMode?'bg-slate-900':''}`}>
                <form onSubmit={onhandleSubmit} className='w-3/4 rounded-xl mx-auto flex flex-col bg-pink-200 p-6'>
                    <input onChange={(ev)=>settitle(ev.target.value)} className='m-3 p-2 bg-slate-100 rounded-sm' type="text" placeholder="Enter Your title"/>
                    <input onChange={(ev)=>setdescription(ev.target.value)} className='m-3 p-2 bg-slate-100 roundex-sm' type="text" placeholder="Enter Your description"/>
                    <button className='p-2 m-3 rounded-lg bg-pink-400 hover:bg-pink-800 hover:text-white'>
                        Create
                    </button>
                </form>
            </div>
           
        </>
    )
}