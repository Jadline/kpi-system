import { MdDateRange } from "react-icons/md";
function YearDropDown(){
    return (
        <div style={{
            display : 'flex',
            alignItems : 'center',
            gap : '1rem',
            justifyContent:'center',
            border:'.1rem solid #ccc',
            padding : '.5rem',
            borderRadius : '.8rem'
        }}>
            <MdDateRange size={30} color='#FFBF00'/>
            <select style ={{
                width : '10rem',
                height: '3rem',
                outline : 'none',
                border : 'none',
                backgroundColor : 'transparent',           
                fontSize : '1.6rem'
            }}>
               <option value='2021'>2021</option>
               <option value='2022'>2022</option>
               <option value='2023'>2023</option>
               <option value='2024'>2024</option>
            </select>
        </div>
    )
}
export default YearDropDown