import { fireEvent, screen, waitFor } from "@testing-library/react"
import { renderWithProviders } from "../test-utils/mock"
import LoginPage from "./LoginPage"

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}))

describe("<LoginPage />", () => {

    it("should render without errors", () => {
        renderWithProviders(<LoginPage />);
    })
})