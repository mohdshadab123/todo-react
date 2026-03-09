import React from 'react';
import toast from 'react-hot-toast';
import TodoServices from "../../services/TodoServices";

const PopModel = ({
  title,
  setTitle,
  description,
  setDescription,
  showModal,
  setShowModal,
  getUserTask
}) => {

  const handleClose = () => {
    setShowModal(false);
  };

  
  const handleSubmit = async () => {
    try {
      
      const userData = JSON.parse(localStorage.getItem('user'));
      const createdBy = userData ? userData._id : null;

      const data = { title, description, createdBy };

      if (!title || !description) {
        return toast.error('Please provide title or description');
      }

      
      const todo = await TodoServices.createTodo(data);

      setShowModal(false);
      toast.success('Task created successfully');
      getUserTask();

      console.log(todo);

    
      setTitle('');
      setDescription('');

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      {showModal && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Add New Task</h5>

              
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleClose}
                ></button>

              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-floating">
                  <textarea
                    id="floatingTextarea"
                    placeholder="Add your description"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  <label htmlFor="floatingTextarea">Description</label>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Close
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Create
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopModel;