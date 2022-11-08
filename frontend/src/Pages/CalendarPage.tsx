import CalendarAnniversary from "../components/CalendarAnniversary";
import Navigation from "../components/Navigation";

export default function CalendarPage() {
    return (
      <>
      <Navigation />
      <h1 className="text-black font-semibold text-2xl">다가오는 기념일</h1>

        <CalendarAnniversary/>
      <h1>가장 가까운 기념일 : 11월 11일 빼빼로 데이</h1>
      <div >빼뻬로 데이 D-2일</div>
      <a href="/create" className="rounded-xl">지금 편지 쓰러가기</a>
      </>
    )
  }
  