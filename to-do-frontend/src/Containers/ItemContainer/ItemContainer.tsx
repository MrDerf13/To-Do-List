import { useEffect, useState } from "react";
import { getAllItems } from "../../services/to-do-services";
import ItemCard from "../../Components/ItemCard/ItemCard";
import { ItemTemplate } from "../../services/itemTemplate";
import styles from "./ItemContainer.module.scss";

interface ItemContainerProps {
  filter: string;
}

const ItemContainer: React.FC<ItemContainerProps> = ({ filter }) => {
  const [allItems, setAllItems] = useState<ItemTemplate[]>([]);

  useEffect(() => {
    getAllItems()
      .then((res) => setAllItems(res as ItemTemplate[]))
      .catch((e) => console.warn(e.message));
  }, [filter]);

  return (
    <div className={styles.outerWrapper}>
      <h2>Active</h2>
      <div className={styles.container}>
        {allItems != null &&
          allItems
            .filter((item) => !item.completed)
            .filter(
              (item) =>
                item.title.toLowerCase().includes(filter.toLowerCase()) ||
                item.details.toLowerCase().includes(filter.toLowerCase())
            )
            .map((item) => <ItemCard key={item.id} obj={item} />)}
      </div>
      <h2>Completed</h2>
      <div className={styles.container}>
        {allItems != null &&
          allItems
            .filter((item) => item.completed)
            .filter(
              (item) =>
                item.title.toLowerCase().includes(filter.toLowerCase()) ||
                item.details.toLowerCase().includes(filter.toLowerCase())
            )
            .map((item) => <ItemCard key={item.id} obj={item} />)}
      </div>
    </div>
  );
};

export default ItemContainer;
