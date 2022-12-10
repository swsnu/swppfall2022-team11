
import { fireEvent, render, screen } from "@testing-library/react"
import DecorateLetterPage from "./DecorateLetterPage";
import { renderWithProviders } from "../test-utils/mock";


describe("<DecorateLetterPage />", () => {
    it("should render without errors", () => {
        renderWithProviders(<DecorateLetterPage />);
    })
}
)
