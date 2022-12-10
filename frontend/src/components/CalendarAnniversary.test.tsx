import { fireEvent, render, screen } from "@testing-library/react"
import CalendarAnniversary from "./CalendarAnniversary";
import { renderWithProviders } from "../test-utils/mock";


describe("<Dday />", () => {
    it("should render without errors", () => {
        renderWithProviders(<CalendarAnniversary />);
    })
    it("should search button", async () => {
        renderWithProviders(<CalendarAnniversary />);
        const searchButton = screen.getByText("이벤트 추가하기")
        fireEvent.click(searchButton!);
    })
})