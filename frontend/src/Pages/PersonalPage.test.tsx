import { fireEvent, screen, waitFor } from "@testing-library/react"
import { renderWithProviders } from "../test-utils/mock"
import PersonalPage from "./PersonalPage"

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}))

describe("<PersonalPage />", () => {

    it("should render without errors", () => {
        renderWithProviders(<PersonalPage />);
    })
})