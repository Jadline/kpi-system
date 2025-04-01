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
  }
};