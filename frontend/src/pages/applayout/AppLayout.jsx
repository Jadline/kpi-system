import { Outlet } from "react-router-dom"
import Header from "../../components/header/Header"
import Sidebar from "../../components/sidebar/Sidebar"
import InsightCard from "../../components/insight-card/InsightCard"
import styles from './AppLayout.module.css'
import { useState } from "react"

function AppLayout(){
    const [opensidebar,setOpenSidebar] = useState(false)
    return (
        <div className={styles.appLayout}
        style={{'--sidebar-width' : !opensidebar ? "26rem" : '10rem'}}
        
        >
            <Header className={styles.header} opensidebar={opensidebar} setOpenSidebar={setOpenSidebar}/>
            <Sidebar className={styles.sidebar} opensidebar={opensidebar} setOpenSidebar={setOpenSidebar}/>
            <InsightCard className={styles.card}/>
           <main>
            <Outlet/>
           </main>
        </div>
    )
}
export default AppLayout 