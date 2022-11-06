import { fontFamily } from "@mui/system";
import React from "react";
import { useState } from "react";
import "./Decorate.css"
import { MyDocument } from "../components/Document";

import ReactPDF from '@react-pdf/renderer';
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



function SelectBox(props: { options: any[]; defaultValue: number; selecthandler: Function }) {
    const HandleChange = (e: { target: { value: any; }; }) => {
        props.selecthandler(e.target.value)


    };
    return (
        <select onChange={HandleChange}>
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
};

export default function DecoratePage(): React.ReactElement {
    const [fontsize, setfontsize] = useState(10)
    const [fontstyle, setfontstyle] = useState("")
    const text = "편지내용은 여기로"

    return (

        <>
            <h1>This is Decorate Letter Page</h1>
            <div>
                <h2>Choose Background and Font</h2>
            </div>
            <h2>Fontsize:{fontsize}</h2>

            <SelectBox options={OPTIONS} defaultValue={10} selecthandler={setfontsize}></SelectBox>
            <h2>Fontstyle:{fontstyle}</h2>

            <SelectBox options={fontOPTIONS} defaultValue={0} selecthandler={setfontstyle}></SelectBox>

            <div>
                <p
                    style={{ fontSize: `${fontsize}px`, fontFamily: `${fontstyle}` }} >
                    {text}
                </p>
            </div>



        </>
    )


}