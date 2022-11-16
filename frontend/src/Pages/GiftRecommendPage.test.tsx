import { render, screen } from "@testing-library/react"
import GiftRecommendPage from "./GiftRecommendPage"


describe("<Dday />", () => {
    it("should render without errors", () => {
        render(<GiftRecommendPage />);
    })
})