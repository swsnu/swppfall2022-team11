import { fireEvent, render, screen } from "@testing-library/react"
import CalendarPage from "./CalendarPage";


const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    useNavigate: () => mockNavigate,
}));

describe("<CalendarPage />", () => {
    it("should render without errors", () => {
        render(<CalendarPage />);
    })
    it("should navigate", () => {
        render(<CalendarPage />)
        const doneButton = screen.getByText("지금 편지쓰러가기");
        fireEvent.click(doneButton!);
        expect(mockNavigate).toHaveBeenCalledTimes(1);
    })
})