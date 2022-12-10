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
    it("should push login", () => {
        renderWithProviders(<LoginPage />);
        const loginButton = screen.queryByText(/^로그인$/i)
        loginButton && fireEvent.click(loginButton)
    })
})