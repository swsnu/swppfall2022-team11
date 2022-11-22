interface IProps {
    title: string;
    date: Date;
}

const Event = (props: IProps) => {
    const today = new (Date);

    const diff = today.getTime() - props.date.getTime();
    const result = Math.ceil(diff / (1000 * 60 * 60 * 24))
    if (diff >= 0) {
        return (
            <div>
                <div>D+{diff}</div>
                <div>{props.title}</div>
            </div>
        )
    }
    else {
        return (
            <div>
                <div>D{result}</div>
                <div>{props.title}</div>
            </div>
        );
    }

}

export default Event