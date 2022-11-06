import { useNavigate } from "react-router-dom";

export default function CreatePage() {
  const navigate = useNavigate();
  return (
    <>
      <h1>This is Create Letter Page</h1>
      <div>
        <button onClick={() => { navigate('/decorate', { replace: true }) }}>Decorate</button>
        <button onClick={() => { navigate('/gift', { replace: true }) }}>gift Recommendation</button>
      </div>
    </>
  )
}