import { fireEvent, screen, waitFor } from "@testing-library/react"
import { renderWithProviders } from "../test-utils/mock"
import CreateLetterPage from "./CreateLetterPage"

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}))

describe("<CreateLetterPage />", () => {

    it("should render without errors", () => {
        renderWithProviders(<CreateLetterPage />);
    })
    it("should show right messages when clicked", async () => {
        renderWithProviders(<CreateLetterPage />);
        let firstChoiceTitle = screen.queryByText(/어떤 편지를 쓰시나요\?/i)
        let firstChoiceButton = screen.queryByText(/100일 기념편지/i)
        let secondChoiceTitle = screen.queryByText(/어떤 느낌으로 쓸까요\?/i)
        let secondChoiceButton = screen.queryByText(/달달한/i)
        let thirdChoiceTitle = screen.queryByText(/어떤 말투로 쓸까요\?/i)
        let thirdChoiceButton = screen.queryByText(/가벼운 말투/i)

        expect(firstChoiceTitle).toBeInTheDocument()
        expect(firstChoiceButton).toBeInTheDocument()
        expect(secondChoiceTitle).not.toBeInTheDocument()
        expect(secondChoiceButton).not.toBeInTheDocument()
        expect(thirdChoiceTitle).not.toBeInTheDocument()
        expect(thirdChoiceButton).not.toBeInTheDocument()

        const firstChoiceButton2 = screen.queryByText(/고백편지/i)
        expect(firstChoiceButton2).toBeInTheDocument()
        firstChoiceButton2 && fireEvent.click(firstChoiceButton2)

        const firstChoiceButton3 = screen.queryByText(/일상편지/i)
        expect(firstChoiceButton3).toBeInTheDocument()
        firstChoiceButton3 && fireEvent.click(firstChoiceButton3)

        firstChoiceButton && fireEvent.click(firstChoiceButton)

        firstChoiceTitle = screen.queryByText(/어떤 편지를 쓰시나요\?/i)
        firstChoiceButton = screen.queryByText(/100일 기념편지/i)
        secondChoiceTitle = screen.queryByText(/어떤 느낌으로 쓸까요\?/i)
        secondChoiceButton = screen.queryByText(/달달한/i)
        thirdChoiceTitle = screen.queryByText(/어떤 말투로 쓸까요\?/i)
        thirdChoiceButton = screen.queryByText(/가벼운 말투/i)

        expect(firstChoiceTitle).toBeInTheDocument()
        expect(firstChoiceButton).toBeInTheDocument()
        expect(secondChoiceTitle).toBeInTheDocument()
        expect(secondChoiceButton).toBeInTheDocument()
        expect(thirdChoiceTitle).not.toBeInTheDocument()
        expect(thirdChoiceButton).not.toBeInTheDocument()

        const secondChoiceButton2 = screen.queryByText(/감동적인/i)
        expect(secondChoiceButton2).toBeInTheDocument()
        secondChoiceButton2 && fireEvent.click(secondChoiceButton2)

        const secondChoiceButton3 = screen.queryByText(/은은한/i)
        expect(secondChoiceButton3).toBeInTheDocument()
        secondChoiceButton3 && fireEvent.click(secondChoiceButton3)

        secondChoiceButton && fireEvent.click(secondChoiceButton)

        firstChoiceTitle = screen.queryByText(/어떤 편지를 쓰시나요\?/i)
        firstChoiceButton = screen.queryByText(/100일 기념편지/i)
        secondChoiceTitle = screen.queryByText(/어떤 느낌으로 쓸까요\?/i)
        secondChoiceButton = screen.queryByText(/달달한/i)
        thirdChoiceTitle = screen.queryByText(/어떤 말투로 쓸까요\?/i)
        thirdChoiceButton = screen.queryByText(/가벼운 말투/i)

        expect(firstChoiceTitle).toBeInTheDocument()
        expect(firstChoiceButton).toBeInTheDocument()
        expect(secondChoiceTitle).toBeInTheDocument()
        expect(secondChoiceButton).toBeInTheDocument()
        expect(thirdChoiceTitle).toBeInTheDocument()
        expect(thirdChoiceButton).toBeInTheDocument()

        const thirdChoiceButton2 = screen.queryByText(/진중한 말투/i)
        expect(thirdChoiceButton2).toBeInTheDocument()
        thirdChoiceButton2 && fireEvent.click(thirdChoiceButton2)

        const thirdChoiceButton3 = screen.queryByText(/내 말투/i)
        expect(thirdChoiceButton3).toBeInTheDocument()
        thirdChoiceButton3 && fireEvent.click(thirdChoiceButton3)
        expect(screen.queryByText(/내 말투를 입력해주세요/i)).toBeInTheDocument()
        const textArea = screen.queryByPlaceholderText(/내 말투를 입력해주세요/i)
        expect(textArea).toBeInTheDocument()
        textArea && fireEvent.change(textArea, { target: { value: "my voice" } })

        thirdChoiceButton && fireEvent.click(thirdChoiceButton)

        const fetchMock = jest.spyOn(global, "fetch") as jest.Mock
        fetchMock.mockResolvedValue(
            { json: async () => ({ generatedText: "iloveyou" }) }
        )
        const submitButton = screen.queryByText(/네! 써주세요!/i)
        expect(submitButton).toBeInTheDocument()

        submitButton && fireEvent.click(submitButton)
        await waitFor(() => {
            const loadingText = screen.queryByText(/편지 쓰는 중.../i)
            expect(loadingText).not.toBeInTheDocument()
        })
        const generatedText = screen.queryByText(/iloveyou/i)
        expect(generatedText).toBeInTheDocument()

        const decoratePageButton = screen.queryByText(/편지지 꾸미기/i)
        expect(decoratePageButton).toBeInTheDocument()

        const giftPageButton = screen.queryByText(/선물 추천/i)
        expect(giftPageButton).toBeInTheDocument()

        decoratePageButton && fireEvent.click(decoratePageButton)
        expect(mockNavigate).toHaveBeenCalledWith("/decorate", { state: { text: "iloveyou" } })

        giftPageButton && fireEvent.click(giftPageButton)
        expect(mockNavigate).toHaveBeenCalledWith("/gift")
    })
})