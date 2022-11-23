import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../test-utils/mock";
import CalendarPage from "./CalendarPage";


const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    useNavigate: () => mockNavigate,
}));

describe("<CalendarPage />", () => {
    it("should render without errors", () => {
        renderWithProviders(<CalendarPage />);
    })
    it("should navigate", () => {
        renderWithProviders(<CalendarPage />)
        const doneButton = screen.getByText("지금 편지쓰러가기");
        fireEvent.click(doneButton!);
        expect(mockNavigate).toHaveBeenCalledTimes(1);
    })
})