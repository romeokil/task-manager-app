import { Link,useNavigate } from "react-router-dom"
import { UserContext } from "../UserContext"
import { useContext,useEffect } from "react"
import { Bounce,ToastContainer, toast } from 'react-toastify';
import ThemeSwitch from "./ThemeSwitch.jsx";
import { useTheme } from "../ThemeContext.jsx";
export default function Header(){
    const Navigate=useNavigate();
    const {userInfo,setuserInfo}=useContext(UserContext);
    console.log("userinfo----->",userInfo);
    console.log("setuserInfo ka type",typeof setuserInfo)
    const {isDarkMode}=useTheme();
    // /profie backend route ko fetch call maaro pata chal jaega user hai ki ni.
    useEffect(()=>{
        async function main(){
            let response=await fetch('http://localhost:8000/api/auth/profile',{
                method:'GET',
                headers:
                {
                    'Content-Type':'Application/JSON'
                },
                credentials:'include'
            });
            let data=await response.json();
            console.log("console wala",data)
            setuserInfo(data);
        }
        main();
    },[setuserInfo])

    async function logout(){
        let response=await fetch('http://localhost:8000/api/auth/logout',{
               method:'POST',
               credentials:'include' 
        })
        if(response.ok){
            setuserInfo(null);
            // alert('Logout Successful!!!');
            toast.success('🦄 Yeah Logout Successful!', {
                position: "top-right",
                autoClose: 5000,
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
            // alert('Sorry Logout Unsuccessfull!!')
            toast.error('🦄 Sorry Logout Unsuccessful!', {
                position: "top-right",
                autoClose: 5000,
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
            // alert('Error while logging out!!')
            toast.warn('🦄 Error while logging out!', {
                position: "top-right",
                autoClose: 5000,
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
    const username=userInfo?.username;
    const userId=userInfo?.id;
    // console.log("username",username)
    return (
        <>
            <div className={`flex justify-between p-4 ${isDarkMode?'bg-slate-900':''}`}>
            <Link to="/" className='text-sm sm:text-base md:text-lg lg:text-xl font-bold  text-blue-400 '>Task App</Link>
            <div>
                <ThemeSwitch/>
            </div>
            {!username && 
                <>
                    <div className='flex justify-between gap-4 font-semibold text-slate-800'>
                        <Link to="/login" className={`${isDarkMode?'text-yellow-300':'text-yellow-700'} text-sm sm:text-base md:text-lg lg:text-xl`}>Login</Link>
                        <Link to="/register" className={`${isDarkMode?'text-yellow-300':'text-yellow-700'} text-sm sm:text-base md:text-lg lg:text-xl`}>Register</Link>
                    </div>
                </>
            }
            {username && 
                <>
                    <div className='flex items-center justify-between gap-1 md:gap-3 lg:gap-4 font-semibold text-slate-800'>
                        <Link to={`/mytask/${userId}`} className={`${isDarkMode?'text-yellow-300':'text-yellow-700'} text-sm sm:text-base md:text-lg lg:text-xl`}>My Task</Link>
                        <Link to="/create" className={`${isDarkMode?'text-yellow-300':'text-yellow-700'} text-sm sm:text-base md:text-lg lg:text-xl`}>Create New Task</Link>
                        <button onClick={logout} className={`${isDarkMode?'text-yellow-300':'text-yellow-700'} m-0 p-0 text-sm sm:text-base md:text-lg lg:text-xl`}>Logout</button>
                    </div>
                </>
            }
            
        </div>
        </>
    )
}