import React, { useState } from "react";
import toast from "react-hot-toast";
import TodoServices from "../services/TodoServices";

const EditTodo = ({ task, setShowModal,  getUserTask }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSubmit = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("todoapp"));
      const createdBy = userData && userData.user.id;
      const id = task?._id;

      const data = { title, description, createdBy };

      if (!title || !description) {
        return toast.error("please provide title or description");
      }

      await TodoServices.updateTodo(id, data);
      setShowModal(false);
      toast.success("task updated successfully");
      setTitle("");
      setDescription("");
      getUserTask(); 
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      {task && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow-lg border-0 rounded-3">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold text-primary">
                  Update Your Task
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>

              <div className="modal-body px-4">
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Task Title
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Task Description
                  </label>
                  <textarea
                    rows="4"
                    className="form-control"
                    placeholder="Enter task description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className="modal-footer border-0 px-4 pb-4">
                <button
                  type="button"
                  className="btn btn-light border"
                  onClick={handleClose}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="btn btn-primary px-4"
                  onClick={handleSubmit}
                >
                  Update Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditTodo;