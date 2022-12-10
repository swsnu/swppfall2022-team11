import React from "react";
import { useState, useEffect } from "react";
import "./Decorate.css"
import { useLocation } from 'react-router-dom';
import { fetchUserInfo, selectUser } from "../store/slices/user";
import { AppDispatch } from "../store";

import { useDispatch, useSelector } from "react-redux";

import Navigation from "../components/Navigation";

const OPTIONS = [
    { value: 10, name: "10" },
    { value: 12, name: "12" },
    { value: 14, name: "14" },
    { value: 18, name: "18" },
    { value: 22, name: "22" },
    { value: 28, name: "28" },
    { value: 36, name: "36" }
];
const fontOPTIONS = [
    { value: "Pak_Yong_jun", name: "박용준투사체" },
    { value: "Kkomi", name: "꼬미체" },
    { value: "kotra-son", name: "코트라손글씨체" },
    { value: "ACC_chilren", name: "ACC어린이체" },

];


function SelectBox(props: { options: any[]; defaultValue: number | string; selecthandler: Function }) {
    const HandleChange = (e: { target: { value: any; }; }) => {
        props.selecthandler(e.target.value)


    };
    return (
        <select style={{ padding: 16, fontSize: 16 }} onChange={HandleChange}>
            {props.options.map((option) => (
                <option
                    style={{ fontFamily: `${option.value}` }}
                    key={option.value}
                    value={option.value}
                    defaultValue={props.defaultValue}
                >
                    {option.name}
                </option>
            ))}
        </select>
    );
}

export default function DecoratePage(): React.ReactElement {
    const { state } = useLocation();
    const [lettertext, settext] = useState("")
    const [fontsize, setfontsize] = useState(20)
    const [fontstyle, setfontstyle] = useState("Kkomi")
    const [previewmode, setpreviewmode] = useState(false)
    const userState = useSelector(selectUser);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchUserInfo());
        if (state && state["from"] == "userpage") {

            userState.user.Anniversary.map((anniv) => {
                if (anniv.name == state["name"]) {
                    settext(anniv.lettertext)
                }
            })
        }
        else {
            const text = state == null ? "우리가 만난게 엊그제 같은데 벌써 100일이나 됐네? \n 처음 너를 봤을 때가 생각나.어떻게 저렇게 예쁜 애가 있나? 설레었어.너의 그 환한 웃음이 너무 좋았어." : state["from"] == "create" ? state["text"] : "로딩중"
            settext(text)
        }
    }, []);
    if (previewmode == false) {
        return (
            <div className="flex flex-col justify-center items-center">
                <Navigation />
                <div className="mt-10 bg-gray-200 w-full max-w-lg p-10 rounded-xl" >
                    <h1 style={{ fontSize: 24, fontFamily: "Kkomi", margin: 30, textAlign: "center" }}>이제 편지를 함께 꾸며보아요</h1>
                    <div className="textheader">
                        <h2>폰트와 크기 배경을 골라주세요</h2>
                    </div>
                    <div className="choose-bar rounded p-2">
                        <SelectBox options={OPTIONS} defaultValue={20} selecthandler={setfontsize}></SelectBox>

                        <SelectBox options={fontOPTIONS} defaultValue={"Kkomi"} selecthandler={setfontstyle}></SelectBox>
                    </div>
                    <div className="letterview-component">
                        <p
                            style={{ fontSize: `${fontsize}px`, fontFamily: fontstyle }} >
                            {lettertext}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <>
            <Navigation />
            <div className="full" style={{ width: 500, backgroundColor: "white", margin: "auto" }}>
            </div>
        </>
    )
}
