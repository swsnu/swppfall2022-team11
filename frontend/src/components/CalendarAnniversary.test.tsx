import { render, screen } from "@testing-library/react"
import CalendarAnniversary from "./CalendarAnniversary";
import { renderWithProviders } from "../test-utils/mock";


describe("<Dday />", () => {
    it("should render without errors", () => {
        renderWithProviders(<CalendarAnniversary />);
    })
})