import React,{useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPen,faTrashCan} from '@fortawesome/free-solid-svg-icons'
import { useParams,Link,useNavigate } from 'react-router-dom';
import Backbutton from '../components/Backbutton';
import {useTheme} from '../ThemeContext.jsx'

export default function Detail(){
  const [specifictodo,setspecifictodo]=useState('');
  const {id}=useParams();
  const Navigate=useNavigate();
  const {isDarkMode}=useTheme();
  useEffect(()=>{
    console.log(id);
    async function getspecifictodo(){
      let response=await fetch(`http://localhost:8000/api/todo/gettodo/${id}`);
      let data=await response.json();
      setspecifictodo(data);
    }
    getspecifictodo();
  },[])
  function backtopreviouspage(){
    console.log("clicked")
    Navigate(`/`)
  }
    return(
        <>
          <h1 className={`text-center ${isDarkMode?'text-white bg-slate-900':'text-black'} font-bold text-3xl sm:text-4xl p-2 underline`}>Specific Task</h1>
            <Backbutton onClick={backtopreviouspage}/>
            <div className={`w-full h-screen ${isDarkMode?'bg-slate-900':''}`}>
              <div className='w-3/5 mx-auto bg-red-400 rounded-xl'>
              <div className='w-full flex-row justify-center items-center p-4'>
                  {/* for title  */}
                  <div className='text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-800 mb-2 text-center'>
                      {specifictodo.title}
                  </div>
                  {/* for button edit and delete */}
                  <div className='flex flex-col'>
                      <Link to={`/update/${id}`} className='text-black bg-yellow-200 m-1 rounded-md text-center'>Edit
                        <span>
                        <FontAwesomeIcon className='ml-6' icon={faPen} />
                        </span>
                      </Link>
                      <Link to={`/delete/${id}`} className='text-black bg-red-200 m-1 rounded-md text-center'>Delete
                        <span>
                        <FontAwesomeIcon className='ml-2' icon={faTrashCan} />
                        </span>
                      </Link>
                  </div>
                  {/* for description */}
                  <div className='text-white text-sm sm:text-base md:text-lg lg:text-xl text-center'>
                      {specifictodo.description}
                  </div>
              </div>
              </div>
            </div>
            
        </>
    )
}