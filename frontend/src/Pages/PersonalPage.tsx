import Navigation from "../components/Navigation";
import "./Personal.css"
import User from "../components/Gift";
import { fetchUserInfo, selectUser } from "../store/slices/user";
import { AppDispatch } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FlipCard(props: { name: string }) {
  const navigate = useNavigate()
  return (
    <>
      <div className="flip-card">
        <div className="flip-card-inner ">
          <div className="flip-card-front text-white font-semibold text-xl lg:text-3xl text-center relative flex  items-center justify-center " style={{


          }}>
            <img className="backgroundimage" src={props.name + ".jpeg"}
              alt={"alt.jpeg"}></img>
            <h1 className="cardcontent" style={{ "color": "black" }}>{props.name}</h1>
          </div>
          <div className="flip-card-back  text-center relative flex flex-col items-center justify-center2">

            <a onClick={() => navigate('/craate', { state:{"name":props.name}  })} className="rounded-xl text-lg  lg:p-4 mt:5 p-5 bg-gray-200 text-gray-600 font-semibold">편지쓰기</a>
            <a onClick={() => navigate('/decorate', { state:{"name":props.name,"text":"","from":"userpage"}})} className="rounded-xl text-lg  lg:p-4 mt:5 p-5 bg-gray-200 text-gray-600 font-semibold">편지수정하기</a>
            <a onClick={() => navigate('/gift', { state:props.name  })} className="rounded-xl text-lg  lg:p-4 mt:5  p-5 bg-gray-200 text-gray-600 font-semibold">선물사러가기</a>
          </div>
        </div>
      </div>
    </>
  );
}


export default function PersonalPage() {

  const userState = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();
  let upcoming =[];

  useEffect(() => {
    dispatch(fetchUserInfo());
    userState.user.Anniversary.map((d)=> upcoming.push({"name":d.name , "date": d.date}));
    

  }, []);


  upcoming = [{ "name": "100일" }, { "name": "생일" }, { "name": "발렌타인데이" }, { "name": "1주년" }];
  const listCard = upcoming.map((d) => <FlipCard key={d.name} name={d.name} ></FlipCard>);

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
            안녕하세요 주환님
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