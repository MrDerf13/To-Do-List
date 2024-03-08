import { useParams, useNavigate } from "react-router-dom";
import { getItemById, patchItemById } from "../../services/to-do-services";
import { useEffect, useRef, useState } from "react";
import { ItemTemplate } from "../../services/itemTemplate";
import styles from "../AddPage/AddPage.module.scss";

const EditPage = () => {
  const [initialData, setInitialData] = useState<ItemTemplate>({
    id: NaN,
    title: "",
    details: "",
    completed: false,
    daysToComplete: 0,
    createdAt: new Date(),
  });
  const [dueDate, setDueDate] = useState<Date>();
  const { id } = useParams();
  const parsedId = id ? parseInt(id, 10) : 0;
  const navigator = useNavigate();

  useEffect(() => {
    getItemById(parsedId).then((res) => {
      setInitialData(res as ItemTemplate);
    });
  }, [parsedId]);

  useEffect(() => {
    const dateHolder = new Date(initialData.createdAt);
    dateHolder.setDate(dateHolder.getDate() + initialData.daysToComplete);
    setDueDate(dateHolder);
  }, [initialData]);

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const formData = new FormData(form);
    const dataObject = Object.fromEntries(formData);
    if (dataObject.daysToComplete == "") {
      dataObject.daysToComplete = initialData.daysToComplete.toString();
    }
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
    console.log(dataToSendToBackend);
    patchItemById(parsedId, dataToSendToBackend);
    navigator("/");
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          name="title"
          id="title"
          defaultValue={initialData?.title}
        />
      </div>
      <div className={styles.innerWrapper}>
        <label htmlFor="details">Details: </label>
        <textarea
          name="details"
          id="details"
          defaultValue={initialData?.details}
        />
      </div>
      <div className={styles.innerWrapper}>
        <label htmlFor="completed">Completed: </label>
        <input type="checkbox" name="completed" id="completed" value="1" />
      </div>
      <p className={styles.innerWrapper}>
        <span>Created at:</span>
        {` ${initialData.createdAt
          .toString()
          .slice(0, 10)
          .split("-")
          .reverse()
          .join("/")}`}
      </p>
      <div className={styles.innerWrapper}>
        <label htmlFor="daysToComplete">Days To Complete: </label>
        <input
          type="number"
          className={styles.numericInput}
          min={0}
          name="daysToComplete"
          id="daysToComplete"
          placeholder={initialData?.daysToComplete.toString()}
        />
      </div>
      <p className={styles.innerWrapper}>
        <span>Due by:</span>
        {dueDate &&
          ` ${dueDate
            .toISOString()
            .slice(0, 10)
            .split("-")
            .reverse()
            .join("/")}`}
      </p>
      <button className={styles.subBtn} type="submit">
        +
      </button>
    </form>
  );
};

export default EditPage;
