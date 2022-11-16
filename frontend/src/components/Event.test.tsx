import { render, screen } from "@testing-library/react"
import Event from "./Event"

describe("<Event />", () => {
    it("should render without errors", () => {
        render(<Event date={new Date()} title={"Dday_Title"} />);
        screen.getByText("Dday_Title")
    })
    it("should render passing day", () => {
        render(<Event date={new Date("December 25, 2032 00:00:00")} title={"Dday_title"} />);
    })
    it("should render after day", () => {
        render(<Event date={new Date("December 25, 2000 00:00:00")} title={"Dday_title"} />);
    })
})