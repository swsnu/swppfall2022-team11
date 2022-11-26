import { fireEvent, screen, waitFor } from "@testing-library/react"
import { renderWithProviders } from "../test-utils/mock"
import RegisterPage from "./RegisterPage"

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}))

describe("<RegisterPage />", () => {

    it("should render without errors", () => {
        renderWithProviders(<RegisterPage />);
    })
})