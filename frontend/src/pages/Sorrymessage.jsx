import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFaceSadTear} from '@fortawesome/free-regular-svg-icons'
import { useTheme } from '../ThemeContext'
function Sorrymessage() {
    const {isDarkMode}=useTheme();
  return (
        <div className={`flex flex-wrap flex-col justify-between items-center ${isDarkMode?'bg-slate-900':''}`}>
                <h1 className={`text-center text-bold text-2xl sm:text-3xl lg:text-5xl xl:text-7xl underline ${isDarkMode?'text-white':'text-slate-900'}`}>Sorry you don't have any task</h1>
                <h2 className={`text-center text-bold text-2xl sm:text-3xl lg:text-5xl xl:text-7xl  m-4 ${isDarkMode?'text-yellow-200':'text-yellow-500'}`}>You have to create One!!</h2>
                <FontAwesomeIcon className={`${isDarkMode?'text-white':'text-slate-900'} h-12 lg:h-18 xl:h-20 m-4`} icon={faFaceSadTear} />
        </div>
  )
}

export default Sorrymessage