import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import CalendarAnniversary from "../components/CalendarAnniversary";
import Event from "../components/Event";
import Navigation from "../components/Navigation";
import { AppDispatch } from "../store"
import { fetchEvents, selectEvent } from "../store/slices/event";


export default function CalendarPage() {
  const navigate = useNavigate();
  const eventState = useSelector(selectEvent);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  return (
    <>
      <Navigation />
      <h1 className="text-black font-semibold text-2xl">다가오는 기념일</h1>

      <CalendarAnniversary />
      <div>
        {eventState.events.map((event, index) => {
          return <Event key={index} title={event.title} date={event.date} />
        })}
      </div>
      <button onClick={() => navigate("/create")}>지금 편지쓰러가기</button>
    </>
  )
}
