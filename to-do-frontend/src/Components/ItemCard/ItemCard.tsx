import { deleteItemById } from "../../services/to-do-services";
import { ItemTemplate } from "../../services/itemTemplate";
import styles from "./ItemCard.module.scss";
import { useNavigate } from "react-router-dom";

interface ItemCardProps {
  key: number;
  obj: ItemTemplate;
}

const ItemCard: React.FC<ItemCardProps> = ({ obj }) => {
  const navigator = useNavigate();
  const handleDeleteClick = () => {
    deleteItemById(obj.id);
  };

  return (
    <article className={styles.cards}>
      <div
        className={styles.innerDiv}
        onClick={() => navigator(`edit/${obj.id}`)}
      >
        <h3>{obj.title}</h3>
        <p>
          {obj.createdAt.toString().slice(0, 10).split("-").reverse().join("/")}
        </p>
      </div>
      <button className={styles.delBtn} onClick={handleDeleteClick}>
        X
      </button>
    </article>
  );
};

export default ItemCard;
