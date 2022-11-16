interface IProps {
    title: string;
    date: Date;
}

const Event = (props: IProps) => {
    const today = new (Date);

    const diff = today.getDate() - props.date.getDate();
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
                <div>D{diff}</div>
                <div>{props.title}</div>
            </div>
        );
    }

}

export default Event