import { fireEvent, render, screen } from "@testing-library/react"
import axios from "axios";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
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

jest.mock("../components/Gift", () => (props: GiftType) => (
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
            price: 10000,
            link: "https://www.naver.com",
            img: "https://via.placeholder.com/100"
        },
        {
            id: 0,
            name: "갤럭시중고",
            price: 50000,
            link: "https://www.naver.com",
            img: "https://via.placeholder.com/100"
        },
        {
            id: 0,
            name: "갤럭시중고",
            price: 35000,
            link: "https://www.naver.com",
            img: "https://via.placeholder.com/100"
        },
        {
            id: 0,
            name: "갤럭시중고",
            price: 99000,
            link: "https://www.naver.com",
            img: "https://via.placeholder.com/100"
        },
        {
            id: 0,
            name: "갤럭시중고",
            price: 11000000,
            link: "https://www.naver.com",
            img: "https://via.placeholder.com/100"
        },
        {
            id: 0,
            name: "갤럭시중고",
            price: 1000000,
            link: "https://www.naver.com",
            img: "https://via.placeholder.com/100"
        }
    ],
    selectedGift: null,
}

const mockStore = getMockStore(
    {
        gift: stubInitialState,
        event: { events: [], selectedEvent: null },
        user: { email: "1234@naver.com", password: "1234", username: "주환", loggedin: true, Anniversary: [] }
    }
);

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => mockDispatch,
}));

describe("<GiftRecommendPage />", () => {
    let giftRecommendPage: JSX.Element
    beforeEach(() => {
        jest.clearAllMocks();
        giftRecommendPage = (
            <Provider store={mockStore}>
                <MemoryRouter>
                    <Routes>
                        <Route path="/" element={<GiftRecommendPage />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        )
    });
    it("should render GiftRecommendPage", async () => {
        axios.post = jest.fn().mockResolvedValue({ data: ["keyword1", "keyword2"] });
        const { container } = render(giftRecommendPage);
        expect(container).toBeTruthy()
        fireEvent.click(screen.queryByText(/^10대 남성$/i)!)
        fireEvent.click(screen.queryByText(/^20대 남성$/i)!)
        fireEvent.click(screen.queryByText(/^30대 남성$/i)!)
        fireEvent.click(screen.queryByText(/^10대 여성$/i)!)
        fireEvent.click(screen.queryByText(/^20대 여성$/i)!)
        fireEvent.click(screen.queryByText(/^30대 여성$/i)!)

        fireEvent.click(screen.queryByText(/^전품목$/i)!)
        fireEvent.click(screen.queryByText(/^패션의류$/i)!)
        fireEvent.click(screen.queryByText(/^패션잡화$/i)!)
        fireEvent.click(screen.queryByText(/^화장품미용$/i)!)
        fireEvent.click(screen.queryByText(/^디지털가전$/i)!)
        fireEvent.click(screen.queryByText(/^가구인테리어$/i)!)
        fireEvent.click(screen.queryByText(/^식품$/i)!)
        fireEvent.click(screen.queryByText(/^스포츠레저$/i)!)
        fireEvent.click(screen.queryByText(/^생활건강$/i)!)
        fireEvent.click(screen.queryByText(/^여가생활편의$/i)!)

        fireEvent.click(screen.queryByText(/^~3만원$/i)!)
        fireEvent.click(screen.queryByText(/^3만원~5만원$/i)!)
        fireEvent.click(screen.queryByText(/^5만원~10만원$/i)!)
        fireEvent.click(screen.queryByText(/^10만원~$/i)!)
        fireEvent.click(screen.queryByText(/^전체보기$/i)!)
    })
})