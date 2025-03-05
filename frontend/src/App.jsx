import React from "react";
import {Routes,Route} from 'react-router-dom'
import PerfectOrderRate from "./pages/perfect-order-rate/PerfectOrderRate";
import NumberOfShipments from "./pages/number-of-shipments/NumberOfShipments";
import TransportationCost from "./pages/transportation-cost/TransportationCost";
import ShippingTime from "./pages/shipping-time/ShippingTime";
import AverageDeliveryTime from "./pages/average-delivery/AverageDeliveryTime";
import AppLayout from "./pages/applayout/AppLayout";
import PageNotFound from "./pages/pagenotfound/PageNotFound";
function App() {
  return (
    <Routes>
      <Route element= {<AppLayout/>}>
        <Route path='/' element={<PerfectOrderRate/>}/>
        <Route path='/number-of-shipments' element={<NumberOfShipments/>}/>
        <Route path='/transportation-cost' element={<TransportationCost/>}/>
        <Route path='/shipping-time' element={<ShippingTime/>}/>
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
