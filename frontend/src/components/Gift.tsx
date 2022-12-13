import './Gift.css'

interface IProps {
    id: number;
    name: string;
    price: number;
    link: string;
    img: string;
}

const Gift = (props: IProps) => {
    return (
        <div>
            <div className="products">
                <a href={props.link}>
                    <img src={props.img}></img>
                    <p>{props.name}</p>
                    <p className='price'>{props.price}원</p>
                </a>
            </div>
        </div>
    )
}

export default Gift