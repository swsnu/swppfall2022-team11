import Navigation from "../components/NavNotAuth";
import "./LoginPage.css"
import { useDispatch } from "react-redux"
import { useRef } from "react";
import { AppDispatch } from "..";
import { useNavigate } from "react-router-dom";
import {
  login
} from "../store/slices/user";
import Axios from "axios";
import { BACKEND_URL } from "../utils";
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
      const response = await Axios.post(BACKEND_URL + "/user/login/", { "email": enteredemail, "password": enteredpw });
      if (response.status == 204) {
        dispatch(login({ "email": enteredemail, "password": enteredpw }))
        navigate('/userpage', { replace: true });
      }
      else {
        alert('Email or password is wrong')
      }
    }
  }

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

        <div className="relative flex flex-col items-center justify-center h-full pb-7">
          <div className="w-full px-4 text-center">
            <h1 className="text-gray-200 font-semibold text-xl lg:text-5xl my-10">
              AI 큐피드를 깨워볼까요?
            </h1>
            <h3 className="text-gray-200 font-semibold text-base">
              아이디가 없으신가요? <a className="cursor-pointer text-blue-500" href="/register">회원가입</a>
            </h3>
          </div>
          <div className="container flex flex-col justify-center items-center">
            <div>
              <div className="inputs">
                <input className="rounded p-4 border mr-0 text-gray-800 border-gray-200 bg-white" type="text" placeholder="이메일 입력" name="email" required ref={emailInputRef}></input>
              </div>
              <div className="inputs">
                <input className="rounded p-4 border mr-0 text-gray-800 border-gray-200 bg-white" type="password" placeholder="패스워드 입력" name="psw" required ref={pwInputRef}></input>
              </div>
              <div className="inputs">
                <button className="mt-3 w-full rounded-lg text-lg p-3 bg-gray-200 text-gray-600 font-semibold" type="submit" onClick={() => submitHandler()}>로그인</button>
              </div>
            </div>
          </div>
        </div>
      </main >
    </div >
  )
}