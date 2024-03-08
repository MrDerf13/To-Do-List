import Header from "../../Containers/Header/Header";
import ItemContainer from "../../Containers/ItemContainer/ItemContainer";
import { useState } from "react";

const Home = () => {
  const [filter, setFilter] = useState<string>("");
  return (
    <>
      <ItemContainer filter={filter} />
      <Header searchFunction={setFilter} />
    </>
  );
};

export default Home;
