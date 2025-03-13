function ModeButton({mode,setMode}){
    return (
        <div
        style={{
          display : 'flex',
          // backgroundColor : 'yellow',
          gap : '1rem',
          alignItems : 'center',
          justifyContent : 'space-between',
          width :'30%',
          // backgroundColor :'purple'
        

        }}
        >
        <button onClick={() => setMode("air")} style={{
       background: mode === "air" ? "#0077b6" : "gray" ,
       padding : '1rem 4.2rem',
     
       outline : 'none',
       border : 'none',
       borderRadius : '.5rem',
       color :'#fff',
       fontWeight : '600'
      
       
       }}>
      Air
    </button>
    <button 
    onClick={() => setMode("sea")} 
    style={{ 
      background: mode === "sea" ? "#0077b6" : "gray" ,
      padding : '1rem 4.2rem',
      // width : '6rem',
      // height : '2.2rem',
      outline : 'none',
      border : 'none',
      borderRadius :'.5rem',
      color : '#fff',
      fontWeight : '600'
    
    

    }}
    >
      Sea
    </button>
       
        </div>
    )
}
export default ModeButton