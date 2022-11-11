import { render, screen } from "@testing-library/react"
import CalendarAnniversary from "./CalendarAnniversary";

describe("<Dday />", () => {
    it("should render without errors", () => {
        render(<CalendarAnniversary />);
    })
})