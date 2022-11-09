import React, { useState } from 'react';
const today = new(Date);

interface IProps {
    title: string;
    date: Date;
}

const Dday= (props: IProps)=>{
    const diff = props.date.getDate() - today.getDate();
    return (
        <div>
            <div>D-{diff}</div>
            <div>{props.title}</div>
        </div>
    );
}

export default Dday