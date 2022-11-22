import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import Gift from "../components/Gift";
import { GiftState } from "../store/slices/gift";
import { getMockStore } from "../test-utils/mock";
import GiftRecommendPage from "./GiftRecommendPage"


type GiftType = {
    id: number,
    name: string,
    price: number,
    link: string,
    img: string
}

jest.mock("../components/Gift", ()=>(props: GiftType)=>(
    <div data-testid="spyGift">
        <div className="products">
                <a href={props.link}>
                    <img src={props.img}></img>
                    <p>{props.name}</p>
                    <p className='price'>{props.price}원</p>
                </a>
            </div>
    </div>
))

const stubInitialState: GiftState = {
    gifts: [
        {
            id: 0,
            name: "갤럭시중고",
            price: 50000,
            link: "https://www.naver.com",
            img: "https://via.placeholder.com/100"
        }
    ],
    selectedGift: null,
}

const mockStore = getMockStore(
    {
        gift: stubInitialState,
        event: {events:[], selectedEvent: null}
    }
);

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
 ...jest.requireActual("react-redux"),
 useDispatch: () => mockDispatch,
}));

describe("<GiftRecommendPage />", () => {
    let giftRecommendPage: JSX.Element;
    beforeEach(()=>{
        jest.clearAllMocks();
        giftRecommendPage = (
            <Provider store={mockStore}>
                <MemoryRouter>
                    <Routes>
                        <Route path="/" element={<GiftRecommendPage />}/>
                    </Routes>
                </MemoryRouter>
            </Provider>
        )
    });
    it("should render GiftRecommendPage", () => {
        const { container } = render(giftRecommendPage);
        expect(container).toBeTruthy()
    })
})