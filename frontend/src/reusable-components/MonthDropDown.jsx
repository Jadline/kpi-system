import { FiClock } from "react-icons/fi";

function MonthDropDown(){
    return(
        <div
        style={{
            display : 'flex',
            alignItems : 'center',
            justifContent : 'center',
            gap:'1rem',
            border : '.1rem solid #ccc',
            padding : '.5rem',
            borderRadius : '.8rem'
        }}
        >
        <FiClock size={28} color='#FFAC1C'/>
        <select
        style ={{
            width : '10rem',
            height: '3rem',
            outline : 'none',
            borderRadius : '.5rem',
            fontSize : '1.6rem',
            border : 'none',
            backgroundColor : 'transparent',
        
        }}
        >
        <option>January</option>
        <option>February</option>
        <option>March</option>
        <option>April</option>
        <option>May</option>
        <option>June</option>
        <option>July</option>
        <option>August</option>
        <option>September</option>
        <option>October</option>
        <option>November</option>
        <option>December</option>
    </select>
        </div>
    )
}
export default MonthDropDown