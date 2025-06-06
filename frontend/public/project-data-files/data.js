export const cardMappings = {
  "/number-of-shipments": {
    total_shipments: {
      title: "Total Shipments",
      type: "number",
      icon: "/icons/total-number-of-shipments.png",
      backgroundColor: "#FEF2D6",
    },
    shipments_by_air: {
      title: "Shipments by Air",
      type: "number",
      icon: "/icons/cost-per-shipment.png",
      backgroundColor: "#E4E4FF",
    },
    shipments_by_sea: {
      title: "Shipments by Sea",
      type: "number",
      icon: "/icons/cost-per-shipment-by-sea.png",
      backgroundColor: "#FFDED2",
    },
  },
  '/' : {
    total_orders : {
        title: "Total Orders",

        type: "number",
        icon: "/icons/total-order-icon.png",
        backgroundColor: "#FFF5D9",
      },
      timely_deliveries : {
        title: "Timely Deliveries",

        type: "number",
        icon: "/icons/timely-deliveries-icon.png",
        backgroundColor: "#E7EDFF",
      },
      complete_orders : {
        title: "Complete Orders",
   
        type: "number",
        icon: "/icons/complete-orders-icon.png",
        backgroundColor: "#FFE0EB",
      },
      untimely_deliveries : {
        title: "Untimely Deliveries",

        type: "number",
        icon: "/icons/untimely-deliveries-icon.png",
        backgroundColor: "#DCFAF8",
      },
  },
  '/shipping-time' : {
    average_shipping_time_by_air  : {
      title: "Average Shipping Time by Air (in days)",
      type: "number",
      icon: "/icons/average-shipping-time-icon.png",
      backgroundColor: "#E4E4FF",
    },
    average_shipping_time_by_sea : {
      title: "Average Shipping Time by Sea (in days)", 
      type: "number",
      icon: "/icons/best-shipping-time-icon.png",
      backgroundColor: "#FEF2D6",
    },
    on_time_shipments_by_air : {
      title: "On-Time shipments by Air",
      type: "number",
      icon: "/icons/worst-shipping-route-icon.png",
      backgroundColor: "#FFDED2",
    },
    on_time_shipments_by_sea : {
      title: "On-Time Shipments By Sea",
      type: "number",
      icon: "/icons/on-time-shipment-icon.png",
      backgroundColor: "#FEF2D6",
    },
  },
  '/average-delivery-time': {
    average_delivery_time_by_air : {
      title: "Average Delivery Time by Air (in days)",
      type: "number",
      icon: "/icons/average-delivery-time.png",
      backgroundColor: "#FFDED2",
    },
    average_delivery_time_by_sea : {
      title: "Average Delivery Time by Sea (in days)",
      type: "number",
      icon: "/icons/best-shipping-time-icon.png",
      backgroundColor: "#FEF2D6",
    },
    total_ontime_deliveries : {
      title: "Total On-Time Deliveries",

      type: "number",
      icon: "/icons/worst-shipping-route-icon.png",
      backgroundColor: "#E4E4FF",
    },
    ontime_deliveries_percentage : {
      title: "On-Time Delivery %",
      type: "number",
      icon: "/icons/on-time.png",
      backgroundColor: "#FEF2D6",
    },
  },
  '/transportation-cost' : {
    total_transportation_cost : {
      title: "Total Transportation Cost (in Millions Ksh)",
      type: "number",
      icon: "/icons/total-transportation-cost-icon.png",
      backgroundColor: "#E4E4FF",
    },
    average_transportation_cost_per_shipment :{
      title: "Avg Cost per Shipment in Ksh",
      type: "number",
      icon: "/icons/average-cost-per-shipment.png",
      backgroundColor: "#FEF2D6",
    },
    cost_per_shipment_air :{
      title: "Cost per Shipment (Air) in Ksh",
      type: "number",
      icon: "/icons/cost-per-shipment.png",
      backgroundColor: "#FFDED2",
      tooltip: "Air: $10/kg if over 1kg, else 1,500 Ksh fixed charge.",
    },
    cost_per_shipment_sea : {
      title: "Cost per Shipment (Sea) in Ksh",
      type: "number",
      icon: "/icons/cost-per-shipment-by-sea.png",
      backgroundColor: "#FEF2D6",
      tooltip: "Sea: 60,000 Ksh per CBM, min. 0.5 CBM = 30,000 Ksh."
    },
  }
};