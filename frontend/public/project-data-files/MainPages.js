export const mainPages = {
  "/": "Perfect Order Rate",
  "/average-delivery-time": "Average Delivery Time",
  "/number-of-shipments": "Number of Shipments",
  "/shipping-time": "Shipping Time",
  "/transportation-cost": "Transportation Cost",
};

export const cardsData = {
  "/": [
    {
      title: "Total Orders",
      value: "12,345",
      type: "number",
      icon: "/icons/total-order-icon.png",
      backgroundColor: "#FFF5D9",
    },
    {
      title: "Timely Deliveries",
      value: "10,500",
      type: "number",
      icon: "/icons/timely-deliveries-icon.png",
      backgroundColor: "#E7EDFF",
    },
    {
      title: "Complete Orders",
      value: "11,800",
      type: "number",
      icon: "/icons/complete-orders-icon.png",
      backgroundColor: "#FFE0EB",
    },
    {
      title: "Untimely Deliveries",
      value: "1,845",
      type: "number",
      icon: "/icons/untimely-deliveries-icon.png",
      backgroundColor: "#DCFAF8",
    },
  ],
  "/shipping-time": [
    {
      title: "Average Shipping Time",
      value: "5 Days",
      type: "number",
      icon: "/icons/average-shipping-time-icon.png",
      backgroundColor: "#E4E4FF",
    },
    {
      title: "Best Shipping Route",
      value: "New York → London",
      type: "insight",
      icon: "/icons/best-shipping-time-icon.png",
      backgroundColor: "#FEF2D6",
    },
    {
      title: "Worst Shipping Route",
      value: "Beijing → Sydney",
      type: "insight",
      icon: "/icons/worst-shipping-route-icon.png",
      backgroundColor: "#FFDED2",
    },
    {
      title: "On-Time Shipment %",
      value: "87%",
      type: "number",
      icon: "/icons/on-time-shipment-icon.png",
      backgroundColor: "#FEF2D6",
    },
  ],
  "/transportation-cost": [
    {
      title: "Total Transportation Cost",
      value: "$1.2M",
      type: "number",
      icon: "/icons/total-transportation-cost-icon.png",
      backgroundColor: "#E4E4FF",
    },
    {
      title: "Avg Cost per Shipment",
      value: "$250",
      type: "number",
      icon: "/icons/average-cost-per-shipment.png",
      backgroundColor: "#FEF2D6",
    },
    {
      title: "Cost per Shipment (Air)",
      value: "$400",
      type: "number",
      icon: "/icons/cost-per-shipment.png",
      backgroundColor: "#FFDED2",
    },
    {
      title: "Cost per Shipment (Sea)",
      value: "$150",
      type: "number",
      icon: "/icons/cost-per-shipment-by-sea.png",
      backgroundColor: "#FEF2D6",
    },
  ],
  "/number-of-shipments": [
    {
      title: "Total Shipments",
      value: "9,876",
      type: "number",
      icon: "/icons/total-number-of-shipments.png",
      backgroundColor: "#FEF2D6",
    },
    {
      title: "Shipments by Air",
      value: "3,456",
      type: "number",
      icon: "/icons/cost-per-shipment.png",
      backgroundColor: "#FEF2D6",
    },
    {
      title: "Shipments by Sea",
      value: "6,420",
      type: "number",
      icon: "/icons/cost-per-shipment-by-sea.png",
      backgroundColor: "#FFDED2",
    },
  ],
  "/average-delivery-time": [
    {
      title: "Average Delivery Time",
      value: "4.2 Days",
      type: "number",
      icon: "/icons/average-delivery-time.png",
      backgroundColor: "#FFDED2",
    },
    {
      title: "Fastest Delivery Route",
      value: "Dubai → London",
      type: "insight",
      icon: "/icons/best-shipping-time-icon.png",
      backgroundColor: "#FEF2D6",
    },
    {
      title: "Slowest Shipping Route",
      value: "LA → Cape Town",
      type: "insight",
      icon: "/icons/worst-shipping-route-icon.png",
      backgroundColor: "#E4E4FF",
    },
    {
      title: "On-Time Delivery %",
      value: "92%",
      type: "number",
      icon: "/icons/on-time.png",
      backgroundColor: "#FEF2D6",
    },
  ],
};

export const porData = [
  { month: "January", por: 35.8 },
  { month: "February", por: 56.2 },
  { month: "March", por: 44.7 },
  { month: "April", por: 25.1 },
  { month: "May", por: 13.9 },
  { month: "June", por: 28.4 },
  { month: "July", por: 40.8 },
  { month: "August", por: 56.3 },
  { month: "September", por: 42.1 },
  { month: "October", por: 45.5 },
  { month: "November", por: 32.2 },
  { month: "December", por: 50.8 },
];
export const countriesporData = [
  {
    country: "Netherlands",
    data: [
      { month: "January", por: 42.3 },
      { month: "February", por: 38.7 },
      { month: "March", por: 45.2 },
      { month: "April", por: 51.5 },
      { month: "May", por: 37.1 },
      { month: "June", por: 43.9 },
      { month: "July", por: 30.8 },
      { month: "August", por: 48.6 },
      { month: "September", por: 41.2 },
      { month: "October", por: 50.4 },
      { month: "November", por: 28.5 },
      { month: "December", por: 44.7 }
    ]
  },
  {
    country: "China",
    data: [
      { month: "January", por: 55.1 },
      { month: "February", por: 62.4 },
      { month: "March", por: 50.8 },
      { month: "April", por: 47.6 },
      { month: "May", por: 59.2 },
      { month: "June", por: 61.3 },
      { month: "July", por: 49.7 },
      { month: "August", por: 58.2 },
      { month: "September", por: 55.9 },
      { month: "October", por: 60.3 },
      { month: "November", por: 52.6 },
      { month: "December", por: 57.4 }
    ]
  },
  {
    country: "Turkey",
    data: [
      { month: "January", por: 31.4 },
      { month: "February", por: 42.7 },
      { month: "March", por: 37.6 },
      { month: "April", por: 49.1 },
      { month: "May", por: 33.9 },
      { month: "June", por: 40.4 },
      { month: "July", por: 28.5 },
      { month: "August", por: 39.3 },
      { month: "September", por: 34.8 },
      { month: "October", por: 46.2 },
      { month: "November", por: 29.7 },
      { month: "December", por: 41.5 }
    ]
  },
  {
    country: "UK",
    data: [
      { month: "January", por: 49.2 },
      { month: "February", por: 55.6 },
      { month: "March", por: 53.3 },
      { month: "April", por: 60.1 },
      { month: "May", por: 45.7 },
      { month: "June", por: 51.2 },
      { month: "July", por: 40.6 },
      { month: "August", por: 58.9 },
      { month: "September", por: 52.1 },
      { month: "October", por: 61.8 },
      { month: "November", por: 47.3 },
      { month: "December", por: 56.4 }
    ]
  },
  {
    country: "UAE",
    data: [
      { month: "January", por: 39.8 },
      { month: "February", por: 48.2 },
      { month: "March", por: 41.5 },
      { month: "April", por: 52.3 },
      { month: "May", por: 35.4 },
      { month: "June", por: 43.1 },
      { month: "July", por: 29.9 },
      { month: "August", por: 45.6 },
      { month: "September", por: 38.7 },
      { month: "October", por: 50.2 },
      { month: "November", por: 30.5 },
      { month: "December", por: 42.9 }
    ]
  },
  {
    country: "South Africa",
    data: [
      { month: "January", por: 28.5 },
      { month: "February", por: 35.9 },
      { month: "March", por: 32.7 },
      { month: "April", por: 41.2 },
      { month: "May", por: 27.6 },
      { month: "June", por: 33.8 },
      { month: "July", por: 21.9 },
      { month: "August", por: 37.5 },
      { month: "September", por: 29.3 },
      { month: "October", por: 40.8 },
      { month: "November", por: 25.7 },
      { month: "December", por: 36.2 }
    ]
  },
  {
    country: "Italy",
    data: [
      { month: "January", por: 46.7 },
      { month: "February", por: 53.5 },
      { month: "March", por: 50.1 },
      { month: "April", por: 57.8 },
      { month: "May", por: 44.3 },
      { month: "June", por: 49.9 },
      { month: "July", por: 39.2 },
      { month: "August", por: 55.4 },
      { month: "September", por: 47.7 },
      { month: "October", por: 58.6 },
      { month: "November", por: 42.9 },
      { month: "December", por: 51.7 }
    ]
  }
];
export const porbardata = [
  { country: "Netherlands", por: 78 },
  { country: "UK", por: 65 },
  { country: "UAE", por: 82 },
  { country: "South Africa", por: 47 },
  { country: "Turkey", por: 56 },
  { country: "China", por: 90 },
  { country: "Italy", por: 73 }
];


export const donutData = [
  { category: "Timely Deliveries", value: 65 },
  { category: "Untimely Deliveries", value: 13 },
  { category: "Complete Orders", value: 75 }
];
export const shippingTimeData = [
  { month: "January", air: 5, sea: 24 },
  { month: "February", air: 4, sea: 26 },
  { month: "March", air: 7, sea: 25 },
  { month: "April", air: 2, sea: 20 },
  { month: "May", air: 4, sea: 27 },
  { month: "June", air: 3, sea: 24 },
  { month: "July", air: 5, sea: 32 },
  { month: "August", air: 6, sea: 22 },
  { month: "September", air: 4, sea: 25 },
  { month: "October", air: 3, sea: 23 },
  { month: "November", air: 6, sea: 20 },
  { month: "December", air: 5, sea: 24 },
];
export const ADTareadata = [
  { month: "January", air: 5, sea: 24 },
  { month: "February", air: 4, sea: 26 },
  { month: "March", air: 7, sea: 25 },
  { month: "April", air: 2, sea: 20 },
  { month: "May", air: 4, sea: 27 },
  { month: "June", air: 3, sea: 24 },
  { month: "July", air: 5, sea: 32 },
  { month: "August", air: 6, sea: 22 },
  { month: "September", air: 4, sea: 25 },
  { month: "October", air: 3, sea: 23 },
  { month: "November", air: 6, sea: 20 },
  { month: "December", air: 5, sea: 24 },
];

export const shippingtabledata = [
  { country: "UAE", avgByAir: 5, goalByAir: 4, avgBySea: 20, goalBySea: 18, status: "100%" },
  { country: "Netherlands", avgByAir: 6, goalByAir: 5, avgBySea: 22, goalBySea: 20, status: "50%" },
  { country: "Turkey", avgByAir: 7, goalByAir: 5, avgBySea: 25, goalBySea: 22, status: "20%" },
  { country: "China", avgByAir: 10, goalByAir: 8, avgBySea: 30, goalBySea: 28, status: "100%" },
  { country: "UK", avgByAir: 6, goalByAir: 5, avgBySea: 21, goalBySea: 18, status: "50%" },
  { country: "South Africa", avgByAir: 8, goalByAir: 7, avgBySea: 28, goalBySea: 25, status: "20%" },
  { country: "Italy", avgByAir: 7, goalByAir: 6, avgBySea: 26, goalBySea: 24, status: "100%" }
];








export const stackedData = [
  { name: "Uk", air: 50, sea: 40 },
  { name: "China", air: 10, sea: 2 },
  { name: "SA", air: 20, sea: 14 },
  { name: "Italy", air: 30, sea: 23 },
  { name: "NL", air: 70, sea: 28 },
  { name: "Turkey", air: 15, sea: 8 },
  { name: "UAE", air: 12, sea: 6 },
  
];
export const NOSpiedata = [
  { "category": "air", "no_shipments": 1200 },
  { "category": "sea", "no_shipments": 1800 }
]
export const Tcpiedata = [
  { "category": "air", "average_cost": 1200 },
  { "category": "sea", "average_cost": 1800 }
]
export const transportationCostData = [
  { month: "January", airCost: 75.2, seaCost: 95.8 },
  { month: "February", airCost: 72.5, seaCost: 90.3 },
  { month: "March", airCost: 78.9, seaCost: 97.2 },
  { month: "April", airCost: 65.4, seaCost: 85.6 },
  { month: "May", airCost: 60.2, seaCost: 80.9 },
  { month: "June", airCost: 68.7, seaCost: 88.3 },
  { month: "July", airCost: 90.1, seaCost: 105.6 },
  { month: "August", airCost: 95.8, seaCost: 115.2 },
  { month: "September", airCost: 85.3, seaCost: 102.9 },
  { month: "October", airCost: 89.7, seaCost: 108.4 },
  { month: "November", airCost: 78.5, seaCost: 96.2 },
  { month: "December", airCost: 100.2, seaCost: 120.8 },
];
export const transportCostUsage = [
  { country: "UAE", budget: 150000, actualSpending: 162034, percentageUsed: 108.02 },
  { country: "Netherlands", budget: 180000, actualSpending: 110450, percentageUsed: 61.36 },
  { country: "UK", budget: 95000, actualSpending: 87560, percentageUsed: 92.17 },
  { country: "Turkey", budget: 120000, actualSpending: 143220, percentageUsed: 119.35 },
  { country: "China", budget: 200000, actualSpending: 198730, percentageUsed: 99.37 },
  { country: "Italy", budget: 130000, actualSpending: 98900, percentageUsed: 76.08 },
  { country: "South Africa", budget: 75000, actualSpending: 65740, percentageUsed: 87.65 }
];
export const ADTdata = [
  { name: "Uk", air: 50, sea: 40 },
  { name: "China", air: 10, sea: 2 },
  { name: "SA", air: 20, sea: 14 },
  { name: "Italy", air: 30, sea: 23 },
  { name: "NL", air: 70, sea: 28 },
  { name: "Turkey", air: 15, sea: 8 },
  { name: "UAE", air: 12, sea: 6 },
  
];

