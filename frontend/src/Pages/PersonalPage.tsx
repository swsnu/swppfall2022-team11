import Navigation from "../components/Navigation";
import "./Personal.css"

function FlipCard(props:{name: string}){

    return(
    <>
    <div className="flip-card">
        <div className="flip-card-inner">
            <div className="flip-card-front">
             <h1>{props.name}</h1> 
            </div>
            <div className="flip-card-back">
            <p>편지쓰기</p> 
            <p>선물사러가기</p>
            </div>
        </div>
        </div>    
  </>
  );
}
    
    
export default function PersonalPage() {
    const upcoming =[{"name":"100알"},{"name":"생일"},{"name":"크리스마스"},{"name":"발렌타인데이"}, {"name":"화이트데이"}];
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
        </div>

        <div className="relative flex flex-col items-center justify-center h-full pb-10">
          <div className="w-full px-4 text-center">
            <h1 className="text-gray-200 font-semibold text-xl lg:text-5xl">
              안녕하세요 @@님
            </h1>
            <div className="list">
           {listCard}
           </div>    
          </div>
        </div>

            
        

 
      </main>
    </>
  )
}