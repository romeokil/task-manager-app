import React,{useState,useEffect} from 'react'
import { useParams,Link,useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSadTear } from '@fortawesome/free-solid-svg-icons';
import Backbutton from '../components/Backbutton';
import { useTheme } from '../ThemeContext';
import Sorrymessage from './Sorrymessage';
export default function Mytodo(){
    const colours=['green','yellow','pink','blue','red','orange','zinc','violet','lime'];
    const Navigate=useNavigate();
    const {id}=useParams();
    const [userTodo,setuserTodo]=useState('');
    const {isDarkMode}=useTheme();
    useEffect(()=>{
        async function gettodo(){
            let response=await fetch(`https://mern-todo-wmhj.onrender.com/api/todo/getalltodoforid/${id}`);
            if(response.ok){
                let data=await response.json();
                setuserTodo(data);
            }
        }
        gettodo();
    },[])
    function backtopreviouspage(){
        Navigate('/');
    }
    return (
        <>   
            <div>
            <h1 className={`text-center ${isDarkMode?'bg-slate-900 text-white':'text-slate-900 '} text-3xl sm:text-4xl font-bold p-2 underline`}>Your Task</h1>
            <Backbutton onClick={backtopreviouspage} className='bg-slate-950 text-white rounded-md mb-3 ml-2 p-2 text-sm'>
                Back to Prev Page
            </Backbutton>
            </div>
            {!userTodo || userTodo.length===0 && 
                <>
                {/* sorry bhaiya ek bhi ni hai */}
                   
                <Sorrymessage/>
                </>
            }
            <div className={`w-full h-screen ${isDarkMode?'bg-slate-900':''}`}>
                <div className="flex flex-wrap justify-center gap-6 p-4">
                    {userTodo && userTodo.length>0 && userTodo.map((todo)=>(
                        <>
                            <div key={todo._id}className={`bg-${colours[Math.floor(Math.random()*8+1)]}-300 shadow-lg border rounded-lg p-6 max-w-md mx-auto hover:shadow-xl transition-shadow`}>
                                <div className="text-xl font-bold text-gray-800 mb-2">{todo.title}</div>
                                <div className="text-gray-600 mb-2">{todo.description}</div>
                                <Link to={`/detail/${todo._id}`} className='bg-orange-200 hover:bg-orange-300 my-4 text-black rounded-xl text-xs p-2'>Show more Operations
                                    <span>
                                    {/* <FontAwesomeIcon icon={faCompass} /> */}
                                    <FontAwesomeIcon className='ml-1' icon={faBars} />
                                    </span>
                                </Link>
                            </div>
                        </>
                    ))}
                </div>
            </div>
           
        </>
    )
}