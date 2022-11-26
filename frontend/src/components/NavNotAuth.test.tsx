import { render } from "@testing-library/react"
import NavNotAuth from "./NavNotAuth";

describe("<NavNotAuth />", () => {
    it("should render without errors", () => {
        render(<NavNotAuth />);
    })
})