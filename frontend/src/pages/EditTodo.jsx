import {useState,useEffect} from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import Backbutton from '../components/Backbutton';
import { Bounce,ToastContainer, toast } from 'react-toastify';
import {useTheme} from '../ThemeContext.jsx'
export default function EditTodo(){
    const Navigate=useNavigate();
    const [title,settitle]=useState();
    const [description,setdescription]=useState('');
    const {id}=useParams();
    const {isDarkMode}=useTheme();
    useEffect(()=>{
        async function edittodo(){
            let response=await fetch(`http://localhost:5000/api/todo/gettodo/${id}`);
            if(response.ok){
                let data=await response.json();
                settitle(data.title);
                setdescription(data.description);
                // alert('We got the specific todo for which we want ediiting!!')
            }
            else{
                alert('Error while fetching the data for specific todo for editing')
            }
        }
        edittodo();
    },[])
    
    async function updateHandler(ev){
        ev.preventDefault();
        let response=await fetch(`http://localhost:5000/api/todo/updatetodo/${id}`,{
            method:'PUT',
            body:JSON.stringify({title,description}),
            'headers':
            {
                'Content-Type':'Application/JSON'
            },
            credentials:'include'
        })
        if(response.ok){
            // alert('Todo Updated Successfully!!');
            toast.success('🦄 Task Updated Successful!', {
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
            // alert('Sorry but you Cannot update task, You are not the actual Author')
            toast('🦄 Sorry You are not the Owner,Cannot Edit!!!', {
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
        else if(response.status===300){
            // alert('Sorry but you need to Log in first!!')
            toast.warn('🦄 Sorry but you need to log in first!', {
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
            Navigate(`/update/${id}`)
        }
        else{
            // alert('Todo has not updated bhai kuch dikkat ho gy');
            toast.error('🦄 Sorry Task Has not updated for some reason!', {
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
    }

    function backtopreviouspage(){
        Navigate(`/detail/${id}`)
    }
    return (
        <>
            <h1 className={`text-center text-3xl sm:text-4xl ${isDarkMode?'text-white bg-slate-900':'text-slate-900'} font-bold underline p-2`}>Update Task</h1>
            <Backbutton onClick={backtopreviouspage} className='bg-slate-950 text-white rounded-md mb-3 ml-2 p-2 text-sm'>
                Back to Prev Page
            </Backbutton>
            <div className={`w-full h-screen ${isDarkMode?'bg-slate-900':''}`}>
                <form onSubmit={updateHandler} className='w-3/4 p-6 mx-auto flex flex-col  bg-orange-200 rounded-md'>
                    <input value={title} onChange={(ev)=>settitle(ev.target.value)} className='m-3 p-2 bg-slate-100' type="text" placeholder="Enter Your New/Old title/title"/>
                    <input value={description} onChange={(ev)=>setdescription(ev.target.value)}className='m-3 p-2 bg-slate-100' type="text" placeholder="Enter Your New description/description"/>
                    <button className='p-2 m-3 rounded-lg bg-orange-400 hover:bg-orange-800 hover:text-white'>
                        Update
                    </button>
                </form>
            </div>
            
        </>
    )
}