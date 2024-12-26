import Header from "../components/Header.jsx"
import Template from "../Template.jsx"
import { useEffect,useState } from "react"
import { useTheme } from "../ThemeContext.jsx";
export default function IndexPage(){
    const [todos,settodos]=useState(null);
    const {isDarkMode}=useTheme();
        useEffect(()=>{
            async function gettodo(){
                let response=await fetch('http://localhost:5000/api/todo/getalltodo');
                let data=await response.json();
                console.log(data);
                settodos(data);
            }
            gettodo();
         },[])
    return (
       
        <>
            <Header/>
            <div className={`${isDarkMode?'bg-slate-900':''} w-full h-full`}>
                <Template todos={todos}/>
            </div>
            
        </>
    )
}