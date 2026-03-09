import React, { useState } from "react";
import EditTodo from "../EditTodo";
import toast from "react-hot-toast";
import TodoServices from "../../services/TodoServices";

const Card = ({ allTask, getUserTask }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleEdit = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await TodoServices.deleteTodo(id);
      toast.success("task deleted successfully");
      getUserTask();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="card-container">
        {allTask?.map((task) => (
          <div
            className="card border-primary mb-3"
            style={{ maxWidth: "18rem" }}
            key={task?._id}
          >
            <div className="card-header">
              <div className="chead">
                <h6>{task?.title?.substring(0, 10)}</h6>
              </div>
            </div>

            <div className="card-body">
              <h6 style={{ fontWeight: "bold" }}>
                {task?.title}
              </h6>
              <p className="card-text">
                {task?.description}
              </p>
              <h6>
                Date : {task?.createdAt?.substring(0, 10)}
              </h6>
            </div>

            <div className="card-footer bg-transparent border border-primary">
              <button
                className="btn btn-warning"
                title="EDIT TASK"
                onClick={() => handleEdit(task)}
              >
                <i className="fa-solid fa-pen-to-square"></i> Edit
              </button>

              <button
                className="btn btn-danger ms-2"
                title="Delete TASK"
                onClick={() => handleDelete(task?._id)}
              >
                <i className="fa-solid fa-trash"></i> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <EditTodo
          task={selectedTask}
          setShowModal={setShowModal}
          getUserTask={getUserTask}
        />
      )}
    </>
  );
};

export default Card;