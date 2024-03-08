import { render } from "@testing-library/react";
import ItemCard from "./ItemCard";

const dummyData = {
  completed: false,
  createdAt: new Date(),
  daysToComplete: 14,
  details: "this is for the testing suite",
  id: 14,
  title: "checkity check",
};

const renderItemCard = () => {
  return render(<ItemCard key={14} obj={dummyData} />);
};

describe("ItemCard Tests", () => {
  it("Should successfully render an ItemCard", () => {
    const rendered = renderItemCard();
    const rendArticle = rendered.findAllByRole("article");
    expect(rendArticle).toBeDefined;
  });
});
