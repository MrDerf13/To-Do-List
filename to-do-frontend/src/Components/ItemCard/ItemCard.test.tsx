import { render, screen } from "@testing-library/react";
import ItemCard from "./ItemCard";
import { BrowserRouter } from "react-router-dom";

const dummyData = {
  completed: false,
  createdAt: new Date(),
  daysToComplete: 14,
  details: "this is for the testing suite",
  id: 14,
  title: "checkity check",
};

describe("Rendering tests", () => {
  it("renders an ItemCard", () => {
    render(
      <BrowserRouter>
        <ItemCard key={14} obj={dummyData} />
      </BrowserRouter>
    );
    const cardWrapper = screen.getByRole("article");
    expect(cardWrapper).toBeDefined();
  });
  it("renders an ItemCard with given data", () => {
    render(
      <BrowserRouter>
        <ItemCard key={14} obj={dummyData} />
      </BrowserRouter>
    );
    const titelData = screen.getByText("checkity check");
    expect(titelData).toBeDefined();
  });
});
