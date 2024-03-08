import { useRef } from "react";
import { createItem } from "../../services/to-do-services";
import styles from "./AddPage.module.scss";
import { useNavigate } from "react-router-dom";

const AddPage = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const navigator = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const formData = new FormData(form);
    const dataObject = Object.fromEntries(formData);
    const daysToComplete =
      typeof dataObject.daysToComplete === "string"
        ? parseInt(dataObject.daysToComplete)
        : 0;
    const completed = dataObject.completed === "1" ? true : false;

    const dataToSendToBackend = {
      ...dataObject,
      daysToComplete: daysToComplete,
      completed: completed,
    };
    createItem(dataToSendToBackend);

    navigator("/");
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <label htmlFor="title">Title: </label>
        <input type="text" name="title" id="title" />
      </div>
      <div className={styles.innerWrapper}>
        <label htmlFor="details">Details: </label>
        <textarea name="details" id="details" />
      </div>
      <div className={styles.innerWrapper}>
        <label htmlFor="completed">Completed: </label>
        <input type="checkbox" name="completed" id="completed" value="1" />
      </div>
      <div className={styles.innerWrapper}>
        <label htmlFor="daysToComplete">Days To Complete: </label>
        <input
          type="number"
          min={0}
          name="daysToComplete"
          id="daysToComplete"
          className={styles.numericInput}
        />
      </div>
      <button className={styles.subBtn} type="submit">
        +
      </button>
    </form>
  );
};

export default AddPage;
