import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css'
import moment from "moment"
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { eventSlice } from '../store/slices/event';

function CalendarAnniversary() {
  const [value, onChange] = useState(new Date());
  const [title, setTitle] = useState('')
  const dispatch = useDispatch<AppDispatch>();

  const marks = [
    "11-11-2022",
    "25-12-2022"
  ];

  const handleSubmit=async ()=>{
    const data = {title: title, date: value}
    dispatch(eventSlice.actions.addEvent(data));
    setTitle('')
    alert("추가완료하였습니다")
  }

  return (
    <div>
      <Calendar onChange={onChange} value={value} 
      tileClassName={({ date, view }) => {
        if(marks.find(x=>x===moment(date).format("DD-MM-YYYY"))){
          return  'highlight'
        }
        else{
          return null;
        }
        }}/>
        <input type="text" value={title}
        onChange={(event)=>setTitle(event.target.value)}
        placeholder="이벤트 이름"></input>
        <button onClick={()=>handleSubmit()}>이벤트 추가하기</button>
         <div className="text-gray-500 mt-4">
           {moment(value).format("YYYY년 MM월 DD일")} 
         </div>
    </div>
  );
}

export default CalendarAnniversary