import {useEffect} from 'react'
import { useParams,useNavigate } from "react-router-dom";
import { Bounce,ToastContainer, toast } from 'react-toastify';
export default function DeleteTodo(){
    const {id}=useParams();
    const Navigate=useNavigate();
    useEffect(()=>{
        async function deletetask(){
            let response = await fetch(`http://localhost:5000/api/todo/deletetodo/${id}`,{
                method:'DELETE',
                headers:{
                    'Content-Type':'Application/JSON'
                },
                credentials:'include'
            })
            if(response.ok){
                // alert('Todo Deleted Successfully!!!');
                toast.success('🦄 Task Deleted Successfully!', {
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
            else if(response.status===300){
                // alert('Sorry but you need to login First');
                toast.warn('🦄 Sorry but you need to login First!', {
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
                Navigate(`/detail/${id}`)
            }
            else if(response.status===404){
                // alert('Sorry but you are not the Author');
                toast.error('🦄 Sorry you are not the Owner,Cannot Delete!', {
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
                Navigate(`/detail/${id}`)
            }
            else{
                // alert('Sorry Todo not deleted!! You first Need to logged in')
                toast.info('🦄 Sorry Todo not deleted for some reason!', {
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
                Navigate(`/detail/${id}`)
            }
        }
        deletetask();
    },[])
    return (
        <>

        </>
    )
}