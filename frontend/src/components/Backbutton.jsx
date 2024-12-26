import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { useTheme } from "../ThemeContext";
export default function Backbutton({onClick}){
    const {isDarkMode}=useTheme();
    return (
        <> 
            <div className={`w-full ${isDarkMode?'bg-slate-900':''}`}>
                <button onClick={onClick} className={`${isDarkMode?'bg-slate-300 text-black':'bg-slate-950 text-white'} rounded-md m-6 ml-2 p-2 text-sm sm:text-base md:text-lg lg:text-xl`}>
                    <span><FontAwesomeIcon className='mr-2' icon={faArrowLeft} /></span>
                    Back to Prev Page
                </button>
            </div>
        </>
    )
}