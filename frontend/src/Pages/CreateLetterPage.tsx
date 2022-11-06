import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";

export default function CreatePage() {
  const navigate = useNavigate();
  return (
    <>
      <Navigation />
      <h1>This is Create Letter Page</h1>
      <div>
        <button onClick={() => { navigate('/decorate') }}>편지지 꾸미기</button>
        <button onClick={() => { navigate('/gift') }}>선물 추천</button>
      </div>
    </>
  )
}