import { render, screen } from "@testing-library/react"
import Dday from "./Dday"

describe("<Dday />", () => {
    it("should render without errors", () => {
        render(<Dday date={new Date()} title={"Dday_Title"} />);
        screen.getByText("Dday_Title")
    })
})