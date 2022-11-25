interface IProps {
    title: string;
    date: Date;
}

const Event = (props: IProps) => {
    const today = new (Date);

    const diffdate = today.getTime() - props.date.getTime();
    const diff=Math.trunc(diffdate/(1000*60*60*24));
  

    if (diff >= 0) {
        return (
            <div>
                <div>D+{diff+1}</div>
                <div>{props.title}</div>
            </div>
        )
    }
    else {
        return (
            <div>
                <div>D{result-1}</div>
                <div>{props.title}</div>
            </div>
        );
    }

}

export default Event