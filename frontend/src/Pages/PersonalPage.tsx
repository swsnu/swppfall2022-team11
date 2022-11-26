import Navigation from "../components/Navigation";
import "./Personal.css"

function FlipCard(props:{name: string}){
    
    
    
    return(
    <>
    <div className="flip-card">
        <div className="flip-card-inner ">
            <div className="flip-card-front text-white font-semibold text-xl lg:text-3xl text-center relative flex  items-center justify-center "   style={{ 
    

          }}> 
             <img className="backgroundimage" src={ process.env.PUBLIC_URL+props.name+".jpeg"}
             alt={"alt.jpeg"}></img>
             <h1 className="cardcontent" style={{"color":"black"}}>{props.name}</h1> 
            </div>
            <div className="flip-card-back  text-center relative flex flex-col items-center justify-center2">

            <a href="/create" className="rounded-xl text-lg  lg:p-4 mt:5 p-5 bg-gray-200 text-gray-600 font-semibold">편지쓰기</a>
            <a href="/gift" className="rounded-xl text-lg  lg:p-4 mt:5  p-5 bg-gray-200 text-gray-600 font-semibold">선물사러가기</a>
            </div>
        </div>
        </div>    
  </>
  );
}
    
    
export default function PersonalPage() {
    const upcoming =[{"name":"100일"},{"name":"생일"},{"name":"크리스마스"},{"name":"발렌타인데이"}, {"name":"1주년"}];
    const listCard = upcoming.map((d) => <FlipCard name={d.name} ></FlipCard>);
  return (
    <>
      <Navigation />
      <main className="relative w-full h-full">
        <div className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            'backgroundImage': "url(/background.jpg)"
          }}>
          <span className="w-full h-full absolute opacity-60 bg-black"></span>
          <h1 className="relative flex flex-col items-center text-gray-200 font-semibold text-xl lg:text-5xl">
              안녕하세요 @@님
            </h1>
        </div>
      

        <div className="relative flex flex-col items-center justify-center h-full pb-10">
          <div className="w-full px-4 text-center">
           
            <div className="list">
           {listCard}
           </div>    
          </div>
        </div>

            
        

 
      </main>
    </>
  )
}