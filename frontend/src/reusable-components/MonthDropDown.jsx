import { FiClock } from "react-icons/fi";

function MonthDropDown({month,setMonth}){
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
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        >
        <option value='January'>January</option>
        <option value='February'>February</option>
        <option value='March'>March</option>
        <option value='April'>April</option>
        <option value='May'>May</option>
        <option value='June'>June</option>
        <option value='July'>July</option>
        <option value='August'>August</option>
        <option value='September'>September</option>
        <option value='October'>October</option>
        <option value='November'>November</option>
        <option value='December'>December</option>
    </select>
        </div>
    )
}
export default MonthDropDown