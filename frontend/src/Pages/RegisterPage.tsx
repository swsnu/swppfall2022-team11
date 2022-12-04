import Navigation from "../components/NavNotAuth";
import "./LoginPage.css"
import { useDispatch, useSelector } from "react-redux"
import { useRef, useState } from "react";
import { AppDispatch } from "..";
import { useNavigate } from "react-router-dom";
import React from 'react'
import Calendar from "./CalendarPage"
import Axios from "axios";
import {
  UserActions
} from "../store/slices/user";
export default function RegisterPage() {


  const emailInputRef = useRef<HTMLInputElement>(null);
  const pwInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const lovernameInputRef = useRef<HTMLInputElement>(null);
  const lovernicknameInputRef = useRef<HTMLInputElement>(null);
  const lovergenderInputRef = useRef<HTMLInputElement>(null);
  const loverageInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const submitHandler = async () => {
    const enteredemail = emailInputRef.current!.value;
    const enteredpw = pwInputRef.current!.value;
    const enteredname = nameInputRef.current!.value;
    const enteredln = lovernameInputRef.current!.value;
    const enterednn = lovernicknameInputRef.current!.value;
    const enteredlg = lovergenderInputRef.current!.value;
    const enteredla = loverageInputRef.current!.value;
    if (enteredemail != null && enteredpw != null) {
      const response = await Axios.post("/user/register/", {
        "email": enteredemail, "password": enteredpw, "username": enteredname,
        "lovername": enteredln, "lovernickname": enterednn, "Anniversary": []
        ,"loverage":enteredla, "lovergender": enteredlg
      }
      );
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
    <>
      <Navigation></Navigation>
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
          <form id="regForm">


            <div className="text-gray-200 font-semibold">당신의 이름을 알려주세요:
              <p><input placeholder="이름" name="fname" ref={nameInputRef}></input></p>

            </div>
            <div className="text-gray-200 font-semibold">사용할 이메일과 비밀번호:
              <p><input placeholder="E-mail..." name="email" ref={emailInputRef}></input></p>
              <p><input placeholder="Password" name="pwd" ref={pwInputRef}></input></p>
            </div>
            <div className="text-gray-200 font-semibold">연인에 대해 알려주새요:
              <p><input placeholder="연인의 이름" name="dd" ref={lovernameInputRef}></input></p>
              <p><input placeholder="애칭이나 호칭" name="nn" ref={lovernicknameInputRef}></input></p>
              <p><input placeholder="연인의 성별" name="nn" ref={lovernicknameInputRef}></input></p>
              <p><input placeholder="연인의 나이" name="nn" ref={lovernicknameInputRef}></input></p>
            </div>
            <div className="text-gray-200 font-semibold">기념일등록하기:
              <div>
                <Calendar />
              </div>

            </div>

            <div className="button text-center">
              <button type="submit" onClick={() => submitHandler()}>가입하기</button>
            </div>
          </form>

        </div>


      </main>
    </>
  )
}