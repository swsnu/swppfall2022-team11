import { fireEvent, render, screen } from "@testing-library/react"
import CalendarAnniversary from "./CalendarAnniversary";

describe("<Dday />", () => {
    it("should render without errors", () => {
        render(<CalendarAnniversary />);
    })
    it("should search button", async() => {
        render(<CalendarAnniversary/>);
        const searchButton = screen.getByText("이벤트 추가하기")
        fireEvent.click(searchButton!);
    })
})