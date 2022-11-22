import { render } from "@testing-library/react"
import Gift from "./Gift";

describe("<Gift />", () => {
    it("should render without errors", () => {
        render(<Gift {...{id: 0,
            name: "갤럭시중고",
            price: 50000,
            link: "https://www.naver.com",
            img: "https://via.placeholder.com/100"} }/>);
    })
})