import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
export default function MainPage() {

  const navigate = useNavigate();
  return (
    <>
      <Navigation />
      <main className="w-full h-full">
        <div className="relative w-full h-full">
          <div className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              'backgroundImage': "url(/background.jpg)"
            }}>
            <span className="w-full h-full absolute opacity-75 bg-black"></span>
          </div>
        </div>
      </main>
    </>
  )
}
