
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// function fetchData({ queryKey }) {
//     const [_key, year, month] = queryKey; // Extract query params

//     return axios
//         .get("https://your-api-endpoint.com/data", {
//             params: { year: year, month: month }
//         })
//         .then((response) => response.data);
// }

// export function useFilteredData(selectedYear, selectedMonth) {
//     return useQuery({
//         queryKey: ["filteredData", selectedYear, selectedMonth], // React Query's cache key
//         queryFn: fetchData,
//         enabled: !!selectedYear, // Ensure it only runs when year is selected
//     });
// }
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// function fetchData({ queryKey }) {
//     const [_key, year, month] = queryKey; // Extract query params

//     return axios
//         .get("https://your-api-endpoint.com/data", {
//             params: { year: year, month: month }
//         })
//         .then((response) => response.data);
// }

// export function useFilteredData(selectedYear, selectedMonth) {
//     return useQuery({
//         queryKey: ["filteredData", selectedYear, selectedMonth], // React Query's cache key
//         queryFn: fetchData,
//         enabled: !!selectedYear, // Ensure it only runs when year is selected
//     });
// }
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// function fetchData({ queryKey }) {
//     const [_key, year, month] = queryKey; // Extract query params

//     return axios
//         .get("https://your-api-endpoint.com/data", {
//             params: { year: year, month: month }
//         })
//         .then((response) => response.data);
// }

// export function useFilteredData(selectedYear, selectedMonth) {
//     return useQuery({
//         queryKey: ["filteredData", selectedYear, selectedMonth], // React Query's cache key
//         queryFn: fetchData,
//         enabled: !!selectedYear, // Ensure it only runs when year is selected
//     });
// }
// import { useState } from "react";
// import { useFilteredData } from "../hooks/useFilteredData";

// function DataFilterComponent() {
//     const [selectedYear, setSelectedYear] = useState("2024");
//     const [selectedMonth, setSelectedMonth] = useState(""); // Optional

//     const { data, isLoading, error } = useFilteredData(selectedYear, selectedMonth);

//     if (isLoading) return <p>Loading...</p>;
//     if (error) return <p>Error fetching data!</p>;

//     return (
//         <div>
//             <label>Year:</label>
//             <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
//                 <option value="2021">2021</option>
//                 <option value="2022">2022</option>
//                 <option value="2023">2023</option>
//                 <option value="2024">2024</option>
//             </select>

//             <label>Month:</label>
//             <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
//                 <option value="">All</option>
//                 <option value="January">January</option>
//                 <option value="February">February</option>
//                 <option value="March">March</option>
//                 <option value="April">April</option>
//                 <option value="May">May</option>
//                 <option value="June">June</option>
//                 <option value="July">July</option>
//                 <option value="August">August</option>
//                 <option value="September">September</option>
//                 <option value="October">October</option>
//                 <option value="November">November</option>
//                 <option value="December">December</option>
//             </select>

//             <h2>Fetched Data:</h2>
//             <pre>{JSON.stringify(data, null, 2)}</pre>
//         </div>
//     );
// }

// export default DataFilterComponent;
