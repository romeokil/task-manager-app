import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Bounce,ToastContainer, toast } from 'react-toastify';
export default function Logout(){
    const Navigate=useNavigate();
    useEffect(()=>{
        async function logout(){
            let response=await fetch('http://localhost:5000/api/auth/logout',{
                method:'POST',
                header:{
                    'Content-Type':'Application/JSON'
                },
                credentials:'include'
            })
            if(response.ok){
                // alert('Logout Successful!!!')
                toast.success('🦄 Yeah Logout Successful!', {
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
                let data=await response.json();
                console.log(data);
            }
            else{
                // alert('Sorry!! Logout Unsuccessful!!!!')
                toast.error('🦄 Sorry Logout Unsuccessful!', {
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
        logout();
    },[])
    return (
        
        <>

        </>
    )
}