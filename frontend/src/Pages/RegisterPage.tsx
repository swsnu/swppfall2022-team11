import Navigation from "../components/Navigation";
import "./LoginPage.css"
import Calendar from 'react-calendar';
import React, { useState } from 'react'
export default function RegisterPage() {
   
    const [value, onChange] = useState(new Date());
 
 
    
  return (
    <>
     
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
              AI 큐피드에게 먼저 당신을 알려주세요
            </h1>
            <h1 className="text-gray-200 font-semibold text-xl lg:text-5xl mt-2 lg:mt-4">
    
            </h1>
            
          </div>
          <form id="regForm" action="/action_page.php">
         

            <div className="text-gray-200 font-semibold">당신의 이름을 알려주세요:
    <p><input placeholder="이름" name="fname"></input></p>
 
  </div>
  <div className="text-gray-200 font-semibold">사용할 이메일과 비밀번호:
    <p><input placeholder="E-mail..."  name="email"></input></p>
    <p><input placeholder="Password" name="pwd"></input></p>
  </div>
  <div className="text-gray-200 font-semibold">연인에 대해 알려주새요:
    <p><input placeholder="연인의 이름" name="dd"></input></p>
    <p><input placeholder="애칭이나 호칭" name="nn"></input></p>
    
  </div>
  <div className="text-gray-200 font-semibold">기념일등록하기:
  <div>
      <Calendar onChange={onChange} value={value} />
    </div>
   
  </div>
  
            <div className="button text-center">
             <button type="submit">가입하기</button>
            </div>
</form>
         
        </div>
          
       
      </main>
    </>
  )
}