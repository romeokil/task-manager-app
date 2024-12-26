import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import { useTheme } from './ThemeContext.jsx';
import Sorrymessage from './pages/Sorrymessage.jsx';
export default function Template({todos}){
    const colours=['green','yellow','pink','blue','red','orange','zinc','violet','lime'];
    const {isDarkMode}=useTheme();
    return (
        <>
            <div className='flex flex-wrap gap-6 p-4'>
                {todos && todos.length &&
                    <>
                        {/* hehe */}
                    </>
                }
                {!todos && 
                    <div className='mx-auto my-6'>
                        <Sorrymessage/>
                    </div>
                } 
                {todos && todos.length>0 && todos.map((todo)=>(
                    <>
                        <div key={todo._id} className={`bg-${colours[Math.floor(Math.random()*8+1)]}-300 shadow-lg border rounded-lg p-6 max-w-md mx-auto hover:shadow-xl transition-shadow`}>
                            <div className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-800 mb-2">{todo.title}</div>
                            <div className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-3 md:mb-4 lg:mb-5">{todo.description}</div>
                            <Link to={`/detail/${todo._id}`} className='bg-orange-200 hover:bg-orange-300 my-4 text-black rounded-xl p-2 text-sm sm:text-base md:text-lg lg:text-xl'>Show more Operations
                                <span>
                                {/* <FontAwesomeIcon icon={faCompass} /> */}
                                <FontAwesomeIcon className='ml-2 md:ml-3 text-sm sm:text-base md:text-lg lg:text-xl' icon={faBars} />
                                </span>
                            </Link>
                        </div>
                    </>
                ))}
                
            </div>
        </>
    )
}