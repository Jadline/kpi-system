import { Outlet } from "react-router-dom"
import Header from "../../components/header/Header"
import Sidebar from "../../components/sidebar/Sidebar"
import InsightCard from "../../components/insight-card/InsightCard"
import styles from './AppLayout.module.css'
import { useState,useEffect } from "react"

function AppLayout({isdarkmode,setIsDarkMode,opensidebar,setOpenSidebar}){
    
    return (
        <div className={`${styles.appLayout} ${isdarkmode && styles.dark}`}
        style={{'--sidebar-width' : !opensidebar ? "26rem" : '10rem'}}
        
        >
            <Header 
            className={styles.header} 
            opensidebar={opensidebar} 
            setOpenSidebar={setOpenSidebar}
            isdarkmode = {isdarkmode}
            setIsDarkMode ={setIsDarkMode}
            />
            <Sidebar className={styles.sidebar} opensidebar={opensidebar} setOpenSidebar={setOpenSidebar}/>
            <InsightCard className={styles.card}/>
           <main>
            <Outlet/>
           </main>
        </div>
    )
}
export default AppLayout 