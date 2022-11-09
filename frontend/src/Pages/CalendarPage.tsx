import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CalendarAnniversary from "../components/CalendarAnniversary";
import Dday from "../components/Dday";
import Navigation from "../components/Navigation";

type EventType = {id: number; title: string; date: Date}

export default function CalendarPage() {
  const navigate = useNavigate();
  const [today, setToday] = useState(new(Date));
  const [events, setEvent] = useState<EventType[]>([
    {id:1, title: "빼빼로 데이", date: new Date("2022-11-11")},
    {id:2, title: "크리스 마스", date: new Date("2022-12-25")},
])

  return (
      <>
      <Navigation />
      <h1 className="text-black font-semibold text-2xl">다가오는 기념일</h1>

        <CalendarAnniversary/>
        <div>
          {events.map((event)=>{
            return <Dday title={event.title} date={event.date}/>
          })}
        </div>
      <button onClick={()=>navigate("/create")}>지금 편지쓰러가기</button>
      </>
    )
  }
  