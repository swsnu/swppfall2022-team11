import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css'
import moment from "moment"


function CalendarAnniversary() {
  const [value, onChange] = useState(new Date());

  const marks = [
    "11-11-2022",
    "25-12-2022"
  ];

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
         <div className="text-gray-500 mt-4">
           {moment(value).format("YYYY년 MM월 DD일")} 
         </div>
    </div>
  );
}

export default CalendarAnniversary