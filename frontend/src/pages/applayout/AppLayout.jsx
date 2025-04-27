import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import InsightCard from "../../components/insight-card/InsightCard";
import styles from "./AppLayout.module.css";
import { useState, useEffect } from "react";
import { useUI } from "../../context/UI-Context";
import SubHeader from "../../components/subheader/SubHeader";
import { useResize } from "../../reusable-components/useResize";

function AppLayout() {
  const { opensidebar } = useUI();
  const {isMobile,isTablet,isLaptop} = useResize()

  return (
    <>
    <div
    className={`${styles.appLayout}`}
    style={{
      "--sidebar-width": isMobile || isLaptop ||  isTablet ? "0" : opensidebar ? "10rem" : "26rem",
    }}
  >
      <Header className={styles.header} />
      <SubHeader className={styles.subheader} />
      {!isMobile && <Sidebar className={styles.sidebar} />}
      <InsightCard className={styles.card} />
      <main>
        <Outlet />
      </main>
    </div>
    {isMobile && <Sidebar/>}
    </>
  );
}
export default AppLayout;
