import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

interface HeaderProps {
  searchFunction: (item: string) => unknown;
}

const Header: React.FC<HeaderProps> = ({ searchFunction }) => {
  return (
    <div className={styles.header}>
      <span>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => searchFunction(e.target.value)}
        />
      </span>
      <span>
        <Link to="/add">
          <button className={styles.addBtn}>+</button>
        </Link>
      </span>
    </div>
  );
};

export default Header;
