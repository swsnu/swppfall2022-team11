import Navigation from "../components/NavNotAuth";
import "./LoginPage.css"
import { useDispatch, useSelector } from "react-redux"
import { useRef, useState } from "react";
import { AppDispatch } from "..";
import { useNavigate } from "react-router-dom";
import {
  login
} from "../store/slices/user";
import Axios from "axios";
Axios.defaults.xsrfCookieName = 'csrftoken';
Axios.defaults.xsrfHeaderName = 'X-CSRFToken';


export default function LoginPage() {

  const emailInputRef = useRef<HTMLInputElement>(null);
  const pwInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const submitHandler = async () => {
    const enteredemail = emailInputRef.current!.value;
    const enteredpw = pwInputRef.current!.value;
    if (enteredemail != null && enteredpw != null) {
      const response = await Axios.post("/user/login/", { "email": enteredemail, "password": enteredpw });
      if (response.status == 204) {
        dispatch(login({ "email": enteredemail, "password": enteredpw }))
        navigate('/userpage', { replace: true });
      }
      else {
        alert('Email or password is wrong')
      }
    }
  };

  return (
    <>
      <Navigation />
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
              AI 큐피드를 깨워볼까요?
            </h1>
            <h1 className="text-gray-200 font-semibold text-xl lg:text-5xl mt-2 lg:mt-4">
              로그인해봐요
            </h1>

          </div>
          <div className="container">
            <div>
              <div className="inputs">
                <input type="text" placeholder="Enter Email" name="email" required ref={emailInputRef}></input>
              </div>
              <div className="inputs">
                <input type="password" placeholder="Enter Password" name="psw" required ref={pwInputRef}></input>
              </div>
            </div>
          </div>
          <div className="button">
            <button type="submit" onClick={() => submitHandler()}>Login</button>
          </div>
        </div>


      </main>
    </>
  )
}