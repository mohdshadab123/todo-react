import axios from "axios";

const createTodo = async (data) => {
  const storedData = JSON.parse(localStorage.getItem("todoapp"));

  if (!storedData?.token) {
    console.log("Token not found");
    return;
  }

  return await axios.post(
    `${process.env.REACT_APP_API_URL}/todo/create`,
    data,
    {
      headers: {
        Authorization: `Bearer ${storedData.token}`,
      },
    }
  );
};

// get all todos
const getAllTodo = async (id) => {
  const storedData = JSON.parse(localStorage.getItem("todoapp"));

  if (!storedData?.token) {
    console.log("Token not found");
    return;
  }

  return await axios.get(
    `${process.env.REACT_APP_API_URL}/todo/getAll/${id}`,
    {
      headers: {
        Authorization: `Bearer ${storedData.token}`,
      },
    }
  );
};

// update todo
const updateTodo = async (id, updatedData) => {
  const storedData = JSON.parse(localStorage.getItem("todoapp"));

  if (!storedData?.token) {
    console.log("Token not found");
    return;
  }

  return await axios.patch(
    `${process.env.REACT_APP_API_URL}/todo/update/${id}`,
    updatedData,
    {
      headers: {
        Authorization: `Bearer ${storedData.token}`,
      },
    }
  );
};

// delete todo
const deleteTodo = async (id) => {
  const storedData = JSON.parse(localStorage.getItem("todoapp"));

  if (!storedData?.token) {
    console.log("Token not found");
    return;
  }

  return await axios.delete(
    `${process.env.REACT_APP_API_URL}/todo/delete/${id}`,
    {
      headers: {
        Authorization: `Bearer ${storedData.token}`,
      },
    }
  );
};

const TodoServices = {
  createTodo,
  getAllTodo,
  updateTodo,
  deleteTodo,
};

export default TodoServices;