import React from "react";
import { useState } from "react";
import "./Decorate.css"
import { useLocation } from 'react-router-dom';


import Navigation from "../components/Navigation";
import { autocompleteClasses } from "@mui/material";
import { grey } from "@mui/material/colors";

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
        <select style={{padding:15, fontSize:20}} onChange={HandleChange}>
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
    const [fontsize, setfontsize] = useState(20)
    const [fontstyle, setfontstyle] = useState("")
    const [ previewmode,setpreviewmode]=useState(false)
    const showPreview=()=>{
       setpreviewmode(true);
    }
  
     
    


    const text = "우리가 만난게 엊그제 같은데 벌써 100일이나 됐네? \n 처음 너를 봤을 때가 생각나.어떻게 저렇게 예쁜 애가 있나? 설레었어.너의 그 환한 웃음이 너무 좋았어."

    if (previewmode==false) 
    {return (

        <>
            <Navigation />
            <div className="full" style={{ width:500,backgroundColor:"white" ,margin:"auto"}}>
            <h1 style={{fontSize:30, color:"", fontFamily:"Kkomi", margin:30, textAlign:"center"}}>이제 편지를 함께 꾸며보아요</h1>
            
            <div className="textheader">
              <h2>폰트와 크기 배경을 골라주세요</h2>
            </div>

            <div className="choose-bar">
            <SelectBox options={OPTIONS} defaultValue={10} selecthandler={setfontsize}></SelectBox>
          

            <SelectBox options={fontOPTIONS} defaultValue={0} selecthandler={setfontstyle}></SelectBox>
            </div>
            <div className="letterview-component">
                <p
                    style={{ fontSize: `${fontsize}px`, fontFamily:fontstyle }} >
                    {text}
                </p>
            </div>
  
            <div className="btn-group" >
            <button onClick={()=>showPreview()}>Preview</button>
            <button onClick={()=>{setpreviewmode(false)}}>Edit</button>
            <button >파일로저장하기</button>
            </div>    
            
            </div>

        </>
    )}

    return (

        <>
        <Navigation />
        <div className="full" style={{ width:500,backgroundColor:"white" ,margin:"auto"}}>
        <h1 style={{fontSize:30, color:"", fontFamily:"Kkomi", margin:30, textAlign:"center"}}>미리보기에요</h1>
      
        <div className="btn-group" >
        <button onClick={()=>showPreview()}>Preview</button>
        <button onClick={()=>{setpreviewmode(false)}}>Edit</button>
        <button >파일로저장하기</button>
        </div>    
        
        </div>

    </>
    )

    


}