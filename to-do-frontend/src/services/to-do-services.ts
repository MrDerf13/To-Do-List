import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const successNotification = (message: String, statusCode: number) =>
  toast.success(`${message} Status Code: ${statusCode}`);
const failureNotification = (message: String, statusCode: number) =>
  toast.error(`${message} Status Code: ${statusCode}`);

export const getAllItems = async (): Promise<Object[]> => {
  const response = await fetch("http://localhost:8080/items");
  if (!response.ok) {
    failureNotification("Failed to get posts.", response.status);
  }
  const data = await response.json();
  return data;
};

export const getItemById = async (id: number): Promise<Object> => {
  const response = await fetch(`http://localhost:8080/items/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to get post with id: ${id}`);
  }
  const data = await response.json();
  return data;
};

export const deleteItemById = async (id: number): Promise<Object> => {
  const response = await fetch(`http://localhost:8080/items/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    failureNotification(`Post with id ${id} was not found`, response.status);
  } else {
    successNotification("Post deleted!", response.status);
  }
  return response;
};

export const createItem = async (obj: Object): Promise<Object> => {
  const response = await fetch(`http://localhost:8080/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  if (!response.ok) {
    failureNotification(`Failed to create new post`, response.status);
  } else {
    successNotification("New post created!", response.status);
  }
  return obj;
};

export const patchItemById = async (
  id: number,
  obj: Object
): Promise<Object> => {
  const response = await fetch(`http://localhost:8080/items/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  if (!response.ok) {
    failureNotification(
      `Post with id ${id} could not be patched`,
      response.status
    );
  } else {
    successNotification("Post successfully updated!", response.status);
  }

  return getItemById(id);
};
