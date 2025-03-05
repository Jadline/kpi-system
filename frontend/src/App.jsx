import React from "react";
import {Routes,Route} from 'react-router-dom'
import PerfectOrderRate from "./pages/perfect-order-rate/PerfectOrderRate";
import NumberOfShipments from "./pages/number-of-shipments/NumberOfShipments";
import TransportationCost from "./pages/transportation-cost/TransportationCost";
import ShippingTime from "./pages/shipping-time/ShippingTime";
import AverageDeliveryTime from "./pages/average-delivery/AverageDeliveryTime";
import AppLayout from "./pages/applayout/AppLayout";
import PageNotFound from "./pages/pagenotfound/PageNotFound";
import { useState,useEffect } from "react";
function App() {
  const [opensidebar,setOpenSidebar] = useState(false)
    const [isdarkmode,setIsDarkMode] = useState(() => {
        return localStorage.getItem('darkMode')
    })

    useEffect(() => {       
       if(isdarkmode !== null){
        document.documentElement.classList.toggle('dark-mode')
        localStorage.setItem('darkMode',isdarkmode.toString())

       }
    },[isdarkmode])

  return (
    <Routes>
      <Route element= {<AppLayout 
      isdarkmode={isdarkmode}
      setIsDarkMode={setIsDarkMode}
      opensidebar={opensidebar}
      setOpenSidebar={setOpenSidebar}
      />}>
        <Route path='/' element={<PerfectOrderRate/>}/>
        <Route path='/number-of-shipments' element={<NumberOfShipments/>}/>
        <Route path='/transportation-cost' element={<TransportationCost/>}/>
        <Route path='/shipping-time' element={<ShippingTime isdarkmode={isdarkmode} />}/>
        <Route path='/average-delivery-time' element={<AverageDeliveryTime/>}/>
      </Route>
      <Route 
       path='*' 
       element={<PageNotFound/>}
      />
    </Routes>
  );
}

export default App;
