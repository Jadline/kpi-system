import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import InsightCard from "../../components/insight-card/InsightCard";
import styles from "./AppLayout.module.css";
import { useState, useEffect } from "react";
import { useUI } from "../../context/UI-Context";
import SubHeader from "../../components/subheader/SubHeader";

function AppLayout() {
  const { opensidebar } = useUI();

  return (
    <div
      className={`${styles.appLayout}`}
      style={{ "--sidebar-width": !opensidebar ? "26rem" : "10rem" }}
    >
      <Header className={styles.header} />
      <SubHeader className={styles.subheader} />
      <Sidebar className={styles.sidebar} />
      <InsightCard className={styles.card} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
export default AppLayout;
