import { useContext,createContext } from "react"
import {useState,useEffect} from 'react'
const UIContext = createContext()
function  UIProvider ({children}){
     const [opensidebar,setOpenSidebar] = useState(false)
        const [isdarkmode,setIsDarkMode] = useState(() => {
            return localStorage.getItem('darkMode') === 'true'
        })
        const [showdropDown,setshowdropDown] = useState(false)
    
        useEffect(() => {       
           if(isdarkmode !== null){
            document.documentElement.classList.toggle('dark-mode')
            localStorage.setItem('darkMode',isdarkmode.toString())
    
           }
        },[isdarkmode])
        return (
            <UIContext.Provider value={{
                opensidebar,
                setOpenSidebar,
                isdarkmode,
                setIsDarkMode,
                showdropDown,
                setshowdropDown
            }}>
                {children}

            </UIContext.Provider>
        )

}
function useUI(){
    const context = useContext(UIContext)
    if(context === undefined) throw new Error('You might have used the UIcontext outside the UIprovider')
    return context
}
export {useUI,UIProvider} 