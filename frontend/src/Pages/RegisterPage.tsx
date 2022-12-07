import Navigation from "../components/NavNotAuth";
import "./LoginPage.css"
import { useDispatch, useSelector } from "react-redux"
import { useRef, useState } from "react";
import { AppDispatch } from "..";
import { useNavigate } from "react-router-dom";
import React from 'react'

import Axios from "axios";
import Calendar from 'react-calendar';

import moment from "moment"
import {
  UserActions
} from "../store/slices/user";
import { BACKEND_URL } from "../utils";
export default function RegisterPage() {


  const emailInputRef = useRef<HTMLInputElement>(null);
  const pwInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const lovernameInputRef = useRef<HTMLInputElement>(null);
  const lovernicknameInputRef = useRef<HTMLInputElement>(null);
  const lovergenderInputRef = useRef<HTMLInputElement>(null);
  const loverageInputRef = useRef<HTMLInputElement>(null);

  const [startDate, setStartDate] = useState(new Date());
  const [birthDate, setBirthDate] = useState(new Date());

  const navigate = useNavigate();
  const submitHandler = async () => {
    const enteredemail = emailInputRef.current!.value;
    const enteredpw = pwInputRef.current!.value;
    const enteredname = nameInputRef.current!.value;
    const enteredln = lovernameInputRef.current!.value;
    const enterednn = lovernicknameInputRef.current!.value;
    const enteredlg = lovergenderInputRef.current!.value;
    const enteredla = loverageInputRef.current!.value;
    console.log("enteredemail:", enteredemail)

    if (enteredemail != null && enteredpw != null) {
      const response = await Axios.post(BACKEND_URL + "/user/register/", {
        "email": enteredemail, "password": enteredpw, "username": enteredname,
        "lovername": enteredln, "lovernickname": enterednn, "Anniversary": []
        , "loverage": enteredla, "lovergender": enteredlg
      }
      );
      console.log(response.status)
      if (response.status == 201) {
        alert("회원가입이 완료되었습니다");
        navigate('/userpage', { replace: true });
      }
      else {
        alert("잘못된시도");
      }
    }
  };


  return (
    <div className="w-full h-full flex flex-col">
      <Navigation />
      <main className="relative w-full flex-1">
        <div className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            'backgroundImage': "url(/background.jpg)"
          }}>
          <span className="w-full h-full absolute opacity-60 bg-black"></span>
        </div>
        <div className="relative flex flex-col items-center justify-center h-full pb-10">
          <div className="w-full px-4 text-center">
            <h1 className="text-gray-200 font-semibold text-xl lg:text-5xl">
              먼저 당신을 알려주세요
            </h1>
          </div>
          <form id="regForm" className="flex flex-col justify-center items-center">
            <input className="mt-4 rounded p-4 border mr-0 text-gray-800 border-gray-200 bg-white" type="text" placeholder="이메일 주소" name="email" required ref={emailInputRef}></input>
            <input className="mt-4 rounded p-4 border mr-0 text-gray-800 border-gray-200 bg-white" type="password" placeholder="패스워드" name="pwd" required ref={pwInputRef}></input>
            <input className="mt-4 rounded p-4 border mr-0 text-gray-800 border-gray-200 bg-white" type="text" placeholder="이름" name="fname" required ref={nameInputRef}></input>
            <input className="mt-4 rounded p-4 border mr-0 text-gray-800 border-gray-200 bg-white" type="text" placeholder="연인의 이름" name="dd" required ref={lovernameInputRef}></input>

            <input className="mt-4 rounded p-4 border mr-0 text-gray-800 border-gray-200 bg-white" type="text" placeholder="애칭이나 호칭" name="dd" required ref={lovernicknameInputRef}></input>
            <input className="mt-4 rounded p-4 border mr-0 text-gray-800 border-gray-200 bg-white" type="text" placeholder="연인의 이름" name="dd" required ref={lovernameInputRef}></input>
            <input className="mt-4 rounded p-4 border mr-0 text-gray-800 border-gray-200 bg-white" type="text" placeholder="연인의 이름" name="dd" required ref={lovernameInputRef}></input>
            <input className="mt-4 rounded p-4 border mr-0 text-gray-800 border-gray-200 bg-white" type="text" placeholder="연인의 이름" name="dd" required ref={lovernameInputRef}></input>
            <p><input placeholder="연인의 이름" name="dd" ref={lovernameInputRef}></input></p>
            <p><input placeholder="애칭이나 호칭" name="nn" ref={lovernicknameInputRef}></input></p>
            <p><input placeholder="연인의 성별" name="nn" ref={lovernicknameInputRef}></input></p>
            <p><input placeholder="연인의 나이" name="nn" ref={lovernicknameInputRef}></input></p>
            <p><input placeholder="연인의 생일" name="nn" ref={lovernicknameInputRef}></input></p>


            <div>사귀기시작한날
              <Calendar onChange={setStartDate} value={startDate} ></Calendar>
            </div>
            <div>연인의생일
              <Calendar onChange={setBirthDate} value={birthDate} ></Calendar>
            </div>



            <div className="button text-center">
              <button type="submit" onClick={() => submitHandler()}>가입하기</button>
            </div>
          </form>

        </div>


      </main>
    </div>
  )
}