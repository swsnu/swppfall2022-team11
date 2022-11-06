import { useNavigate } from "react-router-dom";
export default function MainPage( ) {

  const navigate=useNavigate();
return (
    <>
    <h1>This is Main Page</h1>
    
    <button  onClick={()=>(navigate("/create",{replace:true}) )}>
     Create Letter 
    </button>
  
    </>
      )


}
